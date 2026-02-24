// ========== Basic Types Örnekleri ==========

// 1. String, Number, Boolean
let kullaniciAdi: string = "zeynep_42";
let puan: number = 99.5;
let aktif: boolean = true;

// 2. Array tanımlamaları
let notlar: number[] = [85, 90, 78, 92];
let sehirler: Array<string> = ["İstanbul", "Ankara", "İzmir"];

// 3. Tuple örneği
let ogrenci: [string, number, boolean] = ["Ahmet", 20, true];
console.log(ogrenci[0]); // "Ahmet"
console.log(ogrenci[1]); // 20

// 4. Union type kullanımı
function formatla(deger: string | number): string {
  if (typeof deger === "string") {
    return deger.toUpperCase();
  }
  return `Sayı: ${deger}`;
}

console.log(formatla("merhaba")); // "MERHABA"
console.log(formatla(42)); // "Sayı: 42"

// 5. Literal types
type Yön = "yukarı" | "aşağı" | "sol" | "sağ";
let hareket: Yön = "yukarı"; // OK
// let yanlis: Yön = "çapraz"; // Hata!

// 6. Type alias örneği
type ID = string | number;
let kullaniciID: ID = "USER_123";
let urunID: ID = 456;

// 7. Object typing
let araba: { marka: string; model: string; yil: number } = {
  marka: "Toyota",
  model: "Corolla",
  yil: 2023,
};

// 8. Array of objects
interface Urun {
  ad: string;
  fiyat: number;
  stokta: boolean;
}

let urunler: Urun[] = [
  { ad: "Laptop", fiyat: 15000, stokta: true },
  { ad: "Mouse", fiyat: 200, stokta: false },
];

// 9. Optional chaining ile birlikte
interface Kullanici {
  ad: string;
  email?: string; // optional
}

let user: Kullanici = { ad: "Ali" };
console.log(user.email?.toLowerCase()); // undefined, hata vermez

// 10. Type assertion
let deger: any = "bu bir string";
let uzunluk: number = (deger as string).length;
// veya
let uzunluk2: number = (<string>deger).length;

console.log("Basic Types örnekleri tamamlandı!");

export { };
