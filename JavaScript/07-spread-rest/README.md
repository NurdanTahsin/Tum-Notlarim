# Spread ve Rest Operatörü

## Spread Operatörü (...)

### Array'lerde Spread
```javascript
// Array kopyalama
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // Yeni array oluşturur
console.log(arr2); // [1, 2, 3]

// Array birleştirme
const colors1 = ['red', 'green'];
const colors2 = ['blue', 'yellow'];
const allColors = [...colors1, ...colors2];
console.log(allColors); // ['red', 'green', 'blue', 'yellow']

// Array'in ortasına ekleme
const numbers = [1, 2, 5, 6];
const updated = [0, ...numbers, 7];
console.log(updated); // [0, 1, 2, 5, 6, 7]

// Math fonksiyonlarında
const nums = [5, 2, 8, 1, 9];
console.log(Math.max(...nums)); // 9
console.log(Math.min(...nums)); // 1
```

### Object'lerde Spread
```javascript
// Object kopyalama
const user = { name: 'Ali', age: 25 };
const userCopy = { ...user };

// Object birleştirme
const defaults = { theme: 'light', lang: 'en' };
const userSettings = { lang: 'tr', fontSize: 14 };
const settings = { ...defaults, ...userSettings };
console.log(settings); // { theme: 'light', lang: 'tr', fontSize: 14 }

// Özellik ekleme
const updated = { 
  ...user, 
  city: 'Istanbul',
  age: 26 // Üzerine yazar
};

// İmmutable update pattern
const state = { count: 0, loading: false };
const newState = { ...state, count: state.count + 1 };
```

## Rest Operatörü (...)

### Function Parametrelerinde
```javascript
// Sınırsız parametre
function topla(...sayilar) {
  return sayilar.reduce((sum, num) => sum + num, 0);
}

console.log(topla(1, 2, 3)); // 6
console.log(topla(1, 2, 3, 4, 5)); // 15

// İlk parametre ayrı, geri kalanı rest
function greet(isim, ...hobiler) {
  console.log(`${isim}'in hobileri: ${hobiler.join(', ')}`);
}

greet('Ali', 'kod', 'müzik', 'spor');
// "Ali'in hobileri: kod, müzik, spor"
```

### Destructuring'de Rest
```javascript
// Array'de
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [3, 4, 5]

// Object'te
const { name, age, ...otherInfo } = {
  name: 'Zeynep',
  age: 28,
  city: 'Ankara',
  job: 'Developer'
};

console.log(name); // "Zeynep"
console.log(otherInfo); // { city: 'Ankara', job: 'Developer' }
```

## Spread vs Rest Farkı
```javascript
// Spread: Yaymak, açmak
const arr = [1, 2, 3];
console.log(...arr); // 1 2 3 (üç ayrı değer)

// Rest: Toplamak, birleştirmek
function func(...args) { // Tüm argümanları array'e topla
  console.log(args); // [1, 2, 3]
}
func(1, 2, 3);
```

## React'te Kullanımı
```javascript
// Props spreading
const props = { name: 'Ali', age: 25, city: 'Istanbul' };
<UserCard {...props} /> // Tüm props'ları geç

// State update (immutable)
const [user, setUser] = useState({ name: '', age: 0 });
setUser({ ...user, age: 26 }); // Sadece age güncelle

// Array'e eleman ekleme
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]); // Yeni array: [1, 2, 3, 4]
setItems([0, ...items]); // Başa ekle: [0, 1, 2, 3]

// Object'ten özellik çıkarma
const { password, ...userWithoutPassword } = user;
// password hariç tüm özellikleri al
```

## Shallow Copy Uyarısı
```javascript
// ⚠️ Spread sadece 1 seviye kopyalar (shallow copy)
const original = {
  name: 'Ali',
  address: { city: 'Istanbul' }
};

const copy = { ...original };
copy.address.city = 'Ankara'; // ⚠️ original de değişir!

// ✅ Deep copy için
const deepCopy = JSON.parse(JSON.stringify(original));
// veya lodash.cloneDeep()
```

## Pratik Örnekler
```javascript
// Array'den duplicate çıkarma
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// String'i array'e çevirme
const str = "Merhaba";
const chars = [...str]; // ['M', 'e', 'r', 'h', 'a', 'b', 'a']

// NodeList'i Array'e
const divs = document.querySelectorAll('div');
const divArray = [...divs];

// Function arguments
function oldSchool() {
  const args = Array.from(arguments);
  // veya
  const args2 = [...arguments];
}
```
