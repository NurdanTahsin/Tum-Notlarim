# Arrow Functions

## Temel Syntax
```javascript
// Normal function
function topla(a, b) {
  return a + b;
}

// Arrow function
const topla = (a, b) => a + b;

// Tek parametre - parantez opsiyonel
const kare = x => x * x;

// Parametre yok
const merhaba = () => "Merhaba!";

// Çok satırlı - süslü parantez ve return gerekli
const hesapla = (a, b) => {
  const toplam = a + b;
  return toplam * 2;
};
```

## this Binding Farkı
**Normal function**: Kendi `this`'ini oluşturur  
**Arrow function**: Üst scope'un `this`'ini kullanır (lexical this)

```javascript
const kisi = {
  isim: "Ahmet",
  normalFunc: function() {
    console.log(this.isim); // "Ahmet"
  },
  arrowFunc: () => {
    console.log(this.isim); // undefined (window/global this)
  },
  gecikme: function() {
    setTimeout(() => {
      console.log(this.isim); // "Ahmet" - arrow func sayesinde
    }, 1000);
  }
};
```

## React'te Kullanımı
```javascript
// Event handler'larda çok kullanılır
<button onClick={() => handleClick(id)}>Tıkla</button>

// Array işlemlerinde
const isimler = users.map(user => user.name);
```

## Ne Zaman Kullanmalı?
✅ **Kullan**: Callback'lerde, array methods'da, this binding'e ihtiyaç olmadığında  
❌ **Kullanma**: Object method'larında, constructor'larda, prototype method'larında
