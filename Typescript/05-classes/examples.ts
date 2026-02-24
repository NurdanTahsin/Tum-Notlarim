// ========== Classes Örnekleri ==========

// 1. Basit class tanımlama
class Araba {
  marka: string;
  model: string;
  yil: number;

  constructor(marka: string, model: string, yil: number) {
    this.marka = marka;
    this.model = model;
    this.yil = yil;
  }

  bilgiVer(): string {
    return `${this.yil} ${this.marka} ${this.model}`;
  }
}

const araba1 = new Araba("Toyota", "Corolla", 2023);
console.log(araba1.bilgiVer()); // "2023 Toyota Corolla"

// 2. Access modifiers (public, private, protected)
class BankaHesabi {
  public hesapSahibi: string;
  private bakiye: number;
  protected hesapNumarasi: string;

  constructor(hesapSahibi: string, hesapNumarasi: string, ilkBakiye: number) {
    this.hesapSahibi = hesapSahibi;
    this.hesapNumarasi = hesapNumarasi;
    this.bakiye = ilkBakiye;
  }

  public paraYatir(miktar: number): void {
    this.bakiye += miktar;
    console.log(`${miktar} TL yatırıldı. Yeni bakiye: ${this.bakiye} TL`);
  }

  public paraCek(miktar: number): void {
    if (this.bakiye >= miktar) {
      this.bakiye -= miktar;
      console.log(`${miktar} TL çekildi. Kalan bakiye: ${this.bakiye} TL`);
    } else {
      console.log("Yetersiz bakiye!");
    }
  }

  public bakiyeGoster(): number {
    return this.bakiye;
  }
}

const hesap = new BankaHesabi("Ahmet Yılmaz", "TR1234567890", 10000);
hesap.paraYatir(5000);
hesap.paraCek(3000);
console.log("Güncel bakiye:", hesap.bakiyeGoster());

// 3. Readonly property
class Kitap {
  readonly isbn: string;
  baslik: string;
  yazar: string;

  constructor(isbn: string, baslik: string, yazar: string) {
    this.isbn = isbn;
    this.baslik = baslik;
    this.yazar = yazar;
  }
}

const kitap = new Kitap("978-1234567890", "TypeScript Rehberi", "Ali Kaya");
// kitap.isbn = "yeni-isbn"; // Hata! readonly

// 4. Getters ve Setters
class Sicaklik {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(deger: number) {
    if (deger < -273.15) {
      throw new Error("Mutlak sıfırın altında olamaz!");
    }
    this._celsius = deger;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(deger: number) {
    this.celsius = ((deger - 32) * 5) / 9;
  }
}

const sicaklik = new Sicaklik();
sicaklik.celsius = 25;
console.log(`${sicaklik.celsius}°C = ${sicaklik.fahrenheit}°F`);

// 5. Inheritance (Kalıtım)
class Hayvan {
  constructor(public ad: string) { }

  sesCikar(): void {
    console.log("Hayvan ses çıkarıyor...");
  }

  hareketEt(): void {
    console.log(`${this.ad} hareket ediyor...`);
  }
}

class Kopek extends Hayvan {
  sesCikar(): void {
    console.log("Hav hav!");
  }

  getir(): void {
    console.log(`${this.ad} topu getiriyor...`);
  }
}

class Kus extends Hayvan {
  sesCikar(): void {
    console.log("Cik cik!");
  }

  uc(): void {
    console.log(`${this.ad} uçuyor...`);
  }
}

const kopek = new Kopek("Karabaş");
kopek.sesCikar(); // "Hav hav!"
kopek.getir();

const kus = new Kus("Tweety");
kus.sesCikar(); // "Cik cik!"
kus.uc();

// 6. Abstract class
abstract class Sekil {
  constructor(public renk: string) { }

  abstract alanHesapla(): number;
  abstract cevreHesapla(): number;

  bilgiGoster(): void {
    console.log(`Renk: ${this.renk}`);
    console.log(`Alan: ${this.alanHesapla()}`);
    console.log(`Çevre: ${this.cevreHesapla()}`);
  }
}

class Daire extends Sekil {
  constructor(renk: string, public yaricap: number) {
    super(renk);
  }

  alanHesapla(): number {
    return Math.PI * this.yaricap ** 2;
  }

  cevreHesapla(): number {
    return 2 * Math.PI * this.yaricap;
  }
}

class Dikdortgen extends Sekil {
  constructor(renk: string, public genislik: number, public yukseklik: number) {
    super(renk);
  }

  alanHesapla(): number {
    return this.genislik * this.yukseklik;
  }

  cevreHesapla(): number {
    return 2 * (this.genislik + this.yukseklik);
  }
}

const daire = new Daire("kırmızı", 5);
daire.bilgiGoster();

const dikdortgen = new Dikdortgen("mavi", 10, 5);
dikdortgen.bilgiGoster();

// 7. Static members
class Matematik {
  static PI: number = 3.14159;

  static daireAlani(yaricap: number): number {
    return this.PI * yaricap ** 2;
  }

  static karePrint(sayi: number): number {
    return sayi ** 2;
  }
}

console.log("Pi değeri:", Matematik.PI);
console.log("Daire alanı:", Matematik.daireAlani(10));
console.log("5'in karesi:", Matematik.karePrint(5));

// 8. Interface implementation
interface Yazdirilebilir {
  yazdir(): void;
}

interface Silinebilir {
  sil(): void;
}

class Dosya implements Yazdirilebilir, Silinebilir {
  constructor(public ad: string, private icerik: string) { }

  yazdir(): void {
    console.log(`=== ${this.ad} ===`);
    console.log(this.icerik);
  }

  sil(): void {
    this.icerik = "";
    console.log(`${this.ad} dosyası silindi.`);
  }
}

const dosya = new Dosya("notlar.txt", "TypeScript öğreniyorum!");
dosya.yazdir();
dosya.sil();

console.log("Classes örnekleri tamamlandı!");

export { };
