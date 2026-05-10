import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminContactMessages } from "@/lib/admin/data";
import { deleteContactMessageAction } from "@/app/admin/actions";
import { EmptyState } from "@/components/admin/Shared";
import { ActionForm } from "@/components/admin/ActionForm";

export const dynamic = "force-dynamic";

export default async function MesajlarPage() {
  await requireAdmin();
  const contactMessages = await getAdminContactMessages();

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Gelen Mesajlar</h1>
        <p className="mt-1 text-sm text-muted-foreground">İletişim formundan gönderilen mesajları görüntüleyin.</p>
      </div>

      <div className="grid gap-5">
        {contactMessages.length > 0 ? (
          contactMessages.map((msg: any) => (
            <ContactMessageCard key={msg.id} message={msg} />
          ))
        ) : (
          <EmptyState text="Henüz gelen mesaj bulunmuyor." />
        )}
      </div>
    </div>
  );
}

function ContactMessageCard({ message }: { message: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {message.subject}
        </CardTitle>
        <div className="text-sm text-muted-foreground flex justify-between">
          <span>Gönderen: {message.name} ({message.email || "-"} | {message.phone || "-"})</span>
          <span>{new Date(message.created_at).toLocaleString("tr-TR")}</span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="rounded bg-muted p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {message.message}
        </div>
        <ActionForm action={deleteContactMessageAction}>
          <input type="hidden" name="id" value={message.id} />
          <Button type="submit" variant="outline" className="w-full sm:w-fit border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
            Mesajı Sil
          </Button>
        </ActionForm>
      </CardContent>
    </Card>
  );
}
