// ========== Arrow Function Örnekleri ==========

// 1. Tek satır arrow function
const carp = (a, b) => a * b;
console.log(carp(5, 3)); // 15

// 2. Array methods ile
const sayilar = [1, 2, 3, 4, 5];
const kareler = sayilar.map(x => x * x);
console.log(kareler); // [1, 4, 9, 16, 25]

const ciftler = sayilar.filter(x => x % 2 === 0);
console.log(ciftler); // [2, 4]

// 3. this binding örneği
const kullanici = {
  isim: "Zeynep",
  yaslar: [20, 21, 22, 23],
  
  // Normal function - this çalışır
  goster: function() {
    console.log(this.isim);
  },
  
  // Arrow function içinde this
  yaslariBastir: function() {
    this.yaslar.forEach(yas => {
      console.log(`${this.isim} ${yas} yaşında`); // this çalışır
    });
  }
};

kullanici.goster(); // "Zeynep"
kullanici.yaslariBastir();

// 4. Callback örneği
setTimeout(() => {
  console.log("2 saniye geçti");
}, 2000);

// 5. Object döndürme - parantez gerekli!
const olustur = (isim, yas) => ({ isim, yas });
console.log(olustur("Ali", 25)); // { isim: "Ali", yas: 25 }
