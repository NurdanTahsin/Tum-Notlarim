# Array Methods (React için Kritik!)

## map() - Dönüştürme
Her elemanı dönüştürür, yeni array döndürür.
```javascript
const sayilar = [1, 2, 3, 4, 5];
const kareler = sayilar.map(x => x * x);
console.log(kareler); // [1, 4, 9, 16, 25]

// Object array
const users = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'Veli' }
];

const names = users.map(user => user.name);
console.log(names); // ['Ali', 'Veli']

// Index kullanımı
const indexed = users.map((user, index) => ({
  ...user,
  order: index + 1
}));
```

## filter() - Filtreleme
Koşula uyan elemanları döndürür.
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

// Object array
const users = [
  { name: 'Ali', age: 17 },
  { name: 'Veli', age: 25 },
  { name: 'Ayşe', age: 30 }
];

const adults = users.filter(user => user.age >= 18);
```

## reduce() - Biriktirme
Array'i tek bir değere indirger.
```javascript
// Toplam
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Object oluşturma
const fruits = ['elma', 'armut', 'elma', 'muz', 'armut', 'elma'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { elma: 3, armut: 2, muz: 1 }

// Array flatten
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, curr) => [...acc, ...curr], []);
console.log(flat); // [1, 2, 3, 4, 5]
```

## find() - Tek Eleman Bulma
İlk eşleşen elemanı döndürür.
```javascript
const users = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'Veli' },
  { id: 3, name: 'Ayşe' }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Veli' }

// Bulamazsa undefined
const notFound = users.find(u => u.id === 99);
console.log(notFound); // undefined
```

## findIndex() - Index Bulma
İlk eşleşen elemanın index'ini döndürür.
```javascript
const numbers = [5, 12, 8, 130, 44];
const index = numbers.findIndex(n => n > 10);
console.log(index); // 1 (12'nin indexi)
```

## some() - Herhangi Biri
En az bir eleman koşulu sağlıyorsa true.
```javascript
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven); // true

const users = [
  { name: 'Ali', admin: false },
  { name: 'Veli', admin: true }
];
const hasAdmin = users.some(u => u.admin);
console.log(hasAdmin); // true
```

## every() - Hepsi
Tüm elemanlar koşulu sağlıyorsa true.
```javascript
const numbers = [2, 4, 6, 8];
const allEven = numbers.every(n => n % 2 === 0);
console.log(allEven); // true

const ages = [18, 20, 25, 30];
const allAdults = ages.every(age => age >= 18);
console.log(allAdults); // true
```

## sort() - Sıralama
⚠️ Orijinal array'i değiştirir!
```javascript
// Sayı sıralama
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => a - b); // Küçükten büyüğe
console.log(numbers); // [1, 1, 3, 4, 5, 9]

// Ters sıralama
numbers.sort((a, b) => b - a);

// String sıralama
const names = ['Zeynep', 'Ali', 'Mehmet'];
names.sort(); // Alfabetik

// Object sıralama
const users = [
  { name: 'Veli', age: 30 },
  { name: 'Ali', age: 25 },
  { name: 'Ayşe', age: 28 }
];
users.sort((a, b) => a.age - b.age); // Yaşa göre
```

## Method Chaining
```javascript
const users = [
  { name: 'Ali', age: 17, active: true },
  { name: 'Veli', age: 25, active: false },
  { name: 'Ayşe', age: 30, active: true },
  { name: 'Zeynep', age: 22, active: true }
];

// Aktif, yetişkin kullanıcıların isimleri
const result = users
  .filter(u => u.active)
  .filter(u => u.age >= 18)
  .map(u => u.name)
  .sort();

console.log(result); // ['Ayşe', 'Zeynep']
```

## React'te Kullanımı
```javascript
// Liste render etme
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Filtreleme ve render
function ActiveUsers({ users }) {
  const activeUsers = users.filter(u => u.active);
  
  return (
    <div>
      {activeUsers.map(user => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}

// Toplam hesaplama
function Cart({ items }) {
  const total = items.reduce((sum, item) => 
    sum + item.price * item.quantity, 0
  );
  
  return <div>Toplam: {total} TL</div>;
}
```

## Diğer Faydalı Methodlar
```javascript
// includes() - İçeriyor mu?
[1, 2, 3].includes(2); // true

// indexOf() - Index nedir?
[1, 2, 3].indexOf(2); // 1

// slice() - Parça al (immutable)
const arr = [1, 2, 3, 4, 5];
arr.slice(1, 3); // [2, 3]

// concat() - Birleştir
[1, 2].concat([3, 4]); // [1, 2, 3, 4]

// join() - String'e çevir
['a', 'b', 'c'].join('-'); // "a-b-c"

// reverse() - Ters çevir (mutable!)
[1, 2, 3].reverse(); // [3, 2, 1]
```
