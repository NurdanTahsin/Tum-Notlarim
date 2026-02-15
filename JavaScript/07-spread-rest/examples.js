// ========== Spread ve Rest Operatörü Örnekleri ==========

// 1. Array Spread - Kopyalama
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] - değişmedi
console.log(copy); // [1, 2, 3, 4]

// 2. Array birleştirme
const fruits = ['elma', 'armut'];
const vegetables = ['domates', 'salatalık'];
const allFoods = [...fruits, 'muz', ...vegetables];
console.log(allFoods); 
// ['elma', 'armut', 'muz', 'domates', 'salatalık']

// 3. Object Spread
const user = {
  name: 'Ahmet',
  age: 25
};

const updatedUser = {
  ...user,
  age: 26,
  city: 'Istanbul'
};

console.log(updatedUser); 
// { name: 'Ahmet', age: 26, city: 'Istanbul' }

// 4. Merge objects
const defaults = {
  theme: 'light',
  notifications: true,
  lang: 'en'
};

const userPrefs = {
  lang: 'tr',
  fontSize: 16
};

const finalSettings = { ...defaults, ...userPrefs };
console.log(finalSettings);
// { theme: 'light', notifications: true, lang: 'tr', fontSize: 16 }

// 5. Rest Parameters
function calculateTotal(...prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}

console.log(calculateTotal(100, 200, 300)); // 600
console.log(calculateTotal(50, 75)); // 125

// 6. Rest ile ilk parametre ayrı
function createMessage(greeting, ...names) {
  return `${greeting} ${names.join(', ')}`;
}

console.log(createMessage('Merhaba', 'Ali', 'Veli', 'Ayşe'));
// "Merhaba Ali, Veli, Ayşe"

// 7. Destructuring ile Rest
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
const [primary, secondary, ...otherColors] = colors;
console.log(primary); // "red"
console.log(otherColors); // ["blue", "yellow", "purple"]

// 8. Object Destructuring ile Rest
const person = {
  id: 1,
  name: 'Zeynep',
  email: 'zeynep@example.com',
  age: 28,
  city: 'Ankara'
};

const { id, ...personWithoutId } = person;
console.log(personWithoutId); 
// { name: 'Zeynep', email: '...', age: 28, city: 'Ankara' }

// 9. Function argument spreading
function multiply(a, b, c) {
  return a * b * c;
}

const numbers = [2, 3, 4];
console.log(multiply(...numbers)); // 24

// 10. Math fonksiyonları
const scores = [85, 92, 78, 95, 88];
console.log(Math.max(...scores)); // 95
console.log(Math.min(...scores)); // 78

// 11. Array'den duplicate çıkarma
const duplicates = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(duplicates)];
console.log(unique); // [1, 2, 3, 4]

// 12. String'i array'e çevirme
const word = "Merhaba";
const letters = [...word];
console.log(letters); // ['M', 'e', 'r', 'h', 'a', 'b', 'a']

// 13. Immutable update pattern (React'te önemli)
let state = {
  user: { name: 'Ali', age: 25 },
  posts: [1, 2, 3]
};

// Yeni state oluştur (orijinali değiştirme)
state = {
  ...state,
  posts: [...state.posts, 4]
};

console.log(state.posts); // [1, 2, 3, 4]

// 14. Array elemanı çıkarma (immutable)
const items = [1, 2, 3, 4, 5];
const indexToRemove = 2;
const newItems = [
  ...items.slice(0, indexToRemove),
  ...items.slice(indexToRemove + 1)
];
console.log(newItems); // [1, 2, 4, 5]

// 15. Object özelliği kaldırma
function removeProperty(obj, propToRemove) {
  const { [propToRemove]: removed, ...rest } = obj;
  return rest;
}

const car = { brand: 'BMW', model: 'X5', year: 2020 };
const carWithoutYear = removeProperty(car, 'year');
console.log(carWithoutYear); // { brand: 'BMW', model: 'X5' }

// 16. Conditional spreading
const isAdmin = true;
const userRole = {
  name: 'Ali',
  ...(isAdmin && { role: 'admin', permissions: ['read', 'write'] })
};
console.log(userRole);
// { name: 'Ali', role: 'admin', permissions: [...] }
