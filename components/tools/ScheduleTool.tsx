"use client";

import { Printer } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { VaccineChart } from "@/components/tools/VaccineChart";
import { siteConfig } from "@/config/site";
import type { CalculatorTool, ScheduleKind } from "@/lib/tools/catalog";
import { formatLongDate, parseLocalDate, todayStart } from "@/lib/tools/dates";
import { buildSchedule, validateScheduleDate, type ScheduleEntry } from "@/lib/tools/schedules";
import { cn } from "@/lib/utils";

function entryState(entry: ScheduleEntry, today: Date) {
  const past = entry.end < today;
  const current = entry.start <= today && today <= entry.end;
  return { past, current };
}

export function ScheduleTool({ tool }: { tool: CalculatorTool }) {
  const kind = tool.schedule as ScheduleKind;
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReturnType<typeof buildSchedule> | null>(null);
  const selected = value ? parseLocalDate(value) : null;

  const board = useMemo(() => {
    if (!result) return null;
    const today = todayStart();
    const states = result.entries.map((entry) => ({ entry, ...entryState(entry, today) }));
    const highlighted =
      states.find((item) => item.current)?.entry.key ??
      states.find((item) => item.entry.start > today)?.entry.key;
    return { states, highlighted };
  }, [result]);

  const submit = () => {
    if (!selected) {
      setError("Geçerli bir tarih seçin.");
      setResult(null);
      return;
    }
    const message = validateScheduleDate(kind, selected);
    if (message) {
      setError(message);
      setResult(null);
      return;
    }
    setError("");
    setResult(buildSchedule(kind, selected));
  };

  return (
    <section
      className={cn(
        "schedule-sheet mx-auto w-full px-4 py-10",
        kind === "vaccine" ? "max-w-6xl" : "max-w-xl"
      )}
    >
      <div className={cn("text-center", kind === "vaccine" && "no-print")}>
        <h1 className="text-2xl font-bold tracking-normal text-slate-950">{tool.label}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
      </div>

      <form
        className="no-print mt-6 rounded-xl border border-border bg-background p-4 shadow-card"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor="tool-date" className="block text-center text-sm font-medium text-foreground">
          {tool.dateLabel}
        </label>
        <input
          id="tool-date"
          type="date"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError("");
          }}
          className="mx-auto mt-3 flex h-12 w-full max-w-xs rounded-md border border-input bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p
          className={cn(
            "mt-3 text-center text-base font-semibold",
            selected ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {selected ? formatLongDate(selected) : "Tarihi seçin"}
        </p>
        {error ? (
          <p role="alert" className="mt-2 text-center text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="mx-auto mt-4 flex" disabled={!selected}>
          Takvimi oluştur
        </Button>
      </form>

      {board && selected ? (
        <div className="mt-5">
          {result?.matrix ? null : (
            <div className="hidden print:mb-3 print:block">
              <p className="text-sm text-slate-700">{siteConfig.asmName}</p>
              <p className="mt-1 text-sm text-slate-700">
                {tool.dateLabel}: {formatLongDate(selected)}
              </p>
            </div>
          )}
          <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-2">
            {result?.summary ? (
              <p className="text-sm font-medium text-foreground">{result.summary}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Sıradaki dönem daha koyu renkte.</p>
            )}
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => window.print()}
            >
              <Printer aria-hidden className="h-4 w-4" />
              Yazdır
            </button>
          </div>
          {result?.matrix ? <VaccineChart matrix={result.matrix} /> : null}
          {result?.matrix ? null : (
          <ol className="overflow-hidden rounded-xl border border-border bg-background">
            {board.states.map(({ entry, past, current }, index) => {
              const highlighted = entry.key === board.highlighted;
              return (
                <li key={entry.key}>
                  <article
                    aria-current={highlighted ? "true" : undefined}
                    className={cn(
                      "flex gap-3 px-4 py-3",
                      index > 0 && "border-t border-border",
                      highlighted && "bg-accent",
                      !highlighted && past && "text-slate-500",
                      !highlighted && !past && entry.muted && "bg-slate-50 text-slate-600"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        highlighted || current ? "bg-primary" : past ? "bg-slate-300" : "bg-slate-400"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className={cn("text-xs font-semibold uppercase tracking-wide", past ? "text-inherit" : "text-primary")}>
                          {entry.title}
                        </p>
                        <p className="text-right text-sm font-semibold leading-5">{entry.when}</p>
                      </div>
                      <p className="mt-0.5 whitespace-pre-line text-sm leading-5 opacity-80">{entry.detail}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
          )}
          {tool.footnote ? (
            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">{tool.footnote}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
