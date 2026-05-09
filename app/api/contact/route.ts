import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validators/contact";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Form verisi okunamadı. Lütfen tekrar deneyiniz."
      },
      { status: 400 }
    );
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Lütfen formdaki alanları kontrol ediniz.",
        errors: result.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const input = result.data;
  const hasSupabase = isSupabaseConfigured();
  const hasResend = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL
  );

  if (!hasSupabase && !hasResend) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "İletişim servisi henüz yapılandırılmamış. Geliştirme ortamında Supabase veya Resend bilgilerini ekledikten sonra form gönderimi aktif olur."
      },
      { status: 503 }
    );
  }

  if (hasSupabase) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase!.from("contact_messages").insert({
      name: input.name,
      email: input.email || null,
      phone: input.phone || null,
      subject: input.subject || null,
      message: input.message
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Mesaj kaydedilemedi. Lütfen daha sonra tekrar deneyiniz veya telefonla ulaşınız."
        },
        { status: 500 }
      );
    }
  }

  if (hasResend) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `${siteConfig.asmName} iletişim formu: ${input.subject || "Genel mesaj"}`,
      html: `
        <h1>Yeni iletişim formu mesajı</h1>
        <p><strong>Ad Soyad:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(input.email || "-")}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(input.phone || "-")}</p>
        <p><strong>Konu:</strong> ${escapeHtml(input.subject || "-")}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
      `
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Bildirim e-postası gönderilemedi. Lütfen daha sonra tekrar deneyiniz veya telefonla ulaşınız."
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Mesajınız alınmıştır. En kısa sürede sizinle iletişime geçilecektir."
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
