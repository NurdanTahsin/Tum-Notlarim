# Basic Types

## Temel Tipler
```typescript
// String
let isim: string = "Ahmet";

// Number
let yas: number = 25;

// Boolean
let aktif: boolean = true;

// Array - iki farklı syntax
let sayilar: number[] = [1, 2, 3];
let isimler: Array<string> = ["Ali", "Ayşe"];

// Tuple - Sabit uzunlukta farklı tiplerde array
let kisi: [string, number] = ["Mehmet", 30];

// Any - herhangi bir tip (mümkün olduğunca kullanma!)
let birsey: any = "text";
birsey = 42; // hata vermez

// Unknown - any'den daha güvenli
let bilinmeyen: unknown = "değer";
// bilinmeyen.toUpperCase(); // Hata verir
if (typeof bilinmeyen === "string") {
  bilinmeyen.toUpperCase(); // Çalışır
}

// Void - fonksiyon değer döndürmüyorsa
function logla(mesaj: string): void {
  console.log(mesaj);
}

// Never - asla return etmeyen fonksiyonlar
function hataFirlat(mesaj: string): never {
  throw new Error(mesaj);
}

// Null ve Undefined
let bos: null = null;
let tanimsiz: undefined = undefined;
```

## Union Types
```typescript
// Birden fazla tip kabul etme
let id: string | number;
id = "ABC123"; // OK
id = 123; // OK
// id = true; // Hata!

// Kullanım örneği
function yazdir(deger: string | number): void {
  console.log(deger);
}
```

## Type Annotation vs Type Inference
```typescript
// Type annotation - manuel tip belirtme
let sayi: number = 42;

// Type inference - TypeScript otomatik anlar
let sayi2 = 42; // TypeScript bunu number olarak anlar
```

## React'te Kullanım
```typescript
// Component props
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean; // optional
}

// State typing
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```
