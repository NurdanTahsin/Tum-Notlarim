// ========== Type Guards & Assertions Örnekleri ==========

// 1. typeof type guard
function formatla(deger: string | number): string {
  if (typeof deger === "string") {
    return deger.toUpperCase();
  } else {
    return `Sayı: ${deger.toFixed(2)}`;
  }
}

console.log(formatla("merhaba")); // "MERHABA"
console.log(formatla(42.5678)); // "Sayı: 42.57"

// 2. instanceof type guard
class Kopek {
  constructor(public ad: string) { }
  havla(): void {
    console.log(`${this.ad}: Hav hav!`);
  }
}

class Kedi {
  constructor(public ad: string) { }
  miyavla(): void {
    console.log(`${this.ad}: Miyav!`);
  }
}

function hayvanSesi(hayvan: Kopek | Kedi): void {
  if (hayvan instanceof Kopek) {
    hayvan.havla();
  } else {
    hayvan.miyavla();
  }
}

const kopek = new Kopek("Karabaş");
const kedi = new Kedi("Pamuk");

hayvanSesi(kopek);
hayvanSesi(kedi);

// 3. 'in' operator type guard
interface Balik {
  yuz(): void;
  tur: "balik";
}

interface Kus {
  uc(): void;
  tur: "kus";
}

function hareketEt(hayvan: Balik | Kus): void {
  if ("yuz" in hayvan) {
    console.log("Balık yüzüyor...");
    hayvan.yuz();
  } else {
    console.log("Kuş uçuyor...");
    hayvan.uc();
  }
}

// 4. User-defined type guards (Type predicates)
function isNumber(deger: unknown): deger is number {
  return typeof deger === "number" && !isNaN(deger);
}

function isString(deger: unknown): deger is string {
  return typeof deger === "string";
}

function isle(deger: unknown): void {
  if (isNumber(deger)) {
    console.log(deger.toFixed(2)); // number olduğundan emin
  } else if (isString(deger)) {
    console.log(deger.toUpperCase()); // string olduğundan emin
  } else {
    console.log("Bilinmeyen tip");
  }
}

isle(42.567);
isle("typescript");
isle(true);

// 5. Array type guard
function isStringArray(deger: unknown): deger is string[] {
  return Array.isArray(deger) && deger.every(item => typeof item === "string");
}

function yazdir(deger: unknown): void {
  if (isStringArray(deger)) {
    deger.forEach(item => console.log(item.toUpperCase()));
  } else {
    console.log("String array değil");
  }
}

yazdir(["elma", "armut", "muz"]);
yazdir([1, 2, 3]);

// 6. Discriminated unions (Tagged unions)
interface Basarili {
  durum: "success";
  data: string[];
}

interface Yukleniyor {
  durum: "loading";
  ilerleme: number;
}

interface Hata {
  durum: "error";
  mesaj: string;
}

type ApiDurum = Basarili | Yukleniyor | Hata;

function durumGoster(durum: ApiDurum): void {
  switch (durum.durum) {
    case "success":
      console.log("✅ Başarılı:", durum.data);
      break;
    case "loading":
      console.log(`⏳ Yükleniyor... %${durum.ilerleme}`);
      break;
    case "error":
      console.log("❌ Hata:", durum.mesaj);
      break;
  }
}

durumGoster({ durum: "success", data: ["veri1", "veri2"] });
durumGoster({ durum: "loading", ilerleme: 75 });
durumGoster({ durum: "error", mesaj: "Bağlantı hatası" });

// 7. Type assertion (as)
let deger: any = "Bu bir string değeri";
let uzunluk: number = (deger as string).length;

console.log("Uzunluk:", uzunluk);

// Object type assertion
interface Kullanici {
  id: number;
  ad: string;
  email: string;
}

const apiYaniti: any = {
  id: 1,
  ad: "Ahmet",
  email: "ahmet@example.com"
};

const kullanici = apiYaniti as Kullanici;
console.log(kullanici.ad.toUpperCase());

// 8. as const
const yonler = ["yukarı", "aşağı", "sol", "sağ"] as const;
// type: readonly ["yukarı", "aşağı", "sol", "sağ"]

const ayarlar = {
  tema: "dark",
  dil: "tr",
  notifikasyon: true
} as const;
// Tüm property'ler readonly

// ayarlar.tema = "light"; // Hata! readonly

// 9. Non-null assertion operator (!)
function bul(id: number): string | undefined {
  if (id > 0) {
    return `Kullanıcı-${id}`;
  }
  return undefined;
}

// Emin olduğumuz durumda ! kullanabiliriz
const kullaniciAdi = bul(5)!;
console.log(kullaniciAdi.toUpperCase()); // Hata vermez

// DOM ile kullanım
// const button = document.getElementById("submit")!;
// button.addEventListener("click", () => console.log("Tıklandı"));

// 10. Truthiness narrowing
function yazdir(metin: string | null | undefined): void {
  if (metin) {
    console.log(metin.toUpperCase()); // string olduğundan emin
  } else {
    console.log("Boş değer");
  }
}

yazdir("merhaba");
yazdir(null);
yazdir(undefined);

// 11. Equality narrowing
function karsilastir(x: string | number, y: string | boolean): void {
  if (x === y) {
    // Buraya geldiysek x ve y'nin ortak tipi sadece string olabilir
    console.log(x.toUpperCase());
    console.log(y.toUpperCase());
  }
}

karsilastir("test", "test");

// 12. Complex type guard örneği
interface Kare {
  tip: "kare";
  kenar: number;
}

interface Daire {
  tip: "daire";
  yaricap: number;
}

interface Dikdortgen {
  tip: "dikdortgen";
  genislik: number;
  yukseklik: number;
}

type Sekil = Kare | Daire | Dikdortgen;

function alanHesapla(sekil: Sekil): number {
  switch (sekil.tip) {
    case "kare":
      return sekil.kenar ** 2;
    case "daire":
      return Math.PI * sekil.yaricap ** 2;
    case "dikdortgen":
      return sekil.genislik * sekil.yukseklik;
  }
}

const kare: Kare = { tip: "kare", kenar: 5 };
const daire: Daire = { tip: "daire", yaricap: 3 };

console.log("Kare alanı:", alanHesapla(kare));
console.log("Daire alanı:", alanHesapla(daire).toFixed(2));

// 13. Custom error type guard
interface YetkiHatasi {
  kod: "AUTH";
  mesaj: string;
}

interface AgHatasi {
  kod: "NETWORK";
  mesaj: string;
  denemeNo: number;
}

type Hata = YetkiHatasi | AgHatasi;

function isAgHatasi(hata: Hata): hata is AgHatasi {
  return hata.kod === "NETWORK";
}

function hataIsle(hata: Hata): void {
  if (isAgHatasi(hata)) {
    console.log(`Ağ hatası (Deneme ${hata.denemeNo}): ${hata.mesaj}`);
  } else {
    console.log(`Yetki hatası: ${hata.mesaj}`);
  }
}

hataIsle({ kod: "NETWORK", mesaj: "Bağlantı hatası", denemeNo: 3 });
hataIsle({ kod: "AUTH", mesaj: "Giriş yapmanız gerekiyor" });

console.log("Type Guards & Assertions örnekleri tamamlandı!");

export { };
