# Enums

## Enum Nedir?
Enum (enumeration), ilgili değerleri bir arada gruplamak için kullanılır. Sabit değerler tanımlamayı kolaylaştırır.

## Numeric Enums
```typescript
// Varsayılan olarak 0'dan başlar
enum Yön {
  Yukari,    // 0
  Asagi,     // 1
  Sol,       // 2
  Sag        // 3
}

let hareket: Yön = Yön.Yukari;
console.log(hareket); // 0

// Manuel değer atama
enum Durum {
  Beklemede = 1,
  Isleniyor = 2,
  Tamamlandi = 3,
  Iptal = 4
}

let siparisDurumu: Durum = Durum.Isleniyor;
console.log(siparisDurumu); // 2
```

## String Enums
```typescript
// Her üyeye string değer atamalısın
enum Renk {
  Kirmizi = "KIRMIZI",
  Mavi = "MAVI",
  Yesil = "YESIL",
  Sari = "SARI"
}

let seciliRenk: Renk = Renk.Mavi;
console.log(seciliRenk); // "MAVI"

// API'lerde kullanım
enum ApiDurum {
  Basarili = "SUCCESS",
  Hata = "ERROR",
  Yukleniyor = "LOADING"
}
```

## Heterogeneous Enums (Karışık)
```typescript
// Sayı ve string karışık (önerilmez)
enum Karisik {
  No = 0,
  Yes = "YES"
}
```

## Computed & Constant Members
```typescript
enum FileAccess {
  None,
  Read = 1 << 1,      // 2
  Write = 1 << 2,     // 4
  ReadWrite = Read | Write,  // 6
}

console.log(FileAccess.Read);      // 2
console.log(FileAccess.Write);     // 4
console.log(FileAccess.ReadWrite); // 6
```

## Reverse Mapping (Sadece Numeric)
```typescript
enum Durum {
  Aktif = 1,
  Pasif = 2
}

console.log(Durum.Aktif);  // 1
console.log(Durum[1]);     // "Aktif" - reverse mapping
console.log(Durum[2]);     // "Pasif"

// String enum'larda reverse mapping yok
```

## Const Enums
```typescript
// Compile edildiğinde kod içine inline olarak yazılır (daha performanslı)
const enum Yön {
  Yukari,
  Asagi,
  Sol,
  Sag
}

let yon = Yön.Yukari;
// Compile sonrası: let yon = 0;
```

## Enum Kullanım Örnekleri

### HTTP Status Codes
```typescript
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

function handleResponse(status: HttpStatus) {
  switch (status) {
    case HttpStatus.OK:
      console.log("Başarılı");
      break;
    case HttpStatus.NotFound:
      console.log("Bulunamadı");
      break;
    case HttpStatus.InternalServerError:
      console.log("Sunucu hatası");
      break;
  }
}
```

### User Roles
```typescript
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
  Moderator = "MODERATOR"
}

interface User {
  id: number;
  name: string;
  role: UserRole;
}

const user: User = {
  id: 1,
  name: "Ahmet",
  role: UserRole.Admin
};
```

## React'te Kullanım
```typescript
// Component state için enum
enum LoadingState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error"
}

function DataComponent() {
  const [state, setState] = useState<LoadingState>(LoadingState.Idle);

  useEffect(() => {
    setState(LoadingState.Loading);
    fetchData()
      .then(() => setState(LoadingState.Success))
      .catch(() => setState(LoadingState.Error));
  }, []);

  if (state === LoadingState.Loading) return <Spinner />;
  if (state === LoadingState.Error) return <Error />;
  // ...
}

// Button variants
enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger"
}

interface ButtonProps {
  variant?: ButtonVariant;
}
```

## Enum vs Union Types
```typescript
// Enum
enum Renk {
  Kirmizi = "kirmizi",
  Mavi = "mavi"
}

// Union Type (alternatif)
type RenkUnion = "kirmizi" | "mavi";

// Ne zaman hangisi?
// - Enum: İlgili sabitler grubu, özellikle sayısal değerler
// - Union: Basit string literal'ler, daha lightweight
```

## Best Practices
- String enum'ları tercih et (daha okunabilir log'lar)
- Enum isimlerini tekil kullan (Role, Status, Direction)
- Enum değerlerini SCREAMING_SNAKE_CASE veya PascalCase yaz
- Gereksiz yere enum kullanma, basit durumlar için union type yeterli
- Const enum performans için kullanılabilir ama dikkatli ol
