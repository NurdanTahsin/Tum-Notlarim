# Interfaces

## Interface Nedir?
TypeScript'te object'lerin şeklini (shape) tanımlamak için kullanılır.

```typescript
// Basit interface
interface Kullanici {
  ad: string;
  soyad: string;
  yas: number;
}

let kullanici: Kullanici = {
  ad: "Ahmet",
  soyad: "Yılmaz",
  yas: 28,
};
```

## Optional Properties
```typescript
interface Urun {
  ad: string;
  fiyat: number;
  aciklama?: string; // optional - olması şart değil
}

let urun1: Urun = { ad: "Laptop", fiyat: 15000 }; // OK
let urun2: Urun = { ad: "Mouse", fiyat: 200, aciklama: "Gaming mouse" }; // OK
```

## Readonly Properties
```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

let config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// config.apiUrl = "yeni url"; // Hata! readonly olduğu için değiştirilemez
```

## Extending Interfaces
```typescript
interface Kisi {
  ad: string;
  soyad: string;
}

interface Calisan extends Kisi {
  departman: string;
  maas: number;
}

let calisan: Calisan = {
  ad: "Zeynep",
  soyad: "Demir",
  departman: "IT",
  maas: 50000,
};
```

## Function Types
```typescript
interface HesaplamaFonksiyonu {
  (a: number, b: number): number;
}

const topla: HesaplamaFonksiyonu = (x, y) => x + y;
const carp: HesaplamaFonksiyonu = (x, y) => x * y;
```

## Index Signatures
```typescript
interface Sozluk {
  [key: string]: string;
}

let renkler: Sozluk = {
  kirmizi: "red",
  mavi: "blue",
  yesil: "green",
};
```

## React'te Kullanım
```typescript
// Component Props
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

function Button({ text, onClick, variant = "primary", disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{text}</button>;
}

// State interface
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
```

## Interface vs Type Alias
```typescript
// Interface - genişletilebilir
interface Hayvan {
  ad: string;
}

interface Hayvan {
  yas: number; // Aynı isimle tekrar tanımlanabilir (declaration merging)
}

// Type - genişletilemez
type Bitki = {
  ad: string;
};

// type Bitki = {
//   yas: number; // Hata! Duplicate identifier
// };
```

**Ne zaman hangisi?**
- React component props için genelde **interface** tercih edilir
- Union, intersection types için **type** kullanılır
- Her ikisi de kullanılabilir, tutarlı ol!
