# Advanced Types

## Conditional Types
Koşullara göre tip belirleme.

```typescript
// Temel syntax: T extends U ? X : Y

type IsString<T> = T extends string ? "evet" : "hayır";

type Test1 = IsString<string>; // "evet"
type Test2 = IsString<number>; // "hayır"

// Daha karmaşık örnek
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : "object";

type T1 = TypeName<string>; // "string"
type T2 = TypeName<42>; // "number"
type T3 = TypeName<true>; // "boolean"
```

## Infer Keyword
Conditional type içinde tip çıkarımı yapmak için kullanılır.

```typescript
// Array'in eleman tipini çıkar
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = ArrayElement<string[]>; // string
type NumberArray = ArrayElement<number[]>; // number

// Function return type çıkarma
type ReturnValue<T> = T extends (...args: any[]) => infer R ? R : never;

type Func1 = ReturnValue<() => string>; // string
type Func2 = ReturnValue<(x: number) => boolean>; // boolean

// Promise'den değer çıkarma
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type UnwrappedString = Unwrap<Promise<string>>; // string
type UnwrappedNumber = Unwrap<number>; // number
```

## Mapped Types
Mevcut bir tip üzerinden yeni tip oluşturma.

```typescript
// Her property'yi optional yap
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Her property'yi readonly yap
type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
};

// Tüm string property'leri number yap
type StringsToNumbers<T> = {
  [K in keyof T]: T[K] extends string ? number : T[K];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type UserNumbers = StringsToNumbers<User>;
// { name: number; age: number; email: number; }
```

## Template Literal Types
String literal tiplerle şablon oluşturma.

```typescript
// Prefix ekleme
type Greeting = "Hello" | "Hi" | "Hey";
type Name = "World" | "TypeScript";

type GreetingMessage = `${Greeting} ${Name}`;
// "Hello World" | "Hello TypeScript" | "Hi World" | "Hi TypeScript" | ...

// Event handlers
type Events = "click" | "focus" | "blur";
type EventHandlers = `on${Capitalize<Events>}`;
// "onClick" | "onFocus" | "onBlur"

// API endpoints
type HttpMethod = "get" | "post" | "put" | "delete";
type Endpoint = "/users" | "/products";
type ApiRoute = `${HttpMethod}${Endpoint}`;
// "get/users" | "get/products" | "post/users" | ...
```

## Built-in String Manipulation Types
```typescript
// Uppercase - tümünü büyük harf
type Upper = Uppercase<"hello">; // "HELLO"

// Lowercase - tümünü küçük harf
type Lower = Lowercase<"HELLO">; // "hello"

// Capitalize - ilk harfi büyük
type Cap = Capitalize<"hello">; // "Hello"

// Uncapitalize - ilk harfi küçük
type Uncap = Uncapitalize<"Hello">; // "hello"

// Kullanım örneği
type Action = "create" | "update" | "delete";
type ActionFunction = `${Action}User`;
// "createUser" | "updateUser" | "deleteUser"

type ConstantCase = Uppercase<ActionFunction>;
// "CREATEUSER" | "UPDATEUSER" | "DELETEUSER"
```

## Index Signatures
```typescript
// String index
interface StringDictionary {
  [key: string]: string;
}

// Number index
interface NumberArray {
  [index: number]: string;
}

// Karışık kullanım
interface MixedDictionary {
  [key: string]: string | number;
  count: number; // number olmalı
  name: string; // string olmalı
}
```

## Recursive Types
```typescript
// JSON değerleri
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const json: JsonValue = {
  name: "Ahmet",
  age: 25,
  hobbies: ["okuma", "yüzme"],
  address: {
    city: "İstanbul",
    country: "Türkiye"
  }
};

// Tree yapısı
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

const tree: TreeNode<string> = {
  value: "root",
  children: [
    { value: "child1" },
    {
      value: "child2",
      children: [{ value: "grandchild" }]
    }
  ]
};
```

## Branded Types (Nominal Typing)
```typescript
// TypeScript'te structural typing var, nominal yok
// Ama branded type ile nominal typing simüle edebiliriz

type Brand<K, T> = K & { __brand: T };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

const usd = 100 as USD;
const eur = 100 as EUR;

function addUSD(a: USD, b: USD): USD {
  return (a + b) as USD;
}

// addUSD(usd, eur); // Tip hatası! farklı currency'ler

// ID tipleri
type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function getUser(id: UserId) {
  // ...
}

// getUser("random-string" as ProductId); // Hata!
```

## Distributive Conditional Types
```typescript
// Union'lar üzerinde dağılır
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumber = ToArray<string | number>;
// string[] | number[] (her biri ayrı ayrı işlenir)

// Non-distributive yapmak için
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Combined = ToArrayNonDist<string | number>;
// (string | number)[] (birlikte işlenir)
```

## React'te Advanced Types
```typescript
// Component props extraction
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;
type InputProps = ComponentProps<'input'>;

// Discriminated union for component variants
type ButtonVariant =
  | { variant: 'primary'; onClick: () => void }
  | { variant: 'link'; href: string };

function Button(props: ButtonVariant) {
  if (props.variant === 'primary') {
    return <button onClick={props.onClick}>Click</button>;
  } else {
    return <a href={props.href}>Link</a>;
  }
}

// Polymorphic component
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & ComponentProps<E>;

function Box<E extends React.ElementType = 'div'>(
  props: PolymorphicProps<E>
) {
  const { as: Component = 'div', ...rest } = props;
  return <Component {...rest} />;
}

// Kullanım
<Box>Div olarak</Box>
<Box as="button" onClick={() => {}}>Button olarak</Box>
```

## Type-Level Programming
```typescript
// Type seviyesinde if-else
type If<C extends boolean, T, F> = C extends true ? T : F;

type Result1 = If<true, string, number>; // string
type Result2 = If<false, string, number>; // number

// Type seviyesinde length hesaplama
type Length<T extends any[]> = T['length'];

type Len1 = Length<[1, 2, 3]>; // 3
type Len2 = Length<[]>; // 0

// Type seviyesinde equals
type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

type Test1 = Equals<string, string>; // true
type Test2 = Equals<string, number>; // false
```

## Best Practices
- Conditional types karmaşıklaştığında yardımcı type'lar yaz
- Template literal types ile tip-güvenli string'ler oluştur
- Recursive types dikkatli kullan (circular reference)
- Branded types önemli değerler için kullan (UserId, Email, etc.)
- Type-level programming'i abartma, okunabilirlik önemli
- Complex type'ları dokümante et
