# Set ve Map

## Set - Benzersiz Değerler Koleksiyonu

### Temel Kullanım
```javascript
// Set oluşturma
const set = new Set();

// Değer ekleme
set.add(1);
set.add(2);
set.add(2); // Duplicate - eklenmez
console.log(set); // Set { 1, 2 }

// Array'den Set
const numbers = new Set([1, 2, 2, 3, 3, 4]);
console.log(numbers); // Set { 1, 2, 3, 4 }

// Size
console.log(set.size); // 2

// Kontrol etme
console.log(set.has(1)); // true
console.log(set.has(5)); // false

// Silme
set.delete(2);
console.log(set.has(2)); // false

// Tümünü temizle
set.clear();
```

### Set Methodları
```javascript
const mySet = new Set([1, 2, 3, 4, 5]);

// forEach
mySet.forEach(value => {
  console.log(value);
});

// for...of
for (const value of mySet) {
  console.log(value);
}

// Array'e çevirme
const arr = [...mySet];
const arr2 = Array.from(mySet);
```

### Set Kullanım Örnekleri
```javascript
// 1. Array'den duplicate çıkarma
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]

// 2. String'den benzersiz karakterler
const str = "merhaba";
const uniqueChars = [...new Set(str)];
console.log(uniqueChars); // ['m', 'e', 'r', 'h', 'a', 'b']

// 3. Kesişim (intersection)
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);
const intersection = [...setA].filter(x => setB.has(x));
console.log(intersection); // [2, 3]

// 4. Birleşim (union)
const union = new Set([...setA, ...setB]);
console.log([...union]); // [1, 2, 3, 4]

// 5. Fark (difference)
const difference = [...setA].filter(x => !setB.has(x));
console.log(difference); // [1]
```

## Map - Anahtar-Değer Çiftleri

### Temel Kullanım
```javascript
// Map oluşturma
const map = new Map();

// Değer ekleme
map.set('name', 'Ahmet');
map.set('age', 25);
map.set(1, 'bir'); // Key herhangi bir tip olabilir

// Değer okuma
console.log(map.get('name')); // "Ahmet"
console.log(map.get(1)); // "bir"

// Size
console.log(map.size); // 3

// Kontrol
console.log(map.has('name')); // true

// Silme
map.delete('age');

// Tümünü temizle
map.clear();
```

### Map Methodları
```javascript
const userMap = new Map([
  ['user1', { name: 'Ali', age: 25 }],
  ['user2', { name: 'Veli', age: 30 }]
]);

// forEach
userMap.forEach((value, key) => {
  console.log(key, value);
});

// for...of
for (const [key, value] of userMap) {
  console.log(key, value);
}

// Keys
console.log([...userMap.keys()]); // ['user1', 'user2']

// Values
console.log([...userMap.values()]); // [{ name: 'Ali'... }, ...]

// Entries
console.log([...userMap.entries()]); // [['user1', {...}], ...]
```

### Map vs Object

| Özellik | Map | Object |
|---------|-----|--------|
| Key tipi | Herhangi bir tip | Sadece string/symbol |
| Sıralı | Evet | Garanti yok (ES2015+) |
| Size | map.size | Object.keys(obj).length |
| Iteration | Kolay | Object.keys() gerekli |
| Performance | Büyük data için iyi | Küçük data için iyi |

```javascript
// Map - Key olarak object kullanabilir
const objKey = { id: 1 };
const map = new Map();
map.set(objKey, 'value');
console.log(map.get(objKey)); // "value"

// Object - Key sadece string
const obj = {};
obj[objKey] = 'value'; // [object Object] olarak kaydedilir
```

### Map Kullanım Örnekleri
```javascript
// 1. Cache implementasyonu
const cache = new Map();

function getData(key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const data = fetchData(key); // Pahalı işlem
  cache.set(key, data);
  return data;
}

// 2. Frequency counter
const fruits = ['elma', 'armut', 'elma', 'muz', 'elma'];
const fruitCount = new Map();

fruits.forEach(fruit => {
  fruitCount.set(fruit, (fruitCount.get(fruit) || 0) + 1);
});

console.log(fruitCount.get('elma')); // 3

// 3. Object'i key olarak kullanma
const userRoles = new Map();
const user1 = { id: 1, name: 'Ali' };
const user2 = { id: 2, name: 'Veli' };

userRoles.set(user1, 'admin');
userRoles.set(user2, 'user');

console.log(userRoles.get(user1)); // "admin"
```

## WeakSet ve WeakMap

### WeakSet
- Sadece object tutabilir
- Garbage collection'a izin verir
```javascript
const weakSet = new WeakSet();
let obj = { id: 1 };
weakSet.add(obj);

obj = null; // Object garbage collect edilebilir
```

### WeakMap
- Key sadece object olabilir
- Memory leak önler
```javascript
const weakMap = new WeakMap();
let element = document.querySelector('#btn');
weakMap.set(element, { clicks: 0 });

// Element DOM'dan çıkarsa otomatik temizlenir
```

## React'te Kullanım
```javascript
// Set - Benzersiz ID'ler
const [selectedIds, setSelectedIds] = useState(new Set());

const toggleId = (id) => {
  const newSet = new Set(selectedIds);
  if (newSet.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
  setSelectedIds(newSet);
};

// Map - Key-value cache
const [userCache, setUserCache] = useState(new Map());

const cacheUser = (id, data) => {
  setUserCache(prev => new Map(prev).set(id, data));
};
```
