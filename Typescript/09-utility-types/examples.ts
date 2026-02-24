// ========== Utility Types Örnekleri ==========

interface Kullanici {
  id: number;
  ad: string;
  email: string;
  sifre: string;
  yas: number;
  adres?: string;
}

// 1. Partial<T> - Tüm property'leri optional yapar
type PartialKullanici = Partial<Kullanici>;

function kullaniciGuncelle(id: number, guncel: Partial<Kullanici>): void {
  console.log(`Kullanıcı ${id} güncelleniyor:`, guncel);
  // Sadece verilen alanları güncelle
}

kullaniciGuncelle(1, { ad: "Yeni Ad" }); // Sadece ad güncellensin
kullaniciGuncelle(2, { email: "yeni@email.com", yas: 26 }); // Birden fazla alan

// 2. Required<T> - Tüm property'leri zorunlu yapar
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

type TamConfig = Required<Config>;

const gelistirmeConfig: TamConfig = {
  host: "localhost",
  port: 3000,
  debug: true // hepsi zorunlu
};

// 3. Readonly<T> - Tüm property'leri readonly yapar
type ReadonlyKullanici = Readonly<Kullanici>;

const kullanici: ReadonlyKullanici = {
  id: 1,
  ad: "Ahmet",
  email: "ahmet@test.com",
  sifre: "secret123",
  yas: 25
};

// kullanici.ad = "Yeni Ad"; // Hata! readonly

// 4. Record<K, T> - Key-value pair tipi oluşturur
type Rol = "admin" | "user" | "guest";
type Yetkiler = Record<Rol, string[]>;

const yetkiler: Yetkiler = {
  admin: ["okuma", "yazma", "silme", "guncelleme"],
  user: ["okuma", "yazma"],
  guest: ["okuma"]
};

console.log("Admin yetkileri:", yetkiler.admin);

// Sayfa görüntüleme sayacı
type SayfaGoruntulenme = Record<string, number>;

const goruntulenme: SayfaGoruntulenme = {
  anasayfa: 1500,
  hakkimizda: 320,
  iletisim: 180,
  urunler: 850
};

// 5. Pick<T, K> - Belirli property'leri seçer
type KullaniciOnizleme = Pick<Kullanici, "id" | "ad" | "email">;

const onizleme: KullaniciOnizleme = {
  id: 1,
  ad: "Zeynep",
  email: "zeynep@test.com"
  // sifre ve yas yok (güvenlik için)
};

// 6. Omit<T, K> - Belirli property'leri çıkarır
type KullaniciSifresiz = Omit<Kullanici, "sifre">;

function kullaniciBilgisiGoster(kullanici: KullaniciSifresiz): void {
  console.log("Kullanıcı:", kullanici);
  // sifre property'si yok, güvenli
}

kullaniciBilgisiGoster({
  id: 1,
  ad: "Mehmet",
  email: "mehmet@test.com",
  yas: 30
});

// 7. Exclude<T, U> - Union'dan tip çıkarır
type Durum = "beklemede" | "onaylandi" | "reddedildi" | "iptal";

type AktifDurum = Exclude<Durum, "iptal" | "reddedildi">;
// "beklemede" | "onaylandi"

const siparisDurumu: AktifDurum = "onaylandi";
// const hataliDurum: AktifDurum = "iptal"; // Hata!

// 8. Extract<T, U> - Union'dan sadece belirli tipleri alır
type Degerler = string | number | boolean | null;

type SadeceMetin = Extract<Degerler, string>;
// string

type SayisalDeger = Extract<Degerler, string | number>;
// string | number

// 9. NonNullable<T> - null ve undefined çıkarır
type BelkiString = string | null | undefined;

type KesinString = NonNullable<BelkiString>;
// string

function yazdir(metin: NonNullable<string | null>): void {
  console.log(metin.toUpperCase()); // kesinlikle string
}

// 10. ReturnType<T> - Fonksiyonun return tipini alır
function kullaniciOlustur() {
  return {
    id: Math.random(),
    ad: "Yeni Kullanıcı",
    olusturulmaTarihi: new Date()
  };
}

type KullaniciTipi = ReturnType<typeof kullaniciOlustur>;
// { id: number; ad: string; olusturulmaTarihi: Date; }

const yeniKullanici: KullaniciTipi = {
  id: 123,
  ad: "Ali",
  olusturulmaTarihi: new Date()
};

// 11. Parameters<T> - Fonksiyonun parametre tiplerini alır
function kayitOlustur(ad: string, email: string, yas: number) {
  return { ad, email, yas };
}

type KayitParametreleri = Parameters<typeof kayitOlustur>;
// [ad: string, email: string, yas: number]

function kayitYap(...args: KayitParametreleri): void {
  const [ad, email, yas] = args;
  console.log(`Kayıt: ${ad}, ${email}, ${yas} yaş`);
}

kayitYap("Ayşe", "ayse@test.com", 28);

// 12. Awaited<T> - Promise'den değer tipini çıkarır
type PromiseDeger = Promise<{ veri: string; durum: number }>;

type CozulenDeger = Awaited<PromiseDeger>;
// { veri: string; durum: number; }

async function veriCek(): Promise<CozulenDeger> {
  return { veri: "Başarılı", durum: 200 };
}

// 13. Kombine kullanım - Gerçek dünya örneği
interface ApiYanit<T> {
  data: T;
  durum: number;
  mesaj: string;
  zaman: Date;
}

interface Urun {
  id: number;
  ad: string;
  fiyat: number;
  stok: number;
  kategori: string;
  aciklama: string;
}

// API'den dönen ürün verisi - sadece gerekli alanlar
type UrunOnizleme = Pick<Urun, "id" | "ad" | "fiyat">;

// API yanıt tipi
type UrunListesiYanit = ApiYanit<UrunOnizleme[]>;

const apiYaniti: UrunListesiYanit = {
  data: [
    { id: 1, ad: "Laptop", fiyat: 15000 },
    { id: 2, ad: "Mouse", fiyat: 200 }
  ],
  durum: 200,
  mesaj: "Başarılı",
  zaman: new Date()
};

// Ürün güncelleme - sadece bazı alanlar
type UrunGuncelleme = Partial<Omit<Urun, "id">>;

function urunGuncelle(id: number, guncel: UrunGuncelleme): void {
  console.log(`Ürün ${id} güncelleniyor:`, guncel);
}

urunGuncelle(1, { fiyat: 14000 });
urunGuncelle(2, { ad: "Gaming Mouse", fiyat: 350 });

// 14. Enum value type
enum RolTipleri {
  Admin = "ADMIN",
  Kullanici = "USER",
  Misafir = "GUEST"
}

type RolDegerleri = `${RolTipleri}`; // union of enum values
// "ADMIN" | "USER" | "GUEST"

// 15. Conditional type ile utility type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<"merhaba">; // true
type Test2 = IsString<42>; // false

// Array elemanlarının tipini çıkar
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = ArrayElement<string[]>; // string
type NumberArray = ArrayElement<number[]>; // number

console.log("Utility Types örnekleri tamamlandı!");

export { };
