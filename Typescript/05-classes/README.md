# Classes

## Basit Class
```typescript
class Kisi {
  // Properties
  ad: string;
  soyad: string;
  yas: number;

  // Constructor
  constructor(ad: string, soyad: string, yas: number) {
    this.ad = ad;
    this.soyad = soyad;
    this.yas = yas;
  }

  // Method
  kendiniTanit(): string {
    return `Merhaba, ben ${this.ad} ${this.soyad}, ${this.yas} yaşındayım.`;
  }
}

const kisi = new Kisi("Ahmet", "Yılmaz", 25);
console.log(kisi.kendiniTanit());
```

## Access Modifiers
```typescript
class BankaHesabi {
  public sahibi: string; // Her yerden erişilebilir (default)
  private bakiye: number; // Sadece class içinden erişilebilir
  protected hesapNo: string; // Class ve alt class'lardan erişilebilir

  constructor(sahibi: string, hesapNo: string, bakiye: number = 0) {
    this.sahibi = sahibi;
    this.hesapNo = hesapNo;
    this.bakiye = bakiye;
  }

  public paraYatir(miktar: number): void {
    this.bakiye += miktar;
  }

  public getBakiye(): number {
    return this.bakiye;
  }
}

const hesap = new BankaHesabi("Zeynep", "TR123456", 5000);
console.log(hesap.sahibi); // OK - public
// console.log(hesap.bakiye); // Hata! - private
console.log(hesap.getBakiye()); // OK - public method
```

## Readonly
```typescript
class Urun {
  readonly id: string;
  ad: string;

  constructor(id: string, ad: string) {
    this.id = id;
    this.ad = ad;
  }
}

const urun = new Urun("U001", "Laptop");
// urun.id = "U002"; // Hata! readonly
urun.ad = "Desktop"; // OK
```

## Getters & Setters
```typescript
class Sicaklik {
  private _celsius: number = 0;

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(deger: number) {
    this._celsius = ((deger - 32) * 5) / 9;
  }

  get celsius(): number {
    return this._celsius;
  }

  set celsius(deger: number) {
    this._celsius = deger;
  }
}

const sicaklik = new Sicaklik();
sicaklik.celsius = 25;
console.log(sicaklik.fahrenheit); // 77
```

## Inheritance (Extends)
```typescript
class Hayvan {
  ad: string;

  constructor(ad: string) {
    this.ad = ad;
  }

  sesCikar(): void {
    console.log("Hayvan ses çıkarıyor...");
  }
}

class Kedi extends Hayvan {
  sesCikar(): void {
    console.log("Miyav!");
  }

  miyavla(): void {
    console.log(`${this.ad} miyavlıyor...`);
  }
}

const kedi = new Kedi("Pamuk");
kedi.sesCikar(); // "Miyav!"
kedi.miyavla(); // "Pamuk miyavlıyor..."
```

## Abstract Classes
```typescript
abstract class Sekil {
  abstract alanHesapla(): number;
  abstract cevreHesapla(): number;

  bilgiVer(): void {
    console.log(`Alan: ${this.alanHesapla()}, Çevre: ${this.cevreHesapla()}`);
  }
}

class Daire extends Sekil {
  constructor(private yaricap: number) {
    super();
  }

  alanHesapla(): number {
    return Math.PI * this.yaricap ** 2;
  }

  cevreHesapla(): number {
    return 2 * Math.PI * this.yaricap;
  }
}

const daire = new Daire(5);
daire.bilgiVer();
```

## Implements (Interface)
```typescript
interface Yazdirilebilir {
  yazdir(): void;
}

interface Kopyalanabilir {
  kopyala(): this;
}

class Dokuman implements Yazdirilebilir, Kopyalanabilir {
  constructor(private icerik: string) {}

  yazdir(): void {
    console.log(this.icerik);
  }

  kopyala(): this {
    return Object.create(this);
  }
}
```

## Static Members
```typescript
class Matematik {
  static PI: number = 3.14159;

  static daireDaire(yaricap: number): number {
    return this.PI * yaricap ** 2;
  }
}

console.log(Matematik.PI); // Static property
console.log(Matematik.daireDaire(5)); // Static method
```

## React'te Kullanım
TypeScript ile React'te genelde class component'ler yerine functional component'ler tercih edilir, ama eski projelerde görebilirsin:

```typescript
import React from 'react';

interface Props {
  baslik: string;
}

interface State {
  sayac: number;
}

class Sayac extends React.Component<Props, State> {
  state: State = {
    sayac: 0
  };

  arttir = (): void => {
    this.setState({ sayac: this.state.sayac + 1 });
  };

  render() {
    return (
      <div>
        <h1>{this.props.baslik}</h1>
        <p>Sayaç: {this.state.sayac}</p>
        <button onClick={this.arttir}>Arttır</button>
      </div>
    );
  }
}
```
