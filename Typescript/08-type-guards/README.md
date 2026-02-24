# Type Guards & Assertions

## Type Guards Nedir?
Type guard'lar, runtime'da bir değerin tipini kontrol etmemizi ve TypeScript'in bu tipi anlamasını sağlar.

## typeof Type Guard
```typescript
function yazdir(deger: string | number): void {
  if (typeof deger === "string") {
    console.log(deger.toUpperCase()); // string methodları
  } else {
    console.log(deger.toFixed(2)); // number methodları
  }
}

yazdir("merhaba"); // "MERHABA"
yazdir(42.5678); // "42.57"
```

## instanceof Type Guard
```typescript
class Kopek {
  havla(): void {
    console.log("Hav hav!");
  }
}

class Kedi {
  miyavla(): void {
    console.log("Miyav!");
  }
}

function hayvanSesi(hayvan: Kopek | Kedi): void {
  if (hayvan instanceof Kopek) {
    hayvan.havla();
  } else {
    hayvan.miyavla();
  }
}
```

## in Operator Type Guard
```typescript
interface Balik {
  yuz(): void;
}

interface Kus {
  uc(): void;
}

function hareketEt(hayvan: Balik | Kus): void {
  if ("yuz" in hayvan) {
    hayvan.yuz(); // Balık
  } else {
    hayvan.uc(); // Kuş
  }
}
```

## User-Defined Type Guards (Type Predicates)
```typescript
// Custom type guard function
function isString(deger: unknown): deger is string {
  return typeof deger === "string";
}

function isle(deger: unknown): void {
  if (isString(deger)) {
    console.log(deger.toUpperCase()); // TypeScript biliyor ki bu string
  }
}

// Array type guard
function isStringArray(deger: unknown): deger is string[] {
  return Array.isArray(deger) && deger.every(item => typeof item === "string");
}
```

## Discriminated Unions
```typescript
// Tagged union pattern
interface Basarili {
  durum: "basarili";
  data: string;
}

interface Hata {
  durum: "hata";
  mesaj: string;
}

type Sonuc = Basarili | Hata;

function sonucuIsle(sonuc: Sonuc): void {
  // 'durum' property'sine göre type guard
  if (sonuc.durum === "basarili") {
    console.log(sonuc.data); // Basarili tip
  } else {
    console.log(sonuc.mesaj); // Hata tip
  }
}
```

## Type Assertions
TypeScript'e "Ben bu tipin ne olduğunu senin bildiğinden daha iyi biliyorum" demenin yolu.

### as Syntax
```typescript
// Type assertion
let deger: any = "bu bir string";
let uzunluk: number = (deger as string).length;

// DOM ile kullanım
const input = document.getElementById("email") as HTMLInputElement;
input.value = "test@example.com";

// Alternatif syntax (JSX ile çakışabilir, önerilmez)
let uzunluk2: number = (<string>deger).length;
```

### as const
```typescript
// Object'i readonly ve literal type yapar
const renkler = ["kırmızı", "mavi", "yeşil"] as const;
// type: readonly ["kırmızı", "mavi", "yeşil"]

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;
// Tüm property'ler readonly ve literal type
```

## Non-null Assertion Operator (!)
```typescript
// TypeScript'e "Bu kesinlikle null/undefined değil" deme
function bul(id: string): string | undefined {
  // ... arama işlemi
  return "sonuç";
}

const sonuc = bul("123")!; // ! ile "kesinlikle string" diyoruz
console.log(sonuc.toUpperCase()); // hata vermez

// DOM'da kullanım
const element = document.getElementById("app")!;
element.innerHTML = "Merhaba"; // null olmadığına eminiz
```

## Type Narrowing
```typescript
// Truthiness narrowing
function yazdir(metin: string | null | undefined): void {
  if (metin) {
    console.log(metin.toUpperCase()); // string
  } else {
    console.log("Boş değer");
  }
}

// Equality narrowing
function ornek(x: string | number, y: string | boolean): void {
  if (x === y) {
    // x ve y'nin ortak tipi sadece string
    x.toUpperCase();
    y.toUpperCase();
  }
}
```

## Array.isArray()
```typescript
function isle(deger: string | string[]): void {
  if (Array.isArray(deger)) {
    deger.forEach(item => console.log(item)); // string[]
  } else {
    console.log(deger.toUpperCase()); // string
  }
}
```

## React'te Kullanım
```typescript
// Event type guard
function handleEvent(event: React.MouseEvent | React.KeyboardEvent) {
  if ("key" in event) {
    // KeyboardEvent
    console.log(event.key);
  } else {
    // MouseEvent
    console.log(event.clientX, event.clientY);
  }
}

// Ref type assertion
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus(); // optional chaining
  // veya
  inputRef.current!.focus(); // non-null assertion (dikkatli!)
}, []);

// API response type guard
interface ApiError {
  error: string;
}

interface ApiSuccess<T> {
  data: T;
}

function isApiError(response: unknown): response is ApiError {
  return (response as ApiError).error !== undefined;
}

async function fetchData() {
  const response = await api.get();
  
  if (isApiError(response)) {
    console.error(response.error);
  } else {
    console.log(response.data);
  }
}
```

## Best Practices
- Type assertion yerine type guard tercih et
- `!` operatörünü dikkatli kullan, emin olmadıkça kullanma
- `any` as casting'den kaçın
- Custom type guard'lar oluştur (reusable)
- Discriminated unions kullan (tagged unions)
- Optional chaining (`?.`) tercih et non-null assertion yerine
