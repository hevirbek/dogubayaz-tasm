import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ad soyad alanı en az 2 karakter olmalıdır.")
    .max(120, "Ad soyad alanı çok uzun."),
  email: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value))
    .pipe(z.string().email("Geçerli bir e-posta adresi giriniz.").optional()),
  phone: z
    .string()
    .trim()
    .max(40, "Telefon alanı çok uzun.")
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  subject: z
    .string()
    .trim()
    .max(160, "Konu alanı çok uzun.")
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj alanı en az 10 karakter olmalıdır.")
    .max(1000, "Mesaj alanı en fazla 1000 karakter olabilir."),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "İletişim amacıyla işlenmesine onay vermelisiniz."
    })
  })
});

export type ContactInput = z.infer<typeof contactSchema>;
