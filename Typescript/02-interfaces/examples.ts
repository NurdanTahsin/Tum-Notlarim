// ========== Interface Örnekleri ==========

// 1. Basit interface kullanımı
interface Kullanici {
  id: number;
  kullaniciAdi: string;
  email: string;
  aktif: boolean;
}

const kullanici1: Kullanici = {
  id: 1,
  kullaniciAdi: "zeynep42",
  email: "zeynep@example.com",
  aktif: true,
};

// 2. Optional properties
interface Profil {
  ad: string;
  soyad: string;
  telefon?: string; // optional
  adres?: string; // optional
}

const profil: Profil = {
  ad: "Ahmet",
  soyad: "Kaya",
  // telefon ve adres olmasa da sorun yok
};

// 3. Readonly property
interface Kitap {
  readonly isbn: string;
  baslik: string;
  yazar: string;
  fiyat: number;
}

const kitap: Kitap = {
  isbn: "978-1234567890",
  baslik: "TypeScript Rehberi",
  yazar: "Ali Yılmaz",
  fiyat: 150,
};

// kitap.isbn = "yeni-isbn"; // Hata! readonly

// 4. Interface extending
interface Personel {
  ad: string;
  soyad: string;
  iseGirisTarihi: Date;
}

interface Mudur extends Personel {
  departman: string;
  yetki: string[];
}

const mudur: Mudur = {
  ad: "Mehmet",
  soyad: "Öz",
  iseGirisTarihi: new Date("2020-01-15"),
  departman: "Yazılım",
  yetki: ["kullanıcı-ekle", "proje-yönet"],
};

// 5. Function type interface
interface MatematikIslem {
  (x: number, y: number): number;
}

const topla: MatematikIslem = (a, b) => a + b;
const cikar: MatematikIslem = (a, b) => a - b;

console.log(topla(10, 5)); // 15
console.log(cikar(10, 5)); // 5

// 6. Array of interfaces
interface Gorev {
  id: number;
  baslik: string;
  tamamlandi: boolean;
}

const gorevler: Gorev[] = [
  { id: 1, baslik: "TypeScript öğren", tamamlandi: true },
  { id: 2, baslik: "Proje yap", tamamlandi: false },
  { id: 3, baslik: "GitHub'a push", tamamlandi: false },
];

// 7. Method içeren interface
interface Hesap {
  sahibi: string;
  bakiye: number;
  paraYatir(miktar: number): void;
  paraCek(miktar: number): void;
}

const bankaHesabi: Hesap = {
  sahibi: "Ayşe Demir",
  bakiye: 5000,
  paraYatir(miktar: number) {
    this.bakiye += miktar;
    console.log(`${miktar} TL yatırıldı. Yeni bakiye: ${this.bakiye}`);
  },
  paraCek(miktar: number) {
    if (this.bakiye >= miktar) {
      this.bakiye -= miktar;
      console.log(`${miktar} TL çekildi. Yeni bakiye: ${this.bakiye}`);
    } else {
      console.log("Yetersiz bakiye!");
    }
  },
};

bankaHesabi.paraYatir(1000);
bankaHesabi.paraCek(2000);

// 8. Index signature
interface Notlar {
  [ders: string]: number; // herhangi bir string key, number value
}

const ogrenciNotlari: Notlar = {
  matematik: 90,
  fizik: 85,
  kimya: 88,
  biyoloji: 92,
};

console.log("Interface örnekleri tamamlandı!");

export { };
