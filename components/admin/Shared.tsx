import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
      />
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-lg border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">
      {text}
    </p>
  );
}

export function toDateTimeLocal(value?: string) {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}
