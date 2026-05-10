import {
  Baby,
  ClipboardCheck,
  FileText,
  HeartPulse,
  type LucideIcon,
  ShieldCheck,
  Stethoscope
} from "lucide-react";

export type Service = {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  detailIntro: string;
  detailSections: {
    title: string;
    content: string;
  }[];
  contactNote: string;
};

export const services: Service[] = [
  {
    title: "Aşı Takibi ve Bağışıklama",
    slug: "asi-takibi",
    description: "Bebek, çocuk ve yetişkinler için Sağlık Bakanlığı ulusal aşı takvimi kapsamında ücretsiz, güvenli ve düzenli aşı takip hizmeti sunulmaktadır.",
    icon: ShieldCheck,
    detailIntro: "Aşı takibi, toplum sağlığını korumak ve önlenebilir hastalıklara karşı direnç geliştirmek için sunduğumuz en önemli koruyucu sağlık hizmetlerinden biridir. Aile sağlığı merkezimizde tüm aşı uygulamaları soğuk zincir kurallarına titizlikle uyularak, güvenli ve hijyenik bir ortamda gerçekleştirilir.",
    detailSections: [
      {
        title: "Bebek ve Çocuk Aşıları",
        content: "Bebeğinizin doğumundan itibaren ulusal aşı takvimine uygun olarak; hepatit, verem (BCG), karma aşılar, pnömokok, kızamık, kızamıkçık, kabakulak ve suçiçeği gibi aşıları düzenli olarak takip ediyor ve uyguluyoruz. Aşı takviminiz aile hekimliğimiz tarafından size detaylı olarak bildirilir ve hatırlatmalar yapılır."
      },
      {
        title: "Yetişkin ve Risk Grubu Aşıları",
        content: "Gebelikte tetanoz aşısı, kronik hastalığı olanlar veya ileri yaş grubundakiler için grip ve zatürre aşıları ile riskli durumlardaki (kuduz, hepatit vb.) aşı uygulamaları merkezimizde planlanmakta ve yönlendirilmektedir."
      },
      {
        title: "Merkeze Gelmeden Önce",
        content: "Aşı uygulaması için geldiğinizde mutlaka çocuğunuzun veya sizin aşı kartınızı, kimlik belgenizi yanınızda bulundurmayı unutmayın. Hastalık dönemlerinde (yüksek ateş vb.) aşı uygulanıp uygulanamayacağı doktorumuz tarafından değerlendirilecektir."
      }
    ],
    contactNote: "Aşı takviminiz, eksik aşılarınız veya aşı uygulamaları hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz."
  },
  {
    title: "Gebe ve Lohusa İzlemi",
    slug: "gebe-izlem",
    description: "Anne ve bebek sağlığını korumak için gebelik başlangıcından lohusalık döneminin sonuna kadar düzenli tıbbi takip ve danışmanlık hizmeti.",
    icon: HeartPulse,
    detailIntro: "Sağlıklı bir nesil, sağlıklı bir anne ile başlar. Gebelik ve lohusalık dönemi boyunca hem annenin hem de bebeğin sağlığını yakından takip etmek, olası riskleri önceden belirlemek ve sağlıklı bir doğum süreci geçirmenizi sağlamak temel amacımızdır.",
    detailSections: [
      {
        title: "Gebelik İzlemi ve Takipler",
        content: "Gebeliğin tespitinden doğuma kadar geçen süreçte tansiyon, kilo ölçümleri, bebek kalp sesi dinlenmesi (ÇKS), gerekli kan ve idrar tahlillerinin yapılması, tetanoz aşısı planlaması ve beslenme danışmanlığı gibi konularda düzenli olarak yanınızdayız. Sağlık Bakanlığı protokollerine uygun olarak belirlenen haftalarda (en az 4 kez) izlemleriniz titizlikle yapılır."
      },
      {
        title: "Lohusa ve Bebek Bakımı Danışmanlığı",
        content: "Doğum sonrasında (ilk 6 hafta içinde) anne sağlığının değerlendirilmesi, emzirme danışmanlığı, bebek bakımı, aile planlaması yöntemleri gibi konularda size tıbbi ve psikolojik destek sağlıyoruz."
      },
      {
        title: "Önemli Hatırlatma",
        content: "Gebelik testiniz pozitif çıktığı andan itibaren en kısa sürede aile hekimliğimize başvurarak kaydınızı yaptırmanız büyük önem taşımaktadır. Böylece izlem takvimiz hemen planlanabilir."
      }
    ],
    contactNote: "Gebelik kaydınızı yaptırmak veya izlem tarihlerinizle ilgili bilgi almak için merkezimizi arayabilir veya bizzat başvurabilirsiniz."
  },
  {
    title: "Bebek ve Çocuk İzlemi",
    slug: "bebek-cocuk-izlem",
    description: "Doğumdan itibaren çocukluk dönemi boyunca büyüme, fiziksel ve zihinsel gelişim takiplerinin uzman sağlık personellerimizce yapılması.",
    icon: Baby,
    detailIntro: "Çocuklarımızın sağlıklı büyümesi ve gelişmesi için düzenli sağlık kontrolleri vazgeçilmezdir. Bebek ve çocuk izlemleri ile olası gelişim geriliklerini veya sağlık sorunlarını erken dönemde tespit ederek gerekli müdahalelerin zamanında yapılmasını sağlıyoruz.",
    detailSections: [
      {
        title: "Kapsamlı Gelişim Takibi",
        content: "Bebeğinizin doğumundan itibaren boy, kilo ve baş çevresi ölçümleri düzenli olarak yapılır ve persentil eğrileri üzerinde değerlendirilir. Motor becerileri, görme ve işitme durumları, nöromotor gelişimi ayına ve yaşına uygunluğu açısından kontrol edilir."
      },
      {
        title: "Beslenme ve Anne Sütü Danışmanlığı",
        content: "İlk 6 ay sadece anne sütü ile beslenme, sonrasında uygun ek gıdalara geçiş süreçleri hakkında annelere detaylı bilgilendirme ve destek sağlıyoruz. D vitamini ve demir damlası takviyelerinin planlamasını yapıyoruz."
      },
      {
        title: "Randevu ve Ziyaret",
        content: "İzlemler, belirli aylara denk gelecek şekilde planlanır. İzleme gelirken bebeğinizin tok ve huzurlu olması ölçümlerin daha rahat yapılmasını sağlar. Lütfen bebek/çocuk sağlık izlem kartınızı yanınızda bulundurunuz."
      }
    ],
    contactNote: "Çocuğunuzun gelişimiyle ilgili aklınıza takılan sorular veya bir sonraki izlem tarihi için bize her zaman ulaşabilirsiniz."
  },
  {
    title: "Kronik Hastalık Takibi",
    slug: "kronik-hastalik-takibi",
    description: "Hipertansiyon, diyabet, astım, KOAH, obezite ve kalp hastalıkları gibi kronik rahatsızlıkların sürekli, düzenli tahlil ve takibi.",
    icon: ClipboardCheck,
    detailIntro: "Kronik hastalıklar, düzenli doktor kontrolü ve yaşam tarzı değişiklikleri ile başarıyla yönetilebilir. Hastalarımızın yaşam kalitesini artırmak, hastalık komplikasyonlarını önlemek ve ilaç tedavilerini düzenlemek amacıyla kapsamlı bir takip programı yürütüyoruz.",
    detailSections: [
      {
        title: "Periyodik Kontroller ve Tahliller",
        content: "Hipertansiyon, diyabet (şeker hastalığı), kalp-damar hastalıkları gibi kronik rahatsızlığı olan hastalarımızın düzenli olarak tansiyon, kan şekeri, kolesterol ve diğer gerekli kan/idrar tahlilleri merkezimizde yapılmaktadır."
      },
      {
        title: "Tedavi Uyumu ve Yaşam Tarzı Danışmanlığı",
        content: "Kullandığınız ilaçların dozu, kullanım şekli, olası yan etkileri hakkında sizi bilgilendiriyor, sağlıklı beslenme, fiziksel aktivite, sigara bırakma gibi konularda danışmanlık hizmeti sunarak tedavinize destek oluyoruz."
      },
      {
        title: "Rutin Ziyaretlerin Önemi",
        content: "Şikayetiniz olmasa dahi kronik hastalıkların doğası gereği sessiz ilerleyebileceğini unutmayın. Bu nedenle hekiminizin belirlediği periyotlarda (örneğin 3 veya 6 ayda bir) mutlaka kontrol randevunuza gelmeniz gerekmektedir."
      }
    ],
    contactNote: "Kronik raporlu ilaçlarınızı yazdırmak veya rutin kontrolleriniz için merkezimizden randevu alabilir veya doktorunuza danışabilirsiniz."
  },
  {
    title: "Muayene ve Genel Sağlık Danışmanlığı",
    slug: "muayene-danismanlik",
    description: "Akut hastalıkların teşhis ve tedavisi, genel sağlık şikayetlerinin değerlendirilmesi ve bireyselleştirilmiş koruyucu sağlık danışmanlığı.",
    icon: Stethoscope,
    detailIntro: "Sağlığınızla ilgili her türlü endişenizde ilk başvuracağınız nokta aile sağlığı merkezimizdir. Deneyimli hekim kadromuz ile her yaş grubundan hastaya kapsamlı, güvenilir ve hasta odaklı birinci basamak sağlık hizmeti sunuyoruz.",
    detailSections: [
      {
        title: "Poliklinik Hizmetleri",
        content: "Soğuk algınlığı, enfeksiyonlar, ağrı şikayetleri, mide-bağırsak sorunları, alerjik reaksiyonlar ve küçük yaralanmalar gibi genel poliklinik hizmetleri kapsamında muayene ve tedavi süreciniz özenle planlanır. Gerekli durumlarda laboratuvar tetkikleriniz merkezimizde yapılır."
      },
      {
        title: "İleri Merkezlere Yönlendirme (Sevk)",
        content: "Aile hekimliğimizde değerlendirilen ve uzmanlık veya ileri tetkik gerektiren durumlarda, durumunuza en uygun hastaneye ve uzman hekime doğru yönlendirmeniz yapılarak sağlık sürecinizin kesintisiz devamı sağlanır."
      },
      {
        title: "Koruyucu Hekimlik",
        content: "Sadece hastalandığınızda değil, hastalıklardan korunmak, kanser taramaları (meme, kolon, rahim ağzı) hakkında bilgi almak ve genel sağlık değerlendirmeniz için de merkezimize başvurabilirsiniz."
      }
    ],
    contactNote: "Mesai saatlerimiz içerisinde hekiminizden sıra numarası alarak muayene olabilir, acil olmayan durumlarda bilgi için merkezimizi arayabilirsiniz."
  },
  {
    title: "Sağlık Raporu İşlemleri",
    slug: "rapor-islemleri",
    description: "Sürücü belgesi, işe giriş, spor lisansı, evlilik raporu ve yivsiz av tüfeği gibi resmi kurumlarca talep edilen sağlık durum bildirim raporları.",
    icon: FileText,
    detailIntro: "Çeşitli resmi işlemleriniz için gereken sağlık raporları, ilgili mevzuatlar çerçevesinde gerekli fiziksel muayene ve testler sonucunda aile hekimliğimizce düzenlenmektedir. Rapor süreçlerinde hasta güvenliği ve mevzuata uygunluk esastır.",
    detailSections: [
      {
        title: "Düzenlenen Rapor Türleri",
        content: "Evlilik öncesi sağlık raporu (gerekli kan tahlilleri sonrasında), sürücü belgesi (ehliyet) ilk kayıt/yenileme sağlık raporu, amatör spor lisansı sağlık raporu, işe giriş sağlık raporu (çok tehlikeli/tehlikeli sınıflar hariç) ve kurumlarca talep edilen durum bildirir tek hekim raporları düzenlenmektedir."
      },
      {
        title: "Başvuru Süreci",
        content: "Ehliyet ve benzeri raporlar için e-Devlet üzerinden (e-Nabız / Kişisel Sağlık Bilgi Formu) başvurunuzu önceden oluşturmanız işlemleri hızlandıracaktır. Evlilik raporları için çiftlerin birlikte, kimlikleri ve vesikalık fotoğraflarıyla (bazı illerde) başvurması gereklidir."
      },
      {
        title: "Dikkat Edilmesi Gerekenler",
        content: "İşe giriş raporları 6331 sayılı İSG Kanunu gereği riskli sınıflarda OSGB/İşyeri hekimi tarafından verilmelidir. Ayrıca hekiminiz durumunuzu değerlendirdikten sonra, sizi uzman hekim onayı için hastaneye sevk etme hakkına sahiptir."
      }
    ],
    contactNote: "Almak istediğiniz rapor türüne göre hangi belgelere veya tahlillere ihtiyacınız olduğunu öğrenmek için başvuru öncesi bizimle iletişime geçmenizi rica ederiz."
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
