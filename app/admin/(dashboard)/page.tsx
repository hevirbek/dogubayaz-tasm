import { Database, Activity, CheckCircle, Newspaper, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";
import { 
  getAdminAnnouncements, 
  getAdminDoctors,
  getAdminContactMessages,
  getAdminNews
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const supabaseConfigured = isSupabaseConfigured();

  const [doctors, announcements, news, contactMessages] = supabaseConfigured
    ? await Promise.all([
        getAdminDoctors(), 
        getAdminAnnouncements(),
        getAdminNews(),
        getAdminContactMessages()
      ])
    : [[], [], [], []];

  if (!supabaseConfigured) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-950">
            <Database aria-hidden className="h-5 w-5" />
            Supabase bağlantısı eksik
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7 text-amber-950">
            Admin panelinin içerik kaydedebilmesi için `SUPABASE_URL` ve
            `SUPABASE_SERVICE_ROLE_KEY` ortam değişkenlerini tanımlayın ve
            `supabase/schema.sql` dosyasındaki tabloları oluşturun.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Hoş Geldiniz</h1>
        <p className="text-muted-foreground mt-2">
          Aile Sağlığı Merkezi yönetim panelinden içeriklerinizi güncelleyebilirsiniz.
        </p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Hekim</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
            <p className="text-xs text-muted-foreground">Sistemde kayıtlı hekim/personel</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Duyurular</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.filter(a => a.is_active).length}</div>
            <p className="text-xs text-muted-foreground">Toplam {announcements.length} duyuru</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Haberler</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.filter((item) => item.is_active).length}</div>
            <p className="text-xs text-muted-foreground">Toplam {news.length} haber</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Mesajlar</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactMessages.length}</div>
            <p className="text-xs text-muted-foreground">İletişim formundan gelen</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
