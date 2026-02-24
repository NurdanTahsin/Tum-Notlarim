// ========== Enums Örnekleri ==========

// 1. Numeric enum (sayısal)
enum Yön {
  Yukari,   // 0
  Asagi,    // 1
  Sol,      // 2
  Sag       // 3
}

function hareketEt(yon: Yön): string {
  switch (yon) {
    case Yön.Yukari:
      return "⬆️ Yukarı gidiliyor";
    case Yön.Asagi:
      return "⬇️ Aşağı gidiliyor";
    case Yön.Sol:
      return "⬅️ Sola gidiliyor";
    case Yön.Sag:
      return "➡️ Sağa gidiliyor";
  }
}

console.log(hareketEt(Yön.Yukari));
console.log(Yön.Sol); // 2

// 2. String enum
enum SiparisDurumu {
  Beklemede = "PENDING",
  Onaylandi = "APPROVED",
  Hazirlaniyor = "PREPARING",
  Yolda = "SHIPPING",
  TeslimEdildi = "DELIVERED",
  Iptal = "CANCELLED"
}

function durumMesaji(durum: SiparisDurumu): string {
  switch (durum) {
    case SiparisDurumu.Beklemede:
      return "⏳ Siparişiniz onay bekliyor";
    case SiparisDurumu.Hazirlaniyor:
      return "📦 Siparişiniz hazırlanıyor";
    case SiparisDurumu.Yolda:
      return "🚚 Siparişiniz yolda";
    case SiparisDurumu.TeslimEdildi:
      return "✅ Sipariş teslim edildi";
    case SiparisDurumu.Iptal:
      return "❌ Sipariş iptal edildi";
    default:
      return "Bilinmeyen durum";
  }
}

console.log(durumMesaji(SiparisDurumu.Yolda));

// 3. HTTP Status codes
enum HttpDurum {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500
}

function yanitIsle(durum: HttpDurum, data?: any): void {
  if (durum === HttpDurum.OK) {
    console.log("✅ Başarılı:", data);
  } else if (durum === HttpDurum.NotFound) {
    console.log("❌ Kayıt bulunamadı");
  } else if (durum >= 500) {
    console.log("🔥 Sunucu hatası");
  }
}

yanitIsle(HttpDurum.OK, { id: 1, name: "Test" });
yanitIsle(HttpDurum.NotFound);

// 4. User roles
enum KullaniciRolu {
  Admin = "ADMIN",
  Moderator = "MODERATOR",
  User = "USER",
  Guest = "GUEST"
}

interface Kullanici {
  id: number;
  ad: string;
  rol: KullaniciRolu;
}

function yetkiKontrol(kullanici: Kullanici, islem: string): boolean {
  if (kullanici.rol === KullaniciRolu.Admin) {
    return true; // Admin her şeyi yapabilir
  }

  if (kullanici.rol === KullaniciRolu.Moderator) {
    return islem !== "kullanici-sil"; // Moderator kullanıcı silemez
  }

  return false; // User ve Guest yapamaz
}

const admin: Kullanici = { id: 1, ad: "Ahmet", rol: KullaniciRolu.Admin };
const user: Kullanici = { id: 2, ad: "Zeynep", rol: KullaniciRolu.User };

console.log(yetkiKontrol(admin, "kullanici-sil")); // true
console.log(yetkiKontrol(user, "kullanici-sil")); // false

// 5. Log levels
enum LogSeviye {
  Debug = "DEBUG",
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
  Critical = "CRITICAL"
}

function log(seviye: LogSeviye, mesaj: string): void {
  const simdi = new Date().toLocaleTimeString();
  console.log(`[${simdi}] [${seviye}] ${mesaj}`);
}

log(LogSeviye.Info, "Uygulama başlatıldı");
log(LogSeviye.Warning, "Düşük bellek uyarısı");
log(LogSeviye.Error, "Veritabanı bağlantı hatası");

// 6. Days of week
enum HaftaninGunleri {
  Pazartesi = 1,
  Sali = 2,
  Carsamba = 3,
  Persembe = 4,
  Cuma = 5,
  Cumartesi = 6,
  Pazar = 7
}

function haftaSonuMu(gun: HaftaninGunleri): boolean {
  return gun === HaftaninGunleri.Cumartesi || gun === HaftaninGunleri.Pazar;
}

console.log(haftaSonuMu(HaftaninGunleri.Cuma)); // false
console.log(haftaSonuMu(HaftaninGunleri.Pazar)); // true

// 7. Payment methods
enum OdemeTipi {
  KrediKarti = "CREDIT_CARD",
  BankaTransferi = "BANK_TRANSFER",
  Nakit = "CASH",
  Havale = "WIRE_TRANSFER"
}

interface Odeme {
  tutar: number;
  tip: OdemeTipi;
  tarih: Date;
}

function odemeYap(odeme: Odeme): string {
  switch (odeme.tip) {
    case OdemeTipi.KrediKarti:
      return `💳 Kredi kartı ile ${odeme.tutar} TL ödendi`;
    case OdemeTipi.Nakit:
      return `💵 Nakit olarak ${odeme.tutar} TL ödendi`;
    case OdemeTipi.BankaTransferi:
      return `🏦 Banka transferi ile ${odeme.tutar} TL ödendi`;
    default:
      return "Ödeme yapıldı";
  }
}

const odeme: Odeme = {
  tutar: 500,
  tip: OdemeTipi.KrediKarti,
  tarih: new Date()
};

console.log(odemeYap(odeme));

// 8. Reverse mapping (sadece numeric enum'larda)
enum Durum {
  Aktif = 1,
  Pasif = 2,
  Beklemede = 3
}

console.log(Durum.Aktif);    // 1
console.log(Durum[1]);       // "Aktif"
console.log(Durum[2]);       // "Pasif"

// Tüm enum değerlerini listele
function enumDegerleri(enumObj: any): void {
  for (const key in enumObj) {
    if (isNaN(Number(key))) {
      console.log(`${key} = ${enumObj[key]}`);
    }
  }
}

enumDegerleri(Durum);

// 9. Const enum (compile time optimization)
const enum Renk {
  Kirmizi,
  Mavi,
  Yesil
}

let seciliRenk = Renk.Mavi;
// Compile sonrası: let seciliRenk = 1;

// 10. Enum ile configuration
enum Ortam {
  Gelistirme = "development",
  Test = "test",
  Produksiyon = "production"
}

const config = {
  [Ortam.Gelistirme]: {
    apiUrl: "http://localhost:3000",
    debug: true
  },
  [Ortam.Test]: {
    apiUrl: "https://test-api.example.com",
    debug: true
  },
  [Ortam.Produksiyon]: {
    apiUrl: "https://api.example.com",
    debug: false
  }
};

const aktifOrtam = Ortam.Gelistirme;
console.log("API URL:", config[aktifOrtam].apiUrl);

console.log("Enums örnekleri tamamlandı!");

export { };
