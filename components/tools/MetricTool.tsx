"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { CalculatorTool, MetricKind } from "@/lib/tools/catalog";
import {
  activities,
  assessBmi,
  assessEnergy,
  assessMilitary,
  assessWaist,
  type BmiAssessment,
  type EnergyAssessment,
  type MilitaryAssessment,
  type Sex,
  type WaistAssessment
} from "@/lib/tools/metrics";
import { cn } from "@/lib/utils";

const fieldClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const toneClass = {
  low: "bg-sky-50 text-sky-950",
  ok: "bg-accent text-accent-foreground",
  mid: "bg-amber-50 text-amber-950",
  high: "bg-rose-50 text-rose-950"
};

function numberValue(value: string) {
  if (value.trim() === "") return Number.NaN;
  return Number(value.replace(",", "."));
}

function SexField({ value, onChange }: { value: Sex | ""; onChange: (value: Sex) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">Cinsiyet</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {(
          [
            ["kadin", "Kadın"],
            ["erkek", "Erkek"]
          ] as const
        ).map(([id, label]) => (
          <label
            key={id}
            className={cn(
              "cursor-pointer rounded-md border border-input px-3 py-3 text-center text-sm font-medium",
              value === id && "border-primary bg-accent text-accent-foreground"
            )}
          >
            <input
              type="radio"
              name="sex"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              className="sr-only"
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function MetricTool({ tool }: { tool: CalculatorTool }) {
  const metric = tool.metric as MetricKind;
  const [sex, setSex] = useState<Sex | "">("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [minutes, setMinutes] = useState("");
  const [activityId, setActivityId] = useState<string>(activities[3].id);
  const [error, setError] = useState("");
  const [military, setMilitary] = useState<MilitaryAssessment | null>(null);
  const [bmi, setBmi] = useState<BmiAssessment | null>(null);
  const [waistResult, setWaistResult] = useState<WaistAssessment | null>(null);
  const [energy, setEnergy] = useState<EnergyAssessment | null>(null);

  const groups = useMemo(() => {
    const names = [...new Set(activities.map((item) => item.group))];
    return names.map((name) => ({
      name,
      items: activities.filter((item) => item.group === name)
    }));
  }, []);

  const hasResult =
    (military && military.status !== "invalid") ||
    (bmi && bmi.status === "ok") ||
    (waistResult && waistResult.status === "ok") ||
    (energy && energy.status === "ok");

  const submit = () => {
    setMilitary(null);
    setBmi(null);
    setWaistResult(null);
    setEnergy(null);

    if (metric === "military") {
      const result = assessMilitary(sex, numberValue(height), numberValue(weight));
      if (result.status === "invalid") {
        setError(result.message);
        return;
      }
      setError("");
      setMilitary(result);
      return;
    }

    if (metric === "bmi") {
      const result = assessBmi(numberValue(height), numberValue(weight));
      if (result.status === "invalid") {
        setError(result.message);
        return;
      }
      setError("");
      setBmi(result);
      return;
    }

    if (metric === "waist") {
      const result = assessWaist(sex, numberValue(waist));
      if (result.status === "invalid") {
        setError(result.message);
        return;
      }
      setError("");
      setWaistResult(result);
      return;
    }

    const result = assessEnergy(numberValue(weight), numberValue(minutes), activityId);
    if (result.status === "invalid") {
      setError(result.message);
      return;
    }
    setError("");
    setEnergy(result);
  };

  return (
    <section
      className={cn(
        "mx-auto flex w-full max-w-lg flex-col px-4 py-10",
        !hasResult && "min-h-[calc(100dvh-8rem)] justify-center"
      )}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-normal text-slate-950">{tool.label}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
      </div>

      <form
        className="mt-6 grid gap-4 rounded-xl border border-border bg-background p-5 shadow-card"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        {metric === "military" || metric === "waist" ? <SexField value={sex} onChange={setSex} /> : null}

        {metric === "military" || metric === "bmi" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="height">Boy (cm)</Label>
              <input
                id="height"
                inputMode="decimal"
                className={fieldClass}
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Kilo (kg)</Label>
              <input
                id="weight"
                inputMode="decimal"
                className={fieldClass}
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
          </div>
        ) : null}

        {metric === "waist" ? (
          <div className="grid gap-2">
            <Label htmlFor="waist">Bel çevresi (cm)</Label>
            <input
              id="waist"
              inputMode="decimal"
              className={fieldClass}
              value={waist}
              onChange={(event) => setWaist(event.target.value)}
            />
          </div>
        ) : null}

        {metric === "energy" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="energy-weight">Kilo (kg)</Label>
                <input
                  id="energy-weight"
                  inputMode="decimal"
                  className={fieldClass}
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minutes">Süre (dakika)</Label>
                <input
                  id="minutes"
                  inputMode="numeric"
                  className={fieldClass}
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="activity">Aktivite</Label>
              <select
                id="activity"
                className={fieldClass}
                value={activityId}
                onChange={(event) => setActivityId(event.target.value)}
              >
                {groups.map((group) => (
                  <optgroup key={group.name} label={group.name}>
                    {group.items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </>
        ) : null}

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit">Hesapla</Button>
        <p className="text-center text-xs leading-5 text-muted-foreground">{tool.footnote}</p>
      </form>

      {military && military.status !== "invalid" ? (
        <article className={cn("mt-4 rounded-xl p-5 text-center", military.status === "fit" ? toneClass.ok : toneClass.mid)}>
          <p className="text-xl font-semibold">
            {military.status === "fit" && "Cetvele göre boy-kilo aralığındasınız."}
            {military.status === "under" && "Kilo, bu boy için alt sınırın altında."}
            {military.status === "over" && "Kilo, bu boy için üst sınırın üstünde."}
            {military.status === "height" && military.message}
          </p>
          {military.status !== "height" ? (
            <p className="mt-2 text-sm">
              Alt sınır {military.min} kg, üst sınır {military.max} kg.
            </p>
          ) : null}
        </article>
      ) : null}

      {bmi && bmi.status === "ok" ? (
        <article className={cn("mt-4 rounded-xl p-5 text-center", toneClass[bmi.tone])}>
          <p className="text-4xl font-bold tracking-normal">
            {bmi.bmi.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </p>
          <p className="mt-1 text-lg font-semibold">{bmi.label}</p>
        </article>
      ) : null}

      {waistResult && waistResult.status === "ok" ? (
        <article className={cn("mt-4 rounded-xl p-5 text-center", toneClass[waistResult.tone])}>
          <p className="text-2xl font-semibold">{waistResult.label}</p>
          <p className="mt-2 text-sm">
            {sex === "erkek"
              ? "Artmış risk 94 cm, yüksek risk 102 cm ve üzeridir."
              : "Artmış risk 80 cm, yüksek risk 88 cm ve üzeridir."}
          </p>
        </article>
      ) : null}

      {energy && energy.status === "ok" ? (
        <article className="mt-4 rounded-xl bg-accent p-5 text-center text-accent-foreground">
          <p className="text-4xl font-bold tracking-normal">
            {energy.kcal.toLocaleString("tr-TR")} kcal
          </p>
          <p className="mt-2 text-sm">
            {energy.weightKg.toLocaleString("tr-TR")} kg · {energy.minutes.toLocaleString("tr-TR")} dakika · {energy.activity}
          </p>
        </article>
      ) : null}
    </section>
  );
}
