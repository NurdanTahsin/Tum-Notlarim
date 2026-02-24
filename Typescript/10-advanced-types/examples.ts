// ========== Advanced Types Örnekleri ==========

// 1. Conditional Types
type IsArray<T> = T extends any[] ? "evet" : "hayır";

type Test1 = IsArray<string[]>; // "evet"
type Test2 = IsArray<number>; // "hayır"

type TipAdi<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends Function
  ? "function"
  : "object";

type Tip1 = TipAdi<"merhaba">; // "string"
type Tip2 = TipAdi<42>; // "number"
type Tip3 = TipAdi<true>; // "boolean"

// 2. Infer keyword - tip çıkarımı
type DiziElemani<T> = T extends (infer U)[] ? U : never;

type StringDiziElemani = DiziElemani<string[]>; // string
type SayiDiziElemani = DiziElemani<number[]>; // number

// Fonksiyon return tipini çıkar
type DonusDegeri<T> = T extends (...args: any[]) => infer R ? R : never;

function kullaniciGetir(): { id: number; ad: string } {
  return { id: 1, ad: "Ahmet" };
}

type KullaniciTipi = DonusDegeri<typeof kullaniciGetir>;
// { id: number; ad: string; }

// Promise'den değer çıkar
type Ac<T> = T extends Promise<infer U> ? U : T;

type PromiseDegeri = Ac<Promise<string>>; // string
type NormalDeger = Ac<number>; // number

// 3. Mapped Types
type Opsiyonel<T> = {
  [K in keyof T]?: T[K];
};

type SadeceOkunur<T> = {
  readonly [K in keyof T]: T[K];
};

interface Kullanici {
  id: number;
  ad: string;
  email: string;
}

type OpsiyonelKullanici = Opsiyonel<Kullanici>;
// { id?: number; ad?: string; email?: string; }

type ReadonlyKullanici = SadeceOkunur<Kullanici>;
// { readonly id: number; readonly ad: string; readonly email: string; }

// Property tiplerini değiştirme
type StringleriSayiyaCevir<T> = {
  [K in keyof T]: T[K] extends string ? number : T[K];
};

interface Profil {
  ad: string;
  yas: number;
  email: string;
}

type ProfilSayisal = StringleriSayiyaCevir<Profil>;
// { ad: number; yas: number; email: number; }

// 4. Template Literal Types
type Selamlama = "Merhaba" | "Selam" | "Hey";
type Isim = "Ahmet" | "Zeynep";

type SelamlamaMesaji = `${Selamlama} ${Isim}`;
// "Merhaba Ahmet" | "Merhaba Zeynep" | "Selam Ahmet" | ...

// Event handler isimleri oluşturma
type Olaylar = "click" | "focus" | "blur" | "submit";
type OlayYoneticileri = `on${Capitalize<Olaylar>}`;
// "onClick" | "onFocus" | "onBlur" | "onSubmit"

// API endpoint'leri
type HttpMetod = "get" | "post" | "put" | "delete";
type Kaynak = "users" | "products" | "orders";
type ApiYol = `/${Kaynak}/${HttpMetod}`;

// 5. Built-in String Manipulation Types
type Buyuk = Uppercase<"merhaba">; // "MERHABA"
type Kucuk = Lowercase<"MERHABA">; // "merhaba"
type IlkBuyuk = Capitalize<"merhaba">; // "Merhaba"
type IlkKucuk = Uncapitalize<"MERHABA">; // "mERHABA"

// Aksiyon fonksiyonları
type Aksiyon = "create" | "update" | "delete" | "read";
type AksiyonFonksiyonu = `${Aksiyon}User`;
// "createUser" | "updateUser" | "deleteUser" | "readUser"

type SabitIsim = Uppercase<AksiyonFonksiyonu>;
// "CREATEUSER" | "UPDATEUSER" | ...

// 6. Index Signatures
interface Sozluk {
  [anahtar: string]: string | number;
  varsayilan: string; // string olmalı
  sayac: number; // number olmalı
}

const renkler: Sozluk = {
  varsayilan: "mavi",
  sayac: 10,
  kirmizi: "red",
  yesil: "green",
  mavi: "blue"
};

// 7. Recursive Types - JSON değerleri
type JsonDeger =
  | string
  | number
  | boolean
  | null
  | JsonDeger[]
  | { [key: string]: JsonDeger };

const veri: JsonDeger = {
  kullanici: {
    ad: "Ahmet",
    yas: 25,
    aktif: true,
    etiketler: ["developer", "typescript"],
    adres: {
      sehir: "İstanbul",
      postaKodu: null
    }
  },
  toplam: 100
};

// Tree yapısı
interface AgacDugumu<T> {
  deger: T;
  cocuklar?: AgacDugumu<T>[];
}

const klasorYapisi: AgacDugumu<string> = {
  deger: "root",
  cocuklar: [
    {
      deger: "src",
      cocuklar: [
        { deger: "components" },
        { deger: "utils" }
      ]
    },
    { deger: "public" },
    { deger: "tests" }
  ]
};

// 8. Branded Types (Nominal typing simülasyonu)
type Marka<K, T> = K & { __marka: T };

type KullaniciId = Marka<string, "KullaniciId">;
type UrunId = Marka<string, "UrunId">;

function kullaniciGetir(id: KullaniciId): void {
  console.log("Kullanıcı getiriliyor:", id);
}

const kullaniciId = "USER_123" as KullaniciId;
const urunId = "PROD_456" as UrunId;

kullaniciGetir(kullaniciId); // OK
// kullaniciGetir(urunId); // Hata! farklı tip

// Email tipi
type Email = Marka<string, "Email">;

function emailGonder(kime: Email, konu: string): void {
  console.log(`Email gönderiliyor: ${kime} - ${konu}`);
}

const email = "ahmet@example.com" as Email;
emailGonder(email, "Hoş geldiniz");

// 9. Distributive Conditional Types
type Diziye<T> = T extends any ? T[] : never;

type StringVeyaSayi = Diziye<string | number>;
// string[] | number[] (dağıtılmış)

// Non-distributive
type DiziyeDagitmasiz<T> = [T] extends [any] ? T[] : never;

type Birlestirilmis = DiziyeDagitmasiz<string | number>;
// (string | number)[]

// 10. Complex utility type - Deep Partial
type DerinOpsiyonel<T> = T extends object
  ? {
    [K in keyof T]?: DerinOpsiyonel<T[K]>;
  }
  : T;

interface SirketYapisi {
  ad: string;
  bilgi: {
    kurulusYili: number;
    calisanSayisi: number;
  };
  iletisim: {
    email: string;
    telefon: {
      ofis: string;
      mobil: string;
    };
  };
}

type OpsiyonelSirket = DerinOpsiyonel<SirketYapisi>;

const guncelleme: OpsiyonelSirket = {
  ad: "ABC Şirketi",
  iletisim: {
    telefon: {
      ofis: "555-1234"
      // mobil optional
    }
  }
  // diğer alanlar optional
};

// 11. Union'dan Intersection'a çevirme
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Birlesim = { a: string } | { b: number };
type Kesisim = UnionToIntersection<Birlesim>;
// { a: string } & { b: number }

// 12. Object key'lerini union'a çevirme
type ObjeAnahtarlari<T> = T extends object ? keyof T : never;

interface Urun {
  id: number;
  ad: string;
  fiyat: number;
  stok: number;
}

type UrunAlanlari = ObjeAnahtarlari<Urun>;
// "id" | "ad" | "fiyat" | "stok"

// 13. Type guards ile advanced pattern
function isDizi<T>(deger: T | T[]): deger is T[] {
  return Array.isArray(deger);
}

function isle<T>(deger: T | T[]): void {
  if (isDizi(deger)) {
    console.log("Dizi uzunluğu:", deger.length);
    deger.forEach(item => console.log(item));
  } else {
    console.log("Tek değer:", deger);
  }
}

isle([1, 2, 3]);
isle("tek değer");

// 14. Readonly Deep implementation
type DerinSadeceOkunur<T> = T extends (infer R)[]
  ? DerinSadeceOkunurArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DerinSadeceOkunurObject<T>
  : T;

interface DerinSadeceOkunurArray<T> extends ReadonlyArray<DerinSadeceOkunur<T>> { }

type DerinSadeceOkunurObject<T> = {
  readonly [K in keyof T]: DerinSadeceOkunur<T[K]>;
};

interface YapilandirilmisVeri {
  baslik: string;
  degerler: number[];
  meta: {
    yazar: string;
    tarih: Date;
  };
}

type DegismezVeri = DerinSadeceOkunur<YapilandirilmisVeri>;

console.log("Advanced Types örnekleri tamamlandı!");

export { };
