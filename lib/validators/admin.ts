import { z } from "zod";

const emptyToNull = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

export const doctorAdminSchema = z.object({
  id: z.string().optional(),
  full_name: z.string().trim().min(2).max(160),
  title: z.string().trim().min(2).max(120),
  room: z.preprocess(emptyToNull, z.string().max(120).nullable()),
  working_hours: z.preprocess(emptyToNull, z.string().max(160).nullable()),
  duty_type: z.preprocess(emptyToNull, z.string().max(160).nullable()),
  note: z.preprocess(emptyToNull, z.string().max(400).nullable()),
  sort_order: z.coerce.number().int().min(0).max(999),
  is_active: z.coerce.boolean()
});

export const announcementAdminSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2).max(180),
  content: z.string().trim().min(5).max(3000),
  published_at: z.string().min(10).max(40),
  is_active: z.coerce.boolean()
});
