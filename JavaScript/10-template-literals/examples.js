// ========== Template Literals Örnekleri ==========

// 1. Temel string interpolation
const firstName = 'Ahmet';
const lastName = 'Yılmaz';
const age = 30;

const greeting = `Merhaba, ben ${firstName} ${lastName}. ${age} yaşındayım.`;
console.log(greeting);

// 2. Expressions
const price = 100;
const quantity = 3;
const tax = 0.18;

const invoice = `
  Ürün Fiyatı: ${price} TL
  Adet: ${quantity}
  Ara Toplam: ${price * quantity} TL
  KDV (%18): ${price * quantity * tax} TL
  Genel Toplam: ${price * quantity * (1 + tax)} TL
`;
console.log(invoice);

// 3. Function calls
function formatCurrency(amount) {
  return `${amount.toFixed(2)} TL`;
}

const total = 1234.567;
console.log(`Toplam: ${formatCurrency(total)}`); 
// "Toplam: 1234.57 TL"

// 4. Conditional expressions
const user = {
  name: 'Zeynep',
  age: 25,
  isAdmin: true
};

const status = `
  Kullanıcı: ${user.name}
  Rol: ${user.isAdmin ? 'Yönetici' : 'Kullanıcı'}
  Durum: ${user.age >= 18 ? 'Yetişkin' : 'Reşit Değil'}
`;
console.log(status);

// 5. Multi-line strings
const poem = `
  Gökyüzünde bir kuş uçuyor,
  Denizde bir dalga kırılıyor,
  Rüzgar yaprakları savuruyor,
  Hayat devam ediyor.
`;

// 6. HTML template
const product = {
  id: 1,
  name: 'Laptop',
  price: 5000,
  image: 'laptop.jpg',
  inStock: true
};

const productCard = `
  <div class="product-card" data-id="${product.id}">
    <img src="/images/${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">${product.price} TL</p>
    <span class="stock ${product.inStock ? 'in-stock' : 'out-of-stock'}">
      ${product.inStock ? 'Stokta Var' : 'Stokta Yok'}
    </span>
  </div>
`;
console.log(productCard);

// 7. Array içeriğini gösterme
const fruits = ['Elma', 'Armut', 'Muz', 'Portakal'];
const list = `
  Meyve Listesi:
  ${fruits.map((fruit, i) => `  ${i + 1}. ${fruit}`).join('\n')}
`;
console.log(list);

// 8. URL building
const api = {
  base: 'https://api.example.com',
  version: 'v1',
  endpoint: 'users'
};

const userId = 123;
const params = new URLSearchParams({
  include: 'posts,comments',
  limit: 10
});

const apiUrl = `${api.base}/${api.version}/${api.endpoint}/${userId}?${params}`;
console.log(apiUrl);

// 9. SQL-like query (örnek amaçlı)
function buildQuery(table, conditions) {
  const where = Object.entries(conditions)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(' AND ');
  
  return `SELECT * FROM ${table} WHERE ${where}`;
}

const query = buildQuery('users', { 
  status: 'active', 
  role: 'admin' 
});
console.log(query);

// 10. Tagged template - Localization
function translate(strings, ...values) {
  const translations = {
    'Hello': 'Merhaba',
    'My name is': 'Benim adım',
    'years old': 'yaşında'
  };
  
  return strings.reduce((result, str, i) => {
    const translated = translations[str.trim()] || str;
    return result + translated + (values[i] || '');
  }, '');
}

const name = 'Ali';
const ageValue = 25;
// const translated = translate`Hello ${name}, My name is ${name} years old`;

// 11. Styled output
function styled(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i];
    const styled = typeof value === 'number' 
      ? `<strong>${value}</strong>` 
      : value;
    return result + str + (styled || '');
  }, '');
}

const score = 95;
const studentName = 'Ayşe';
const report = styled`Öğrenci ${studentName} sınavdan ${score} puan aldı.`;
console.log(report);

// 12. Email template
function createEmail(recipient) {
  return `
    To: ${recipient.email}
    Subject: Hoş Geldiniz!
    
    Merhaba ${recipient.name},
    
    Sistemimize kaydınız başarıyla tamamlandı.
    
    Kullanıcı Bilgileri:
    - Kullanıcı Adı: ${recipient.username}
    - E-posta: ${recipient.email}
    - Kayıt Tarihi: ${new Date().toLocaleDateString('tr-TR')}
    
    İyi günler,
    ${recipient.companyName} Ekibi
  `;
}

const emailContent = createEmail({
  name: 'Mehmet',
  email: 'mehmet@example.com',
  username: 'mehmet123',
  companyName: 'Tech Corp'
});
console.log(emailContent);

// 13. CSS-in-JS style
const theme = {
  primary: '#007bff',
  secondary: '#6c757d',
  spacing: '8px',
  borderRadius: '4px'
};

const buttonStyles = `
  background-color: ${theme.primary};
  color: white;
  padding: ${theme.spacing} ${parseInt(theme.spacing) * 2}px;
  border-radius: ${theme.borderRadius};
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.secondary};
  }
`;

// 14. Nested templates
const users = [
  { name: 'Ali', age: 25 },
  { name: 'Veli', age: 30 },
  { name: 'Ayşe', age: 28 }
];

const userTable = `
  <table>
    <thead>
      <tr><th>İsim</th><th>Yaş</th></tr>
    </thead>
    <tbody>
      ${users.map(u => `
        <tr>
          <td>${u.name}</td>
          <td>${u.age}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

// 15. String.raw kullanımı
const windowsPath = String.raw`C:\Users\Documents\file.txt`;
console.log(windowsPath); // Backslash'ler korunur

const regex = String.raw`\d{3}-\d{2}-\d{4}`;
console.log(regex); // \d escape edilmez

// 16. Dynamic class names (React benzeri)
const isActive = true;
const isLarge = false;
const hasError = false;

const classNames = `
  btn 
  ${isActive ? 'btn-active' : ''} 
  ${isLarge ? 'btn-lg' : 'btn-sm'} 
  ${hasError ? 'btn-error' : ''}
`.trim().replace(/\s+/g, ' ');

console.log(classNames); // "btn btn-active btn-sm"
