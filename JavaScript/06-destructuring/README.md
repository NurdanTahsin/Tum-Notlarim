# Destructuring (Parçalama)

## Array Destructuring
```javascript
// Temel kullanım
const sayilar = [1, 2, 3, 4, 5];
const [bir, iki, uc] = sayilar;
console.log(bir); // 1
console.log(iki); // 2

// Bazı elemanları atla
const [ilk, , ucuncu] = [10, 20, 30];
console.log(ilk, ucuncu); // 10, 30

// Rest operator ile
const [ilkEleman, ...geri] = [1, 2, 3, 4, 5];
console.log(ilkEleman); // 1
console.log(geri); // [2, 3, 4, 5]

// Varsayılan değer
const [a = 10, b = 20] = [1];
console.log(a, b); // 1, 20

// Değer değiştirme
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1
```

## Object Destructuring
```javascript
// Temel kullanım
const user = {
  name: 'Ahmet',
  age: 25,
  city: 'İstanbul'
};

const { name, age } = user;
console.log(name, age); // "Ahmet", 25

// Farklı isimle
const { name: isim, age: yas } = user;
console.log(isim, yas); // "Ahmet", 25

// Varsayılan değer
const { name, country = 'Türkiye' } = user;
console.log(country); // "Türkiye"

// İç içe obje
const person = {
  name: 'Zeynep',
  address: {
    city: 'Ankara',
    zip: '06000'
  }
};

const { name, address: { city } } = person;
console.log(city); // "Ankara"

// Rest ile
const { name, ...rest } = user;
console.log(rest); // { age: 25, city: 'İstanbul' }
```

## Fonksiyon Parametrelerinde
```javascript
// Object destructuring
function greet({ name, age }) {
  console.log(`Merhaba ${name}, ${age} yaşındasın`);
}

greet({ name: 'Ali', age: 30 });

// Varsayılan değerlerle
function createUser({ name = 'Anonim', age = 0 } = {}) {
  return { name, age };
}

console.log(createUser()); // { name: 'Anonim', age: 0 }
console.log(createUser({ name: 'Veli' })); // { name: 'Veli', age: 0 }

// Array destructuring
function getCoordinates([x, y]) {
  console.log(`X: ${x}, Y: ${y}`);
}

getCoordinates([10, 20]);
```

## React'te Kullanımı
```javascript
// Props destructuring
function UserCard({ name, age, avatar }) {
  return (
    <div>
      <img src={avatar} />
      <h2>{name}</h2>
      <p>{age} yaşında</p>
    </div>
  );
}

// useState ile
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', age: 0 });

// useEffect ile
useEffect(() => {
  // ...
}, [count]); // Array destructuring

// Custom hook
const { data, loading, error } = useFetch(url);

// Event object
const handleClick = ({ target, clientX }) => {
  console.log(target, clientX);
};
```

## Pratik Örnekler
```javascript
// API response
const response = {
  data: { users: [...] },
  status: 200,
  message: 'Success'
};

const { data: { users }, status } = response;

// Function return
function getStats() {
  return {
    total: 100,
    active: 75,
    inactive: 25
  };
}

const { total, active } = getStats();

// Array from function
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

const [min, max] = getMinMax([1, 5, 3, 9, 2]);
```
