# Aile Sağlığı Merkezi Web Sitesi

Next.js App Router, TypeScript, Tailwind CSS, Supabase ve Resend destekli modern ASM web sitesi. Proje Vercel üzerinde ücretsiz katmanda çalışacak şekilde hazırlanmıştır.

## Yerel Kurulum

```bash
npm install
npm run dev
```

Site varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Ortam Değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın ve ihtiyaç duyduğunuz alanları doldurun.

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=
NEXT_PUBLIC_ASM_NAME=
NEXT_PUBLIC_ASM_PHONE=
NEXT_PUBLIC_ASM_EMAIL=
NEXT_PUBLIC_ASM_ADDRESS=
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

ADMIN_PASSWORD=
```

Supabase veya Resend bilgileri yoksa site çalışmaya devam eder. Doktor, duyuru ve haber verileri yerel fallback dosyalarından gelir. İletişim formu yapılandırma eksikliğini kullanıcı dostu bir mesajla bildirir.

## Supabase Kurulumu

1. Supabase ücretsiz katmanda yeni proje oluşturun.
2. SQL Editor içinde `supabase/schema.sql` içeriğini çalıştırın.
3. Vercel ortam değişkenlerine `SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY` ekleyin.
4. Doktor ve duyuru içeriklerini Supabase Table Editor üzerinden düzenleyin.

Projeyi daha önce kurduysanız ve `doctors` tablosu zaten varsa, yeni personel alanları için şu migration komutunu çalıştırabilirsiniz:

```sql
alter table public.doctors
  add column if not exists duty_type text,
  add column if not exists note text;
```

Haberler için tablo ve kapak görseli kovası henüz yoksa şu komutu da çalıştırın:

```sql
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  excerpt text not null,
  content text not null,
  cover_image_url text not null,
  cover_image_path text,
  published_at timestamptz not null default now(),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists news_published_at_idx
  on public.news (published_at desc);

grant select, insert, update, delete
  on public.news
  to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'news-covers',
  'news-covers',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read for news covers'
  ) then
    create policy "Public read for news covers"
      on storage.objects
      for select
      to public
      using (bucket_id = 'news-covers');
  end if;
end $$;
```

Üretime çıkmadan önce tablo erişimleri ve RLS politikaları kurum politikanıza göre yapılandırılmalıdır. İletişim formu eklemeleri sunucu tarafındaki API route üzerinden service role key ile yapılır; bu anahtar tarayıcıya gönderilmez.

## Resend Kurulumu

1. Resend ücretsiz katmanda hesap oluşturun.
2. Gönderici alan adınızı veya doğrulanmış gönderici adresinizi tanımlayın.
3. `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` değişkenlerini ekleyin.

Supabase ve Resend birlikte kullanılabilir. Supabase mesajı kaydeder, Resend bildirim e-postası gönderir.

## Admin Paneli

Basit admin paneli `/admin` adresindedir. Giriş için `ADMIN_PASSWORD` ortam değişkeni kullanılır.

Admin paneliyle şunlar yönetilebilir:

- Hekim/personel ekleme, düzenleme, silme
- Hekim/personel aktif-pasif durumu
- Duyuru ekleme, düzenleme, silme
- Duyuru aktif-pasif durumu
- Haber ekleme, düzenleme, silme
- Haber kapak görseli ve aktif-pasif durumu

Admin işlemleri yalnızca sunucu tarafında çalışır ve Supabase `SUPABASE_SERVICE_ROLE_KEY` kullanır. Bu anahtar tarayıcıya gönderilmez.

Kurulum adımları:

1. Supabase tablolarını `supabase/schema.sql` ile oluşturun.
2. Vercel veya `.env.local` içine `SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY` ekleyin.
3. Güçlü bir `ADMIN_PASSWORD` belirleyin.
4. `/admin` adresine giderek giriş yapın.

Supabase proje oluştururken “Automatically expose new tables” seçeneğini kapattıysanız, bu güvenli bir tercihtir; ancak SQL Editor’da `schema.sql` içindeki `grant ... to service_role` satırlarının da çalıştırılması gerekir. Aksi halde admin panelinde kayıt kaydetme sırasında yetki hatası alınır.

Örnek `.env.local`:

```bash
SUPABASE_URL=https://proje-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=uzun-ve-guclu-bir-sifre
```

Not: Bu v1 panel tek şifreli basit yönetim içindir. Çok kullanıcılı rol bazlı yönetim gerekiyorsa bir sonraki aşamada Supabase Auth ve rol tablosu eklenebilir.

## Vercel Yayına Alma

1. Projeyi GitHub deposuna gönderin.
2. Vercel üzerinde yeni proje olarak içe aktarın.
3. Framework olarak Next.js otomatik algılanır.
4. Ortam değişkenlerini Vercel Project Settings bölümünden ekleyin.
5. Deploy işlemini başlatın.

## Özel Alan Adı

1. Vercel Project Settings > Domains bölümüne alan adınızı ekleyin.
2. Vercel’in verdiği DNS kayıtlarını alan adı sağlayıcınızda tanımlayın.
3. `NEXT_PUBLIC_SITE_URL` değerini canlı alan adınızla güncelleyin.
4. Yeniden deploy alın.

## SEO Kontrol Listesi

- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_ASM_NAME`, adres ve telefon bilgilerini doldurun.
- Sayfa başlıkları ve açıklamaları Metadata API ile oluşturulur.
- `sitemap.xml` ve `robots.txt` otomatik üretilir.
- JSON-LD yerel sağlık merkezi yapılandırılmış verisi eklenmiştir.
- Harita için Google Maps embed URL’si eklenebilir.
- Görseller `next/image` ile kullanılır ve alt metin içerir.

## Google Search Console

1. Canlı alan adını Search Console’a ekleyin.
2. DNS veya HTML doğrulaması yapın.
3. `https://alanadiniz.com/sitemap.xml` adresini sitemap olarak gönderin.
4. Ana sayfa ve önemli sayfalar için URL denetimi çalıştırın.
5. Dizin kapsamı, mobil kullanılabilirlik ve zengin sonuç raporlarını takip edin.

## Komutlar

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## İçerik Güncelleme

Admin panel v1 kapsamına dahil değildir. İçerik yönetimi için iki seçenek vardır:

- Supabase Table Editor ile `doctors` ve `announcements` tablolarını düzenlemek.
- Supabase yapılandırılmadan `lib/data/doctors.ts` ve `lib/data/announcements.ts` dosyalarını düzenlemek.
