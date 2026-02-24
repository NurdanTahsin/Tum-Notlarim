// ========== Array Methods Örnekleri ==========

// Test verisi
const products = [
  { id: 1, name: 'Laptop', price: 5000, category: 'Electronics', stock: 5 },
  { id: 2, name: 'Mouse', price: 50, category: 'Electronics', stock: 20 },
  { id: 3, name: 'Keyboard', price: 150, category: 'Electronics', stock: 0 },
  { id: 4, name: 'Desk', price: 1000, category: 'Furniture', stock: 3 },
  { id: 5, name: 'Chair', price: 800, category: 'Furniture', stock: 7 }
];

// 1. map() - Fiyatları %10 indirimli göster
const discounted = products.map(p => ({
  ...p,
  price: p.price * 0.9
}));
console.log('İndirimli:', discounted[0].price); // 4500

// 2. filter() - Stokta olan ürünler
const inStock = products.filter(p => p.stock > 0);
console.log('Stokta olan:', inStock.length); // 4

// 3. reduce() - Toplam değer
const totalValue = products.reduce((sum, p) => 
  sum + (p.price * p.stock), 0
);
console.log('Toplam envanter değeri:', totalValue); // 36350

// 4. find() - ID ile ürün bul
const product = products.find(p => p.id === 3);
console.log('Bulunan:', product.name); // "Keyboard"

// 5. some() - 100 TL altı ürün var mı?
const hasCheap = products.some(p => p.price < 100);
console.log('Ucuz ürün var mı?', hasCheap); // true

// 6. every() - Hepsi 1000 TL altında mı?
const allAffordable = products.every(p => p.price < 1000);
console.log('Hepsi uygun fiyatlı mı?', allAffordable); // false

// 7. sort() - Fiyata göre sırala
const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
console.log('En ucuz:', sortedByPrice[0].name); // "Mouse"

// 8. Method Chaining - Kompleks işlem
const electronicNames = products
  .filter(p => p.category === 'Electronics')
  .filter(p => p.stock > 0)
  .map(p => p.name)
  .sort();

console.log('Stokta olan elektronikler:', electronicNames);
// ["Laptop", "Mouse"]

// 9. reduce() - Kategoriye göre grupla
const byCategory = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});

console.log('Electronics kategorisi:', byCategory.Electronics.length); // 3

// 10. reduce() - En pahalı ürün
const mostExpensive = products.reduce((max, product) => 
  product.price > max.price ? product : max
);
console.log('En pahalı:', mostExpensive.name); // "Laptop"

// 11. findIndex() - Stoksuz ilk ürünün indexi
const outOfStockIndex = products.findIndex(p => p.stock === 0);
console.log('Stoksuz index:', outOfStockIndex); // 2

// 12. Practical: Sepet toplam hesaplama
const cart = [
  { productId: 1, quantity: 2 },
  { productId: 2, quantity: 3 },
  { productId: 4, quantity: 1 }
];

const cartTotal = cart.reduce((total, item) => {
  const product = products.find(p => p.id === item.productId);
  return total + (product.price * item.quantity);
}, 0);

console.log('Sepet toplamı:', cartTotal); // 11150

// 13. Practical: Arama fonksiyonu
function searchProducts(query) {
  return products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );
}

console.log('Arama "key":', searchProducts('key')); 
// [{ name: 'Keyboard', ... }]

// 14. Practical: İstatistik hesaplama
const stats = {
  total: products.length,
  inStock: products.filter(p => p.stock > 0).length,
  outOfStock: products.filter(p => p.stock === 0).length,
  avgPrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
  categories: [...new Set(products.map(p => p.category))]
};

console.log('İstatistikler:', stats);

// 15. includes, indexOf, slice
const ids = products.map(p => p.id);
console.log('ID 3 var mı?', ids.includes(3)); // true
console.log('ID 3 indexi:', ids.indexOf(3)); // 2
console.log('İlk 3 ID:', ids.slice(0, 3)); // [1, 2, 3]

// 16. React benzeri kullanım
function renderProductList(products) {
  return products
    .filter(p => p.stock > 0)
    .map(p => `<li key="${p.id}">${p.name} - ${p.price} TL</li>`)
    .join('');
}

console.log(renderProductList(products));

// 17. flat() - İç içe array'leri düzleştir
const nested = [[1, 2], [3, 4], [5, 6]];
console.log(nested.flat()); // [1, 2, 3, 4, 5, 6]

// 18. flatMap() - map + flat birlikte
const tags = [
  { id: 1, tags: ['js', 'react'] },
  { id: 2, tags: ['css', 'html'] }
];
const allTags = tags.flatMap(item => item.tags);
console.log(allTags); // ['js', 'react', 'css', 'html']
