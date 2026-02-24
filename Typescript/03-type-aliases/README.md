# Type Aliases & Union/Intersection Types

## Type Alias
TypeScript'te özel tip isimleri oluşturmak için kullanılır.

```typescript
// Basit type alias
type ID = string | number;
type Durum = "beklemede" | "tamamlandi" | "iptal";

let kullaniciID: ID = "USER_123";
let siparisID: ID = 42;
let gorevDurumu: Durum = "tamamlandi";
```

## Union Types (|)
Bir değerin birden fazla tipten biri olabileceğini belirtir.

```typescript
// Union type
type Sonuc = string | number | boolean;

function islem(deger: Sonuc): void {
  console.log(deger);
}

islem("başarılı"); // OK
islem(404); // OK
islem(true); // OK
```

## Intersection Types (&)
Birden fazla tipi birleştirerek yeni bir tip oluşturur.

```typescript
type Kisi = {
  ad: string;
  soyad: string;
};

type Iletisim = {
  email: string;
  telefon: string;
};

type KullaniciProfili = Kisi & Iletisim;

const profil: KullaniciProfili = {
  ad: "Ahmet",
  soyad: "Yılmaz",
  email: "ahmet@example.com",
  telefon: "555-1234",
};
```

## Literal Types
Sadece belirli değerleri kabul eden tipler.

```typescript
// String literal types
type Renk = "kırmızı" | "mavi" | "yeşil";
let seciliRenk: Renk = "mavi"; // OK
// let yanlis: Renk = "sarı"; // Hata!

// Numeric literal types
type Zarlar = 1 | 2 | 3 | 4 | 5 | 6;
let zar: Zarlar = 4; // OK

// Boolean literal (nadiren kullanılır)
type EvetMi = true;
```

## Type Guards
Union type'larla çalışırken tip kontrolü.

```typescript
type Girdi = string | number;

function isle(deger: Girdi): void {
  // Type guard
  if (typeof deger === "string") {
    console.log(deger.toUpperCase()); // string methodları
  } else {
    console.log(deger.toFixed(2)); // number methodları
  }
}
```

## Discriminated Unions
```typescript
interface Basarili {
  basarili: true;
  data: string;
}

interface Basarisiz {
  basarili: false;
  hata: string;
}

type ApiSonucu = Basarili | Basarisiz;

function sonucuIsle(sonuc: ApiSonucu) {
  if (sonuc.basarili) {
    console.log(sonuc.data); // Basarili tip
  } else {
    console.log(sonuc.hata); // Basarisiz tip
  }
}
```

## Type Alias vs Interface
```typescript
// Type alias - union yapabilir
type Durum = "aktif" | "pasif" | "beklemede";

// Type alias - primitive'lere isim verebilir
type ID = string;

// Type alias - tuple için
type Koordinat = [number, number];

// Interface - sadece object shape için
interface Kullanici {
  ad: string;
  email: string;
}

// Genelde ikisi de kullanılabilir, tercih meselesi
```

## React'te Kullanım
```typescript
// Component props için union types
type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

// State için union
type LoadingState = "idle" | "loading" | "success" | "error";

// API response
type ApiResponse<T> = 
  | { status: "success"; data: T }
  | { status: "error"; error: string };
```
