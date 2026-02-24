# Generics

## Generics Nedir?
Generics, kod tekrarını önlemek ve yeniden kullanılabilir type-safe kod yazmak için kullanılır. Fonksiyon, class veya interface'lerde tip parametreleri tanımlamamızı sağlar.

## Generic Functions
```typescript
// Generic function - tip parametresi <T>
function ilkEleman<T>(dizi: T[]): T | undefined {
  return dizi[0];
}

const sayi = ilkEleman([1, 2, 3]); // number
const metin = ilkEleman(["a", "b", "c"]); // string
const bool = ilkEleman([true, false]); // boolean

// Multiple type parameters
function cift<T, U>(ilk: T, ikinci: U): [T, U] {
  return [ilk, ikinci];
}

const sonuc = cift("yaş", 25); // [string, number]
const sonuc2 = cift(true, "aktif"); // [boolean, string]
```

## Generic Interfaces
```typescript
// Generic interface
interface ApiYanit<T> {
  data: T;
  durum: number;
  mesaj: string;
}

interface Kullanici {
  id: number;
  ad: string;
  email: string;
}

const kullaniciYaniti: ApiYanit<Kullanici> = {
  data: { id: 1, ad: "Ahmet", email: "ahmet@example.com" },
  durum: 200,
  mesaj: "Başarılı",
};

const sayiYaniti: ApiYanit<number[]> = {
  data: [1, 2, 3, 4, 5],
  durum: 200,
  mesaj: "Başarılı",
};
```

## Generic Classes
```typescript
// Generic class
class Kutu<T> {
  private icerik: T;

  constructor(deger: T) {
    this.icerik = deger;
  }

  getIcerik(): T {
    return this.icerik;
  }

  setIcerik(deger: T): void {
    this.icerik = deger;
  }
}

const sayiKutusu = new Kutu<number>(42);
console.log(sayiKutusu.getIcerik()); // 42

const metinKutusu = new Kutu<string>("Merhaba");
console.log(metinKutusu.getIcerik()); // "Merhaba"
```

## Generic Constraints
```typescript
// Sadece length property'si olan tipler
interface UzunlukVar {
  length: number;
}

function uzunlukGoster<T extends UzunlukVar>(deger: T): number {
  return deger.length;
}

uzunlukGoster("merhaba"); // 7 - string'in length'i var
uzunlukGoster([1, 2, 3]); // 3 - array'in length'i var
// uzunlukGoster(123); // Hata! number'ın length'i yok

// Object constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[K];
}

const kisi = { ad: "Ahmet", yas: 25 };
const ad = getProperty(kisi, "ad"); // "Ahmet"
const yas = getProperty(kisi, "yas"); // 25
// getProperty(kisi, "email"); // Hata! 'email' property'si yok
```

## Default Type Parameters
```typescript
interface Yanit<T = string> {
  data: T;
  hata?: string;
}

const yanit1: Yanit = { data: "varsayılan string" }; // T = string (default)
const yanit2: Yanit<number> = { data: 42 }; // T = number
```

## React'te Generics
```typescript
// useState ile generic
import { useState } from 'react';

interface User {
  id: number;
  name: string;
}

// Generic state
const [user, setUser] = useState<User | null>(null);
const [users, setUsers] = useState<User[]>([]);

// Generic component props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Kullanım
<List<string>
  items={["Elma", "Armut", "Muz"]}
  renderItem={(item) => <span>{item}</span>}
/>

<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

## Utility Types (Built-in Generics)
```typescript
// Partial<T> - tüm property'leri optional yapar
interface Todo {
  baslik: string;
  aciklama: string;
  tamamlandi: boolean;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

// Pick<T, K> - belirli property'leri seç
type TodoPreview = Pick<Todo, "baslik" | "tamamlandi">;

// Omit<T, K> - belirli property'leri çıkar
type TodoInfo = Omit<Todo, "tamamlandi">;
```

## Best Practices
- Generic adı olarak genelde **T** kullanılır (Type)
- Birden fazla generic varsa: **T, U, V** veya anlamlı isimler (**TData, TError**)
- Generic constraint kullanarak tip güvenliğini artır
- React'te component props'ları için generics kullan
- API response'lar için generic interface'ler oluştur
