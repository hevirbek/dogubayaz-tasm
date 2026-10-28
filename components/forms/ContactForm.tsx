"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormErrors = Record<string, string[] | undefined>;

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setErrors({});
    setMessage(null);
    setStatus("idle");

    startTransition(async () => {
      const payload = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        subject: String(formData.get("subject") || ""),
        message: String(formData.get("message") || ""),
        consent: formData.get("consent") === "on"
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = (await response.json()) as {
          ok: boolean;
          message?: string;
          errors?: FormErrors;
        };

        if (!response.ok || !data.ok) {
          setErrors(data.errors || {});
          setMessage(data.message || "Mesaj gönderilemedi. Lütfen tekrar deneyiniz.");
          setStatus("error");
          return;
        }

        form.reset();
        setStatus("success");
        setMessage(data.message || "Mesajınız alınmıştır.");
      } catch {
        setStatus("error");
        setMessage("Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate>
      <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm leading-6 text-sky-950">
        Lütfen bu form üzerinden TC kimlik numarası, tıbbi rapor, tanı,
        reçete, test sonucu veya özel sağlık bilginizi paylaşmayınız. Bu form
        yalnızca genel iletişim amaçlıdır.
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="name">Ad Soyad *</Label>
        <Input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
        <FieldError errors={errors.name} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
          <FieldError errors={errors.email} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
          <FieldError errors={errors.phone} />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="subject">Konu</Label>
        <Input id="subject" name="subject" aria-invalid={Boolean(errors.subject)} />
        <FieldError errors={errors.subject} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="message">Mesaj *</Label>
        <Textarea
          id="message"
          name="message"
          maxLength={1000}
          rows={4}
          className="min-h-24"
          aria-invalid={Boolean(errors.message)}
        />
        <div className="flex justify-between gap-4 text-xs text-muted-foreground">
          <FieldError errors={errors.message} />
          <span>En fazla 1000 karakter</span>
        </div>
      </div>

      <div className="flex gap-3 rounded-lg border border-border p-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
          aria-invalid={Boolean(errors.consent)}
        />
        <div className="grid gap-1">
          <Label htmlFor="consent" className="leading-6">
            Formdaki bilgilerin yalnızca genel iletişim talebimin
            değerlendirilmesi amacıyla işlenmesini kabul ediyorum. *
          </Label>
          <FieldError errors={errors.consent} />
        </div>
      </div>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={
            status === "success"
              ? "rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950"
              : "rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-950"
          }
        >
          {message}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Gönderiliyor..." : "Mesajı Gönder"}
      </Button>
    </form>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-sm text-red-700">{errors[0]}</p>;
}
