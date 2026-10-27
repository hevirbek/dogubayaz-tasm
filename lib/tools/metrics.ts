export type Sex = "erkek" | "kadin";

type WeightBand = { min: number; max: number };

// Erkek 164–210 cm: MSB boy-kilo nomogramı. Kadın 153–200 cm aynı cetvel;
// 201–210 cm, aynı alt-üst yöntemini sürdüren nomogram satırlarıdır.
const maleChart = parseChart(
  "164:51-72,165:52-72,166:52-72,167:53-73,168:54-73,169:54-74,170:55-75,171:56-76,172:56-77,173:57-78,174:58-79,175:58-80,176:59-81,177:60-81,178:60-82,179:61-83,180:62-84,181:62-85,182:63-86,183:64-87,184:64-88,185:65-89,186:66-90,187:66-91,188:67-92,189:68-93,190:69-94,191:70-95,192:70-96,193:71-97,194:72-98,195:72-99,196:73-100,197:74-101,198:75-102,199:75-103,200:76-104,201:77-105,202:78-106,203:78-107,204:79-108,205:80-109,206:81-110,207:81-111,208:82-112,209:83-114,210:84-115"
);

const femaleChart = parseChart(
  "153:44-60,154:45-61,155:45-62,156:46-63,157:46-63,158:47-65,159:48-65,160:48-66,161:49-67,162:49-68,163:50-69,164:51-69,165:51-70,166:52-70,167:53-71,168:53-73,169:54-74,170:54-75,171:55-75,172:56-76,173:56-77,174:57-78,175:58-79,176:58-80,177:59-81,178:60-82,179:60-83,180:61-84,181:62-85,182:62-86,183:63-87,184:64-88,185:64-88,186:65-89,187:66-90,188:67-91,189:67-92,190:68-93,191:69-94,192:70-95,193:70-96,194:71-97,195:72-98,196:72-99,197:73-100,198:74-101,199:75-102,200:76-104,201:76-105,202:77-106,203:78-107,204:79-108,205:79-109,206:80-110,207:81-111,208:82-112,209:83-113,210:83-114"
);

function parseChart(source: string) {
  const chart = new Map<number, WeightBand>();
  for (const part of source.split(",")) {
    const [height, bounds] = part.split(":");
    const [min, max] = bounds.split("-").map(Number);
    chart.set(Number(height), { min, max });
  }
  return chart;
}

export type MilitaryAssessment =
  | { status: "invalid"; message: string }
  | { status: "height"; message: string }
  | { status: "under" | "over" | "fit"; min: number; max: number };

export function assessMilitary(sex: Sex | "", heightCm: number, weightKg: number): MilitaryAssessment {
  if (sex !== "erkek" && sex !== "kadin") {
    return { status: "invalid", message: "Cinsiyet seçin." };
  }
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) {
    return { status: "invalid", message: "Boy ve kilo girin." };
  }
  if (!Number.isInteger(heightCm)) {
    return { status: "invalid", message: "Boyu tam santimetre olarak girin." };
  }
  if (heightCm < 140 || heightCm > 230) {
    return { status: "invalid", message: "Boyu 140–230 cm arasında girin." };
  }
  if (weightKg < 30 || weightKg > 250) {
    return { status: "invalid", message: "Kiloyu 30–250 kg arasında girin." };
  }

  const band = (sex === "erkek" ? maleChart : femaleChart).get(heightCm);
  if (!band) {
    return {
      status: "height",
      message:
        sex === "erkek"
          ? "Bu boy cetvelin dışında. Erkeklerde 164–210 cm değerlendirilir."
          : "Bu boy cetvelin dışında. Kadınlarda 153–210 cm değerlendirilir."
    };
  }
  if (weightKg < band.min) return { status: "under", ...band };
  if (weightKg > band.max) return { status: "over", ...band };
  return { status: "fit", ...band };
}

export type BmiAssessment =
  | { status: "invalid"; message: string }
  | { status: "ok"; bmi: number; label: string; tone: "low" | "ok" | "mid" | "high" };

export function assessBmi(heightCm: number, weightKg: number): BmiAssessment {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) {
    return { status: "invalid", message: "Boy ve kilo girin." };
  }
  if (heightCm < 100 || heightCm > 250) {
    return { status: "invalid", message: "Boyu 100–250 cm arasında girin." };
  }
  if (weightKg < 20 || weightKg > 300) {
    return { status: "invalid", message: "Kiloyu 20–300 kg arasında girin." };
  }

  const raw = weightKg / (heightCm / 100) ** 2;
  const bmi = Math.round(raw * 10) / 10;
  if (bmi < 18.5) return { status: "ok", bmi, label: "Zayıf", tone: "low" };
  if (bmi < 25) return { status: "ok", bmi, label: "Normal", tone: "ok" };
  if (bmi < 30) return { status: "ok", bmi, label: "Fazla kilolu", tone: "mid" };
  if (bmi < 35) return { status: "ok", bmi, label: "1. derece obez", tone: "high" };
  if (bmi < 40) return { status: "ok", bmi, label: "2. derece obez", tone: "high" };
  return { status: "ok", bmi, label: "Morbid obez", tone: "high" };
}

export type WaistAssessment =
  | { status: "invalid"; message: string }
  | { status: "ok"; label: string; tone: "ok" | "mid" | "high" };

export function assessWaist(sex: Sex | "", circumferenceCm: number): WaistAssessment {
  if (sex !== "erkek" && sex !== "kadin") {
    return { status: "invalid", message: "Cinsiyet seçin." };
  }
  if (!Number.isFinite(circumferenceCm)) {
    return { status: "invalid", message: "Bel çevresini girin." };
  }
  if (circumferenceCm < 50 || circumferenceCm > 200) {
    return { status: "invalid", message: "Bel çevresini 50–200 cm arasında girin." };
  }

  const increased = sex === "erkek" ? 94 : 80;
  const high = sex === "erkek" ? 102 : 88;
  if (circumferenceCm < increased) return { status: "ok", label: "Normal", tone: "ok" };
  if (circumferenceCm < high) return { status: "ok", label: "Artmış risk", tone: "mid" };
  return { status: "ok", label: "Yüksek risk", tone: "high" };
}

export const activities = [
  { id: "oturma", group: "Günlük hareket", label: "Oturma, dinlenme", met: 1.3 },
  { id: "ayakta", group: "Günlük hareket", label: "Ayakta durma", met: 1.8 },
  { id: "yavas-yuruyus", group: "Günlük hareket", label: "Yavaş yürüyüş", met: 2.8 },
  { id: "normal-yuruyus", group: "Günlük hareket", label: "Normal yürüyüş", met: 3.5 },
  { id: "tempolu-yuruyus", group: "Günlük hareket", label: "Tempolu yürüyüş", met: 5 },
  { id: "merdiven", group: "Günlük hareket", label: "Merdiven çıkma", met: 8 },
  { id: "yemek", group: "Ev işi", label: "Yemek hazırlama", met: 2.5 },
  { id: "temizlik", group: "Ev işi", label: "Ev temizliği", met: 3.3 },
  { id: "bahce", group: "Ev işi", label: "Bahçe işi", met: 4 },
  { id: "bisiklet", group: "Spor", label: "Bisiklet, rahat tempo", met: 4 },
  { id: "bisiklet-hizli", group: "Spor", label: "Bisiklet, tempolu", met: 8 },
  { id: "ev-egzersizi", group: "Spor", label: "Ev egzersizi", met: 3.5 },
  { id: "yoga", group: "Spor", label: "Yoga veya esneme", met: 2.5 },
  { id: "dans", group: "Spor", label: "Dans", met: 5.5 },
  { id: "yuzme", group: "Spor", label: "Yüzme, orta tempo", met: 7 },
  { id: "futbol", group: "Spor", label: "Futbol", met: 7 },
  { id: "basketbol", group: "Spor", label: "Basketbol", met: 6.5 },
  { id: "hafif-kosu", group: "Spor", label: "Hafif koşu", met: 8.3 },
  { id: "kosu", group: "Spor", label: "Koşu", met: 9.8 },
  { id: "ip", group: "Spor", label: "İp atlama", met: 10 }
] as const;

export type EnergyAssessment =
  | { status: "invalid"; message: string }
  | { status: "ok"; kcal: number; activity: string; minutes: number; weightKg: number };

export function assessEnergy(weightKg: number, minutes: number, activityId: string): EnergyAssessment {
  const activity = activities.find((item) => item.id === activityId);
  if (!activity) return { status: "invalid", message: "Aktivite seçin." };
  if (!Number.isFinite(weightKg) || !Number.isFinite(minutes)) {
    return { status: "invalid", message: "Kilo ve süre girin." };
  }
  if (weightKg < 20 || weightKg > 300) {
    return { status: "invalid", message: "Kiloyu 20–300 kg arasında girin." };
  }
  if (minutes < 1 || minutes > 600) {
    return { status: "invalid", message: "Süreyi 1–600 dakika arasında girin." };
  }

  return {
    status: "ok",
    kcal: Math.round(activity.met * weightKg * (minutes / 60)),
    activity: activity.label,
    minutes,
    weightKg
  };
}
