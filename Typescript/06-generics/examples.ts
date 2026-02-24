// ========== Generics Örnekleri ==========

// 1. Basit generic function
function kimlik<T>(deger: T): T {
  return deger;
}

console.log(kimlik<string>("merhaba")); // "merhaba"
console.log(kimlik<number>(42)); // 42
console.log(kimlik(true)); // tip inference - boolean

// 2. Array generic function
function sonEleman<T>(dizi: T[]): T | undefined {
  return dizi[dizi.length - 1];
}

console.log(sonEleman([1, 2, 3, 4, 5])); // 5
console.log(sonEleman(["a", "b", "c"])); // "c"

// 3. Generic ile array tersine çevirme
function tersineCevir<T>(dizi: T[]): T[] {
  return dizi.reverse();
}

const sayilar = tersineCevir([1, 2, 3, 4]); // number[]
const isimler = tersineCevir(["Ali", "Ayşe", "Mehmet"]); // string[]

console.log(sayilar);
console.log(isimler);

// 4. Multiple type parameters
function birlestir<T, U>(ilk: T, ikinci: U): [T, U] {
  return [ilk, ikinci];
}

const sonuc1 = birlestir("yaş", 25); // [string, number]
const sonuc2 = birlestir(true, "aktif"); // [boolean, string]

console.log(sonuc1);
console.log(sonuc2);

// 5. Generic interface
interface Kutu<T> {
  icerik: T;
  acikla(): string;
}

const stringKutu: Kutu<string> = {
  icerik: "Merhaba",
  acikla() {
    return `İçerik: ${this.icerik}`;
  },
};

const sayiKutusu: Kutu<number> = {
  icerik: 42,
  acikla() {
    return `Sayı: ${this.icerik}`;
  },
};

console.log(stringKutu.acikla());
console.log(sayiKutusu.acikla());

// 6. Generic class
class VeriSaklayici<T> {
  private veriler: T[] = [];

  ekle(veri: T): void {
    this.veriler.push(veri);
  }

  cıkar(): T | undefined {
    return this.veriler.pop();
  }

  hepsiniGetir(): T[] {
    return this.veriler;
  }

  uzunluk(): number {
    return this.veriler.length;
  }
}

const sayiSaklayici = new VeriSaklayici<number>();
sayiSaklayici.ekle(10);
sayiSaklayici.ekle(20);
sayiSaklayici.ekle(30);
console.log(sayiSaklayici.hepsiniGetir()); // [10, 20, 30]

const metinSaklayici = new VeriSaklayici<string>();
metinSaklayici.ekle("TypeScript");
metinSaklayici.ekle("JavaScript");
console.log(metinSaklayici.hepsiniGetir()); // ["TypeScript", "JavaScript"]

// 7. Generic constraints
interface UzunlukVar {
  length: number;
}

function enUzunOlan<T extends UzunlukVar>(a: T, b: T): T {
  return a.length > b.length ? a : b;
}

console.log(enUzunOlan("kısa", "çok uzun metin")); // "çok uzun metin"
console.log(enUzunOlan([1, 2], [1, 2, 3, 4])); // [1, 2, 3, 4]

// 8. keyof constraint
function getOzellik<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const kullanici = {
  ad: "Zeynep",
  yas: 28,
  email: "zeynep@example.com",
};

console.log(getOzellik(kullanici, "ad")); // "Zeynep"
console.log(getOzellik(kullanici, "yas")); // 28
// getOzellik(kullanici, "telefon"); // Hata! böyle bir key yok

// 9. Generic API response pattern
interface ApiYanit<T> {
  basarili: boolean;
  data: T;
  mesaj: string;
}

interface Urun {
  id: number;
  ad: string;
  fiyat: number;
}

function veriGetir<T>(url: string): Promise<ApiYanit<T>> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        basarili: true,
        data: {} as T,
        mesaj: "Başarılı",
      });
    }, 1000);
  });
}

// Kullanım
async function urunleriGetir() {
  const yanit = await veriGetir<Urun[]>("api/urunler");
  if (yanit.basarili) {
    console.log(yanit.data); // Urun[]
  }
}

// 10. Array methods ile generics
const sayiDizisi = [1, 2, 3, 4, 5];

function filtrele<T>(dizi: T[], kosul: (item: T) => boolean): T[] {
  const sonuc: T[] = [];
  for (const item of dizi) {
    if (kosul(item)) {
      sonuc.push(item);
    }
  }
  return sonuc;
}

const ciftSayilar = filtrele(sayiDizisi, (sayi) => sayi % 2 === 0);
console.log(ciftSayilar); // [2, 4]

const uzunIsimler = filtrele(["Ali", "Mehmet", "Su", "Ayşe"], (isim) => isim.length > 3);
console.log(uzunIsimler); // ["Mehmet", "Ayşe"]

// 11. Generic utility function
function arrayiObjeyeCevir<T extends { id: string | number }>(
  dizi: T[]
): Record<string | number, T> {
  const obj: Record<string | number, T> = {};
  dizi.forEach((item) => {
    obj[item.id] = item;
  });
  return obj;
}

const urunler = [
  { id: 1, ad: "Laptop", fiyat: 15000 },
  { id: 2, ad: "Mouse", fiyat: 200 },
  { id: 3, ad: "Klavye", fiyat: 500 },
];

const urunMap = arrayiObjeyeCevir(urunler);
console.log(urunMap[1]); // { id: 1, ad: "Laptop", fiyat: 15000 }

console.log("Generics örnekleri tamamlandı!");

export { };
