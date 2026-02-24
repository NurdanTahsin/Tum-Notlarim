// ========== Scope Örnekleri ==========

// 1. Block scope
{
  let blockVar = "block içinde";
  const blockConst = 100;
  console.log(blockVar); // Erişilebilir
}
// console.log(blockVar); // HATA!

// 2. Function scope
function scopeTest() {
  var funcVar = "function içinde";
  let funcLet = "let ile";
  
  if (true) {
    var varInBlock = "var block'tan çıkar";
    let letInBlock = "let block'ta kalır";
  }
  
  console.log(varInBlock); // Erişilebilir
  // console.log(letInBlock); // HATA!
}

// 3. Closure ile scope
function sayacOlustur() {
  let sayac = 0;
  return () => {
    sayac++;
    return sayac;
  };
}

const sayac1 = sayacOlustur();
console.log(sayac1()); // 1
console.log(sayac1()); // 2

// 4. const ile object/array
const ayarlar = {
  tema: "dark",
  dil: "tr"
};

ayarlar.tema = "light"; // ✅ Çalışır
ayarlar.yeni = "değer"; // ✅ Çalışır
console.log(ayarlar);

// ayarlar = {}; // ❌ HATA!

// 5. Loop'larda var vs let
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
// Çıktı: 3, 3, 3 (hepsi aynı i'yi referans eder)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 200);
}
// Çıktı: 0, 1, 2 (her iterasyon kendi j'sine sahip)
