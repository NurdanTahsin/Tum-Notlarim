// ========== Functions Örnekleri ==========

// 1. Basit function type annotations
function topla(a: number, b: number): number {
  return a + b;
}

function selamla(ad: string): void {
  console.log(`Merhaba, ${ad}!`);
}

console.log(topla(5, 3)); // 8
selamla("Zeynep");

// 2. Optional parameters
function tamAd(ad: string, soyad?: string): string {
  if (soyad) {
    return `${ad} ${soyad}`;
  }
  return ad;
}

console.log(tamAd("Ahmet")); // "Ahmet"
console.log(tamAd("Ahmet", "Kaya")); // "Ahmet Kaya"

// 3. Default parameters
function indirimHesapla(fiyat: number, indirimOrani: number = 10): number {
  return fiyat - (fiyat * indirimOrani) / 100;
}

console.log(indirimHesapla(1000)); // 900 (10% indirim)
console.log(indirimHesapla(1000, 25)); // 750 (25% indirim)

// 4. Rest parameters
function enBuyuk(...sayilar: number[]): number {
  return Math.max(...sayilar);
}

console.log(enBuyuk(5, 2, 8, 1, 9, 3)); // 9

// 5. Function type
type IslemFonksiyonu = (x: number, y: number) => number;

const carp: IslemFonksiyonu = (a, b) => a * b;
const bol: IslemFonksiyonu = (a, b) => a / b;

function hesapla(sayi1: number, sayi2: number, islem: IslemFonksiyonu): number {
  return islem(sayi1, sayi2);
}

console.log(hesapla(10, 2, carp)); // 20
console.log(hesapla(10, 2, bol)); // 5

// 6. Array methods ile typed functions
const sayilar: number[] = [1, 2, 3, 4, 5];

const kareler = sayilar.map((sayi: number): number => sayi ** 2);
const ciftler = sayilar.filter((sayi: number): boolean => sayi % 2 === 0);
const toplam = sayilar.reduce((acc: number, sayi: number): number => acc + sayi, 0);

console.log(kareler); // [1, 4, 9, 16, 25]
console.log(ciftler); // [2, 4]
console.log(toplam); // 15

// 7. Object döndüren function
interface Kullanici {
  id: number;
  ad: string;
  email: string;
}

function kullaniciOlustur(id: number, ad: string, email: string): Kullanici {
  return { id, ad, email };
}

const yeniKullanici = kullaniciOlustur(1, "Mehmet", "mehmet@example.com");
console.log(yeniKullanici);

// 8. Generic function
function diziyiTersCevir<T>(dizi: T[]): T[] {
  return dizi.reverse();
}

const sayiDizisi = diziyiTersCevir([1, 2, 3, 4, 5]);
const stringDizisi = diziyiTersCevir(["a", "b", "c"]);

console.log(sayiDizisi); // [5, 4, 3, 2, 1]
console.log(stringDizisi); // ["c", "b", "a"]

// 9. Type predicate (type guard function)
function isNumber(deger: unknown): deger is number {
  return typeof deger === "number";
}

function islemYap(deger: unknown): void {
  if (isNumber(deger)) {
    console.log(deger.toFixed(2)); // number olduğundan emin
  } else {
    console.log("Sayı değil!");
  }
}

islemYap(42.567); // "42.57"
islemYap("text"); // "Sayı değil!"

// 10. Callback pattern
function veriGetir(
  url: string,
  onSuccess: (data: string) => void,
  onError?: (error: string) => void
): void {
  // Simulated async operation
  const basarili = Math.random() > 0.3;

  setTimeout(() => {
    if (basarili) {
      onSuccess("Veriler başarıyla geldi!");
    } else {
      onError?.("Bir hata oluştu!");
    }
  }, 1000);
}

veriGetir(
  "https://api.example.com",
  (data) => console.log("Başarılı:", data),
  (error) => console.log("Hata:", error)
);

// 11. Function returning function
function carpanOlustur(carpan: number): (sayi: number) => number {
  return (sayi: number) => sayi * carpan;
}

const ikiIleCarp = carpanOlustur(2);
const ucIleCarp = carpanOlustur(3);

console.log(ikiIleCarp(5)); // 10
console.log(ucIleCarp(5)); // 15

console.log("Functions örnekleri tamamlandı!");

export { };
