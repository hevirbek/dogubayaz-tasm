"use client";

import { todayStart } from "@/lib/tools/dates";
import type { VaccineMatrix } from "@/lib/tools/schedules";
import { cn } from "@/lib/utils";

const legend = [
  ["Hep-B", "Hepatit B aşısı"],
  ["BCG", "Verem aşısı"],
  ["KPA", "Konjuge pnömokok aşısı"],
  ["DaBT-İPA-Hib-HepB", "Difteri, asellüler boğmaca, tetanos, inaktif polio, Hemofilus influenza tip b, Hepatit B"],
  ["OPA", "Oral polio aşısı"],
  ["Suçiçeği", "Suçiçeği aşısı"],
  ["KKK", "Kızamık, kızamıkçık, kabakulak aşısı"],
  ["Hep-A", "Hepatit A aşısı"],
  ["DaBT-İPA", "Difteri, asellüler boğmaca, tetanos, inaktif polio"],
  ["Td", "Erişkin tetanos-difteri aşısı"]
];

export function VaccineChart({ matrix }: { matrix: VaccineMatrix }) {
  const today = todayStart();
  const nextKey = matrix.columns.find((column) => column.date >= today)?.key;

  return (
    <div className="vaccine-chart overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="bg-[#1c4e72] px-4 py-3 text-center text-white">
        <h2 className="text-base font-semibold tracking-normal sm:text-lg">Ulusal Çocukluk Dönemi Aşılama Takvimi</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-36 border-r border-slate-200 bg-slate-100 px-3 py-2" />
              {matrix.columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "border-l border-slate-200 bg-slate-100 px-1 py-2 text-center text-[11px] font-bold uppercase leading-tight text-[#1a7f93]",
                    column.key === nextKey && "text-[#0f5f73]"
                  )}
                >
                  <span className="whitespace-pre-line">{column.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((row) => (
              <tr key={row.key}>
                <th className="sticky left-0 z-10 border-r border-t border-slate-200 bg-white px-3 py-2 text-xs font-semibold leading-4 text-slate-800">
                  {row.label}
                </th>
                {matrix.columns.map((column) => {
                  const filled = row.columns.includes(column.key);
                  const upcoming = column.key === nextKey;
                  return (
                    <td
                      key={column.key}
                      className={cn(
                        "border-l border-t border-slate-200 px-1 py-1.5 text-center align-middle",
                        filled && "bg-[#d7f1f6] font-semibold text-[#16324f]",
                        filled && upcoming && "bg-[#b7e3ef]",
                        !filled && "bg-white"
                      )}
                    >
                      {filled ? (
                        <span className="block whitespace-pre-line text-[11px] leading-tight">{column.when}</span>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="vaccine-legend grid gap-x-8 gap-y-1 border-t border-slate-200 px-4 py-3 text-xs leading-5 text-slate-600 sm:grid-cols-2">
        {legend.map(([name, meaning]) => (
          <p key={name}>
            <span className="font-semibold text-[#1c4e72]">{name}:</span> {meaning}
          </p>
        ))}
      </div>
    </div>
  );
}
