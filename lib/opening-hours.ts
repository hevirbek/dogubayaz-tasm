import { siteConfig } from "@/config/site";

export type OpeningStatus = {
  isOpen: boolean;
  label: string;
  detail: string;
};

const WEEKDAY_OPEN_HOUR = 8;
const WEEKDAY_CLOSE_HOUR = 17;

export function getOpeningStatus(now = new Date()): OpeningStatus {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timeZone,
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23"
  });

  const parts = formatter.formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const isWeekday = weekday !== "Sat" && weekday !== "Sun";
  const isOpen = isWeekday && hour >= WEEKDAY_OPEN_HOUR && hour < WEEKDAY_CLOSE_HOUR;

  if (isOpen) {
    return {
      isOpen: true,
      label: "Bugün açık",
      detail: "08:00 - 17:00 saatleri arasında hizmet veriyoruz."
    };
  }

  if (isWeekday && hour < WEEKDAY_OPEN_HOUR) {
    return {
      isOpen: false,
      label: "Henüz açılmadı",
      detail: "Bugün 08:00 itibarıyla hizmet vermeye başlarız."
    };
  }

  if (isWeekday) {
    return {
      isOpen: false,
      label: "Bugün kapandı",
      detail: "Bir sonraki iş gününde 08:00 itibarıyla hizmet veririz."
    };
  }

  return {
    isOpen: false,
    label: "Bugün kapalı",
    detail: "Hafta içi 08:00 - 17:00 saatleri arasında hizmet veririz."
  };
}
