# Utility Types

TypeScript'in built-in olarak sunduğu, tipleri dönüştürmek için kullanılan yardımcı tipler.

## Partial<T>
Tüm property'leri optional yapar.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Tüm alanlar optional olur
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Kullanım örneği - update fonksiyonu
function updateUser(user: User, fieldsToUpdate: Partial<User>): User {
  return { ...user, ...fieldsToUpdate };
}

const user: User = { id: 1, name: "Ahmet", email: "ahmet@test.com", age: 25 };
const updated = updateUser(user, { age: 26 }); // Sadece yaş güncellendi
```

## Required<T>
Tüm property'leri zorunlu yapar.

```typescript
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

type RequiredConfig = Required<Config>;
// { host: string; port: number; debug: boolean; } - hepsi zorunlu
```

## Readonly<T>
Tüm property'leri readonly yapar.

```typescript
interface Todo {
  title: string;
  completed: boolean;
}

const todo: Readonly<Todo> = {
  title: "TypeScript öğren",
  completed: false
};

// todo.completed = true; // Hata! readonly
```

## Record<K, T>
Belirli key ve value tipleriyle object oluşturur.

```typescript
// Key: string, Value: number
type PageInfo = Record<string, number>;

const pageViews: PageInfo = {
  home: 1000,
  about: 250,
  contact: 100
};

// Literal types ile
type Role = "admin" | "user" | "guest";
type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};
```

## Pick<T, K>
Belirli property'leri seçer.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

// Sadece id, name ve email
type UserPreview = Pick<User, "id" | "name" | "email">;
// { id: number; name: string; email: string; }

const preview: UserPreview = {
  id: 1,
  name: "Zeynep",
  email: "zeynep@test.com"
};
```

## Omit<T, K>
Belirli property'leri çıkarır.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// password hariç tümü
type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string; }

// Birden fazla çıkarma
type PublicUser = Omit<User, "password" | "email">;
```

## Exclude<T, U>
Union type'dan belirli tipleri çıkarır.

```typescript
type Status = "pending" | "active" | "inactive" | "deleted";

type ActiveStatus = Exclude<Status, "deleted" | "inactive">;
// "pending" | "active"

type Primitive = string | number | boolean | null | undefined;
type NonNullable = Exclude<Primitive, null | undefined>;
// string | number | boolean
```

## Extract<T, U>
Union type'dan sadece belirli tipleri alır.

```typescript
type Status = "pending" | "active" | "inactive" | "deleted";

type PositiveStatus = Extract<Status, "active" | "pending">;
// "active" | "pending"
```

## NonNullable<T>
null ve undefined'ı çıkarır.

```typescript
type MaybeString = string | null | undefined;

type DefiniteString = NonNullable<MaybeString>;
// string
```

## ReturnType<T>
Fonksiyonun return tipini alır.

```typescript
function getUser() {
  return { id: 1, name: "Ahmet", email: "ahmet@test.com" };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; email: string; }

// Generic fonksiyonlarla
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

type PairResult = ReturnType<typeof createPair<string, number>>;
// [string, number]
```

## Parameters<T>
Fonksiyonun parametre tiplerini tuple olarak alır.

```typescript
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number, email: string]

// Kullanım
function callCreateUser(...args: CreateUserParams) {
  return createUser(...args);
}
```

## Awaited<T>
Promise'den değer tipini çıkarır.

```typescript
type Response = Promise<{ data: string }>;

type ResolvedResponse = Awaited<Response>;
// { data: string }

// Nested Promise
type NestedPromise = Promise<Promise<number>>;
type Resolved = Awaited<NestedPromise>;
// number
```

## React'te Utility Types
```typescript
import { ComponentProps, ElementRef } from 'react';

// Component props'larını al
type ButtonProps = ComponentProps<'button'>;

// Element ref tipini al
type InputRef = ElementRef<'input'>;

// Event handler tipini çıkar
type SubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

// State için Partial
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

function updateState(state: UserState, updates: Partial<UserState>): UserState {
  return { ...state, ...updates };
}
```

## Kombine Kullanım
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// User'ın public bilgileri + API response wrapper
type PublicUserResponse = ApiResponse<Omit<User, "password">>;

// Sadece update edilebilir alanlar
type UpdatableUser = Partial<Pick<User, "name" | "email">>;
```

## Best Practices
- `Partial<T>` - update fonksiyonlarında kullan
- `Pick<T, K>` ve `Omit<T, K>` - API response'larda kullan
- `Record<K, T>` - dictionary/map yapıları için kullan
- `ReturnType<T>` - fonksiyon dönüş tipini yeniden kullanmak için
- Type'ları kombine ederek güçlü tipler oluştur
- DRY prensibi - aynı tipi tekrar yazma, utility type kullan
