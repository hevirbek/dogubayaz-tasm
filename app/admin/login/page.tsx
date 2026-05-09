import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";

import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAdminAuthConfigured } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Girişi",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const configured = isAdminAuthConfigured();

  return (
    <section className="section-padding bg-slate-50">
      <div className="container grid min-h-[58vh] place-items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <LockKeyhole aria-hidden className="h-6 w-6" />
            </span>
            <CardTitle className="mt-4">Admin girişi</CardTitle>
          </CardHeader>
          <CardContent>
            {!configured ? (
              <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                Admin girişi için `ADMIN_PASSWORD` ortam değişkeni
                tanımlanmalıdır.
              </p>
            ) : (
              <form action={loginAction} className="grid gap-5">
                {params.error === "invalid" ? (
                  <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-950">
                    Şifre hatalı. Lütfen tekrar deneyiniz.
                  </p>
                ) : null}
                <div className="grid gap-2">
                  <Label htmlFor="password">Admin şifresi</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <Button type="submit">Giriş Yap</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
