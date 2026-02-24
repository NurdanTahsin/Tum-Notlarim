// ========== Set ve Map Örnekleri ==========

// ========== SET ==========

// 1. Temel Set işlemleri
const mySet = new Set();
mySet.add(1);
mySet.add(5);
mySet.add(5); // Duplicate - eklenmez
mySet.add('text');

console.log(mySet); // Set { 1, 5, 'text' }
console.log(mySet.size); // 3
console.log(mySet.has(1)); // true

// 2. Array'den duplicate çıkarma
const numbers = [1, 2, 2, 3, 3, 4, 5, 5];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// 3. String'den benzersiz karakterler
const word = "javascript";
const uniqueChars = new Set(word);
console.log([...uniqueChars].join('')); // "javscript" (duplicate'ler gitti)

// 4. Set operasyonları
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Birleşim (Union)
const union = new Set([...setA, ...setB]);
console.log([...union]); // [1, 2, 3, 4, 5, 6]

// Kesişim (Intersection)
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log([...intersection]); // [3, 4]

// Fark (Difference)
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log([...difference]); // [1, 2]

// 5. Set ile iteration
const fruits = new Set(['elma', 'armut', 'muz']);

// forEach
fruits.forEach(fruit => {
  console.log(fruit);
});

// for...of
for (const fruit of fruits) {
  console.log(fruit);
}

// ========== MAP ==========

// 6. Temel Map işlemleri
const userMap = new Map();
userMap.set('name', 'Ahmet');
userMap.set('age', 25);
userMap.set('city', 'Istanbul');

console.log(userMap.get('name')); // "Ahmet"
console.log(userMap.size); // 3
console.log(userMap.has('age')); // true

userMap.delete('city');
console.log(userMap.has('city')); // false

// 7. Array'den Map oluşturma
const entries = [
  ['id', 1],
  ['name', 'Product'],
  ['price', 100]
];
const productMap = new Map(entries);
console.log(productMap.get('name')); // "Product"

// 8. Object key kullanımı
const user1 = { id: 1 };
const user2 = { id: 2 };

const userScores = new Map();
userScores.set(user1, 95);
userScores.set(user2, 87);

console.log(userScores.get(user1)); // 95

// 9. Frequency counter (Kelime sayma)
const text = "merhaba dünya merhaba JavaScript dünya";
const words = text.split(' ');
const wordCount = new Map();

words.forEach(word => {
  wordCount.set(word, (wordCount.get(word) || 0) + 1);
});

console.log(wordCount.get('merhaba')); // 2
console.log(wordCount.get('dünya')); // 2

// Map'i object'e çevir
console.log(Object.fromEntries(wordCount));

// 10. Map iteration
const settings = new Map([
  ['theme', 'dark'],
  ['language', 'tr'],
  ['notifications', true]
]);

// forEach
settings.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// for...of
for (const [key, value] of settings) {
  console.log(`${key} = ${value}`);
}

// Keys
console.log([...settings.keys()]); // ['theme', 'language', 'notifications']

// Values
console.log([...settings.values()]); // ['dark', 'tr', true]

// 11. Cache implementasyonu
class DataCache {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      console.log('Cache hit!');
      return this.cache.get(key);
    }
    console.log('Cache miss!');
    return null;
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new DataCache();
cache.set('user:1', { name: 'Ali', age: 25 });
console.log(cache.get('user:1')); // Cache hit!
console.log(cache.get('user:2')); // Cache miss!

// 12. Map vs Object karşılaştırma
// Map
const map = new Map();
map.set(1, 'bir');
map.set('1', 'string bir');
console.log(map.get(1)); // "bir"
console.log(map.get('1')); // "string bir"

// Object
const obj = {};
obj[1] = 'bir';
obj['1'] = 'string bir';
console.log(obj[1]); // "string bir" (ikisi de aynı)

// 13. Chaining map operations
const chain = new Map()
  .set('a', 1)
  .set('b', 2)
  .set('c', 3);

console.log(chain.size); // 3

// 14. Map to Array conversions
const testMap = new Map([
  ['name', 'Test'],
  ['type', 'Example']
]);

console.log([...testMap]); // [['name', 'Test'], ['type', 'Example']]
console.log(Array.from(testMap)); // Aynı
console.log([...testMap.keys()]); // ['name', 'type']
console.log([...testMap.values()]); // ['Test', 'Example']

// 15. Practical: Shopping cart with Map
class ShoppingCart {
  constructor() {
    this.items = new Map();
  }

  addItem(product, quantity = 1) {
    const current = this.items.get(product.id) || { product, quantity: 0 };
    this.items.set(product.id, {
      product,
      quantity: current.quantity + quantity
    });
  }

  removeItem(productId) {
    this.items.delete(productId);
  }

  getTotal() {
    let total = 0;
    this.items.forEach(({ product, quantity }) => {
      total += product.price * quantity;
    });
    return total;
  }

  getItemCount() {
    return this.items.size;
  }
}

const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Laptop', price: 5000 }, 1);
cart.addItem({ id: 2, name: 'Mouse', price: 50 }, 2);

console.log('Ürün sayısı:', cart.getItemCount()); // 2
console.log('Toplam:', cart.getTotal()); // 5100
