import type { ScheduleKind } from "@/lib/tools/catalog";
import {
  addDays,
  addMonths,
  clampDate,
  diffDays,
  formatChartDate,
  formatDateRange,
  formatLongDate,
  todayStart
} from "@/lib/tools/dates";

export type ScheduleEntry = {
  key: string;
  title: string;
  when: string;
  detail: string;
  start: Date;
  end: Date;
  muted?: boolean;
};

export type VaccineColumn = {
  key: string;
  label: string;
  date: Date;
  when: string;
};

export type VaccineMatrix = {
  columns: VaccineColumn[];
  rows: Array<{ key: string; label: string; columns: string[] }>;
};

export type ScheduleResult = {
  entries: ScheduleEntry[];
  summary?: string;
  matrix?: VaccineMatrix;
};

const earliestBirth = new Date(1990, 0, 1);

function dayWindow(birth: Date, startDay: number, endDay: number) {
  return {
    start: addDays(birth, startDay),
    end: addDays(birth, endDay)
  };
}

const vaccineColumns: Array<{ key: string; label: string; months: number }> = [
  { key: "birth", label: "Doğum", months: 0 },
  { key: "m2", label: "2.\nAy sonu", months: 2 },
  { key: "m4", label: "4.\nAy sonu", months: 4 },
  { key: "m6", label: "6.\nAy sonu", months: 6 },
  { key: "m9", label: "9.\nAy sonu", months: 9 },
  { key: "m12", label: "12.\nAy sonu", months: 12 },
  { key: "m18", label: "18.\nAy sonu", months: 18 },
  { key: "m24", label: "24.\nAy sonu", months: 24 },
  { key: "m48", label: "48.\nAy", months: 48 },
  { key: "y13", label: "13\nYaş", months: 13 * 12 }
];

const vaccineRows: Array<{ key: string; label: string; columns: string[] }> = [
  { key: "hepb", label: "Hep-B", columns: ["birth"] },
  { key: "bcg", label: "BCG", columns: ["m2"] },
  { key: "kpa", label: "KPA", columns: ["m2", "m4", "m12"] },
  { key: "karma", label: "DaBT - İPA-Hib - HepB", columns: ["m2", "m4", "m6", "m18"] },
  { key: "opa", label: "OPA", columns: ["m6", "m18"] },
  { key: "varicella", label: "Suçiçeği", columns: ["m12"] },
  { key: "kkk", label: "KKK", columns: ["m9", "m12", "m48"] },
  { key: "hepa", label: "Hep-A", columns: ["m18", "m24"] },
  { key: "dabt", label: "DaBT-İPA", columns: ["m48"] },
  { key: "td", label: "Td", columns: ["y13"] }
];

function vaccine(birth: Date): ScheduleResult {
  const columns = vaccineColumns.map((column) => {
    const date = addMonths(birth, column.months);
    return {
      key: column.key,
      label: column.label,
      date,
      when: formatChartDate(date)
    };
  });

  return {
    matrix: { columns, rows: vaccineRows },
    entries: columns.map((column) => ({
      key: column.key,
      title: column.label.replace("\n", " "),
      when: formatLongDate(column.date),
      detail: vaccineRows
        .filter((row) => row.columns.includes(column.key))
        .map((row) => row.label)
        .join("\n"),
      start: column.date,
      end: column.date
    }))
  };
}

function baby(birth: Date): ScheduleResult {
  const named: Array<{ key: string; title: string; day: number; from: number; to: number; muted?: boolean; place?: string }> = [
    { key: "birth", title: "Doğum", day: 0, from: 0, to: 0, muted: true, place: "Hastanede" },
    { key: "week", title: "İlk hafta", day: 7, from: 1, to: 10 },
    { key: "d15", title: "15. gün", day: 15, from: 11, to: 29 },
    { key: "d41", title: "41. gün", day: 41, from: 30, to: 59 }
  ];

  const months: Array<{ key: string; title: string; month: number; from: number; to: number }> = [
    { key: "m2", title: "2. ay", month: 2, from: 60, to: 89 },
    { key: "m3", title: "3. ay", month: 3, from: 90, to: 115 },
    { key: "m4", title: "4. ay", month: 4, from: 120, to: 150 },
    { key: "m6", title: "6. ay", month: 6, from: 180, to: 210 },
    { key: "m9", title: "9. ay", month: 9, from: 250, to: 290 }
  ];

  const entries: ScheduleEntry[] = named.map((item) => {
    const window = dayWindow(birth, item.from, item.to);
    const suggested = addDays(birth, item.day);
    return {
      key: item.key,
      title: item.title,
      when: formatLongDate(suggested),
      detail: item.place ?? `Aralık: ${item.from}–${item.to}. gün\n${formatDateRange(window.start, window.end)}`,
      start: window.start,
      end: window.end,
      muted: item.muted
    };
  });

  for (const item of months) {
    const window = dayWindow(birth, item.from, item.to);
    const suggested = clampDate(addMonths(birth, item.month), window.start, window.end);
    entries.push({
      key: item.key,
      title: item.title,
      when: formatLongDate(suggested),
      detail: `Aralık: ${item.from}–${item.to}. gün\n${formatDateRange(window.start, window.end)}`,
      start: window.start,
      end: window.end
    });
  }

  return { entries };
}

function pregnancy(sat: Date): ScheduleResult {
  const windows: Array<{ key: string; title: string; detail: string; startWeek: number; endWeek: number; endExtra?: number }> = [
    { key: "i1", title: "1. izlem", detail: "İlk 14 hafta", startWeek: 0, endWeek: 14 },
    { key: "i2", title: "2. izlem", detail: "18–24. hafta", startWeek: 18, endWeek: 24, endExtra: 6 },
    { key: "i3", title: "3. izlem", detail: "28–32. hafta", startWeek: 28, endWeek: 32, endExtra: 6 },
    { key: "i4", title: "4. izlem", detail: "36–38. hafta", startWeek: 36, endWeek: 38, endExtra: 6 }
  ];

  return {
    summary: `Tahmini doğum: ${formatLongDate(addDays(sat, 280))}`,
    entries: windows.map((item) => {
      const start = addDays(sat, item.startWeek * 7);
      const end = addDays(sat, item.endWeek * 7 + (item.endExtra ?? 0));
      return {
        key: item.key,
        title: item.title,
        when: formatDateRange(start, end),
        detail: item.detail,
        start,
        end
      };
    })
  };
}

function postpartum(birth: Date): ScheduleResult {
  const hospital: Array<{ key: string; title: string }> = [
    { key: "h1", title: "İlk 1 saat" },
    { key: "h2", title: "1–6. saat" },
    { key: "h3", title: "6–24. saat" }
  ];

  const home: Array<{ key: string; title: string; from: number; to: number }> = [
    { key: "d2", title: "2–5. gün", from: 2, to: 5 },
    { key: "d13", title: "13–17. gün", from: 13, to: 17 },
    { key: "d30", title: "30–42. gün", from: 30, to: 42 }
  ];

  return {
    entries: [
      ...hospital.map((item) => ({
        key: item.key,
        title: item.title,
        when: formatLongDate(birth),
        detail: "Hastanede",
        start: birth,
        end: birth,
        muted: true
      })),
      ...home.map((item) => {
        const start = addDays(birth, item.from);
        const end = addDays(birth, item.to);
        return {
          key: item.key,
          title: item.title,
          when: formatDateRange(start, end),
          detail: "Aile sağlığı merkezinde",
          start,
          end
        };
      })
    ]
  };
}

export function validateScheduleDate(kind: ScheduleKind, date: Date) {
  const today = todayStart();

  if (kind === "pregnancy") {
    if (date > today) return "Son adet tarihi bugünden ileri olamaz.";
    if (diffDays(date, today) > 45 * 7) {
      return "Bu tarih güncel bir gebelik hesabı için çok eski. Son 45 hafta içinden bir tarih seçin.";
    }
    return null;
  }

  if (date > today) return "Doğum tarihi bugünden ileri olamaz.";
  if (date < earliestBirth) return "1990 ve sonrasındaki bir doğum tarihi seçin.";
  return null;
}

export function buildSchedule(kind: ScheduleKind, date: Date): ScheduleResult {
  if (kind === "vaccine") return vaccine(date);
  if (kind === "baby") return baby(date);
  if (kind === "pregnancy") return pregnancy(date);
  return postpartum(date);
}
