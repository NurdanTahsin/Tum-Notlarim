// ========== Type Aliases & Union/Intersection Örnekleri ==========

// 1. Type alias - basit kullanım
type ID = string | number;
type Kullanici = {
  ad: string;
  email: string;
};

let id1: ID = "ABC123";
let id2: ID = 456;

// 2. String literal types
type Durum = "beklemede" | "isleniyor" | "tamamlandi" | "iptal";

function siparisDurumunuGoster(durum: Durum): string {
  switch (durum) {
    case "beklemede":
      return "⏳ Sipariş beklemede";
    case "isleniyor":
      return "🔄 Sipariş işleniyor";
    case "tamamlandi":
      return "✅ Sipariş tamamlandı";
    case "iptal":
      return "❌ Sipariş iptal edildi";
  }
}

console.log(siparisDurumunuGoster("tamamlandi"));

// 3. Union types ile type guard
type Girdi = string | number | boolean;

function formatla(deger: Girdi): string {
  if (typeof deger === "string") {
    return deger.toUpperCase();
  } else if (typeof deger === "number") {
    return `Sayı: ${deger.toFixed(2)}`;
  } else {
    return deger ? "Evet" : "Hayır";
  }
}

console.log(formatla("merhaba")); // "MERHABA"
console.log(formatla(3.14159)); // "Sayı: 3.14"
console.log(formatla(true)); // "Evet"

// 4. Intersection types
type Kisi = {
  ad: string;
  soyad: string;
};

type Adres = {
  sehir: string;
  ulke: string;
};

type Iletisim = {
  email: string;
  telefon: string;
};

type TamProfil = Kisi & Adres & Iletisim;

const profil: TamProfil = {
  ad: "Zeynep",
  soyad: "Kaya",
  sehir: "İstanbul",
  ulke: "Türkiye",
  email: "zeynep@example.com",
  telefon: "555-9876",
};

// 5. Discriminated unions (Tagged unions)
type Sekil =
  | { tip: "daire"; yaricap: number }
  | { tip: "kare"; kenar: number }
  | { tip: "dikdortgen"; genislik: number; yukseklik: number };

function alanHesapla(sekil: Sekil): number {
  switch (sekil.tip) {
    case "daire":
      return Math.PI * sekil.yaricap ** 2;
    case "kare":
      return sekil.kenar ** 2;
    case "dikdortgen":
      return sekil.genislik * sekil.yukseklik;
  }
}

console.log(alanHesapla({ tip: "daire", yaricap: 5 }));
console.log(alanHesapla({ tip: "kare", kenar: 4 }));
console.log(alanHesapla({ tip: "dikdortgen", genislik: 5, yukseklik: 3 }));

// 6. API response pattern
type ApiYanit<T> =
  | { basarili: true; data: T }
  | { basarili: false; hata: string };

function veriCek(): ApiYanit<string[]> {
  const basarili = Math.random() > 0.5;

  if (basarili) {
    return {
      basarili: true,
      data: ["Elma", "Armut", "Muz"],
    };
  } else {
    return {
      basarili: false,
      hata: "Veri getirilemedi",
    };
  }
}

const sonuc = veriCek();

if (sonuc.basarili) {
  console.log("Veriler:", sonuc.data);
} else {
  console.log("Hata:", sonuc.hata);
}

// 7. Tuple type alias
type Koordinat = [number, number];
type RenkRGB = [number, number, number];

const konum: Koordinat = [41.0082, 28.9784]; // İstanbul
const kirmizi: RenkRGB = [255, 0, 0];

// 8. Complex type combinations
type OnayDurumu = "onaylandi" | "reddedildi" | "beklemede";
type OncelikSeviyesi = "düşük" | "orta" | "yüksek" | "acil";

type Gorev = {
  id: number;
  baslik: string;
  durum: OnayDurumu;
  oncelik: OncelikSeviyesi;
  olusturmaTarihi: Date;
  tamamlanmaTarihi?: Date;
};

const gorev: Gorev = {
  id: 1,
  baslik: "TypeScript dokümantasyonu yaz",
  durum: "beklemede",
  oncelik: "yüksek",
  olusturmaTarihi: new Date(),
};

console.log("Type Aliases örnekleri tamamlandı!");

export { };
