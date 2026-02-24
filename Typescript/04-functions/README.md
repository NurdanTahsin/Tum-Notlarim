# Functions

## Function Type Annotations

```typescript
// Parametreler ve return type
function topla(a: number, b: number): number {
  return a + b;
}

// Arrow function
const carp = (a: number, b: number): number => a * b;

// Void - değer döndürmeyen
function logla(mesaj: string): void {
  console.log(mesaj);
}
```

## Optional Parameters
```typescript
// ? ile optional parametre
function selamla(ad: string, soyad?: string): string {
  if (soyad) {
    return `Merhaba ${ad} ${soyad}`;
  }
  return `Merhaba ${ad}`;
}

selamla("Ahmet"); // OK
selamla("Ahmet", "Yılmaz"); // OK
```

## Default Parameters
```typescript
function hesapla(fiyat: number, indirim: number = 0): number {
  return fiyat - (fiyat * indirim) / 100;
}

hesapla(100); // 100 (indirim 0)
hesapla(100, 20); // 80 (20% indirim)
```

## Rest Parameters
```typescript
function toplamla(...sayilar: number[]): number {
  return sayilar.reduce((toplam, sayi) => toplam + sayi, 0);
}

toplamla(1, 2, 3); // 6
toplamla(1, 2, 3, 4, 5); // 15
```

## Function Type
```typescript
// Function type tanımlama
type MatematikIslem = (x: number, y: number) => number;

const topla: MatematikIslem = (a, b) => a + b;
const cikar: MatematikIslem = (a, b) => a - b;

// Callback function tipi
function islemYap(
  a: number,
  b: number,
  callback: (x: number, y: number) => number
): number {
  return callback(a, b);
}

islemYap(5, 3, topla); // 8
islemYap(5, 3, cikar); // 2
```

## Function Overloading
Aynı fonksiyonun farklı parametre tipleriyle kullanılması.

```typescript
// Overload signatures
function isle(x: string): string;
function isle(x: number): number;
function isle(x: boolean): boolean;

// Implementation
function isle(x: string | number | boolean): string | number | boolean {
  if (typeof x === "string") {
    return x.toUpperCase();
  } else if (typeof x === "number") {
    return x * 2;
  } else {
    return !x;
  }
}

isle("merhaba"); // "MERHABA"
isle(5); // 10
isle(true); // false
```

## Generic Functions
```typescript
// Generic function
function ilkEleman<T>(arr: T[]): T | undefined {
  return arr[0];
}

const sayi = ilkEleman([1, 2, 3]); // number
const metin = ilkEleman(["a", "b", "c"]); // string
```

## Type Predicates
```typescript
// Type guard function
function isString(deger: unknown): deger is string {
  return typeof deger === "string";
}

function isle(deger: unknown): void {
  if (isString(deger)) {
    console.log(deger.toUpperCase()); // TypeScript biliyor ki bu string
  }
}
```

## React'te Kullanım
```typescript
// Event handler
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  console.log(event.currentTarget);
};

// Form submit
const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
};

// Custom hook
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // implementation
}

// Callback props
interface ButtonProps {
  onClick: (id: number) => void;
  onHover?: () => void;
}
```

## Best Practices
- Parametrelerin tiplerini her zaman belirt
- Return type'ı açıkça yaz (inference'a güvenme)
- Optional parametreleri sona koy
- Callback'lerde void kullan (değer döndürmeyecekse)
