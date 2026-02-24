# Scope (Kapsam)

## var, let, const Farkları

| Özellik | var | let | const |
|---------|-----|-----|-------|
| Scope | Function scope | Block scope | Block scope |
| Hoisting | Evet (undefined) | Evet (TDZ) | Evet (TDZ) |
| Yeniden atama | ✅ | ✅ | ❌ |
| Yeniden tanımlama | ✅ | ❌ | ❌ |

## Block Scope vs Function Scope
```javascript
// var - function scope
function varOrnek() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - erişilebilir
}

// let/const - block scope
function letOrnek() {
  if (true) {
    let y = 10;
    const z = 20;
  }
  // console.log(y); // HATA! y tanımlı değil
}
```

## Hoisting
```javascript
console.log(a); // undefined (hoisted)
var a = 5;

// console.log(b); // HATA! Temporal Dead Zone
let b = 10;
```

## Scope Seviyeleri
```javascript
// Global scope
const global = "Her yerden erişilebilir";

function disFunc() {
  // Function scope
  const dis = "Sadece bu fonksiyon içinde";
  
  if (true) {
    // Block scope
    const ic = "Sadece bu block içinde";
    console.log(global, dis, ic); // Hepsi erişilebilir
  }
  // console.log(ic); // HATA!
}
```

## React'te Best Practice
```javascript
// ✅ DOĞRU - const kullan (değişmeyecekse)
const API_URL = "https://api.example.com";

// ✅ DOĞRU - let kullan (değişecekse)
let counter = 0;

// ❌ YANLIŞ - var kullanma
var x = 10; // Modern JS'de kullanılmaz
```

## const ile Objeler
```javascript
const user = { name: "Ali" };
user.name = "Veli"; // ✅ Çalışır - içerik değişebilir
// user = {}; // ❌ HATA - referans değiştirilemez

const arr = [1, 2, 3];
arr.push(4); // ✅ Çalışır
// arr = []; // ❌ HATA
```
