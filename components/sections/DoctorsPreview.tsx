import { DoctorCard } from "@/components/cards/DoctorCard";
import type { Doctor } from "@/lib/data/doctors";

export function DoctorsPreview({
  doctors,
  leaves = []
}: {
  doctors: Doctor[];
  leaves?: { doctor_id: string; start_date: string; end_date: string; reason?: string | null }[];
}) {
  return (
    <section className="section-padding">
      <div className="container">
        <h1 className="max-w-3xl text-lg font-semibold leading-8 text-foreground sm:text-xl">
          Aile Sağlığı Merkezimizde 11 Aile Hekimliği Birimi (AHB) bulunmaktadır.
          Her birimde bir hekim ve bir aile sağlığı çalışanı hemşire görev yapmaktadır.
        </h1>
        {doctors.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => {
              const activeLeave = leaves?.find((leave) => leave.doctor_id === doctor.id);
              return <DoctorCard key={doctor.id} doctor={doctor} leave={activeLeave} />;
            })}
          </div>
        ) : (
          <p className="mt-8 rounded-lg border border-dashed border-border p-6 text-muted-foreground">
            Şu anda görüntülenecek aktif hekim bilgisi bulunmuyor.
          </p>
        )}
      </div>
    </section>
  );
}
