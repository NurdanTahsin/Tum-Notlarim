# Template Literals (Template Strings)

## Temel Kullanım
```javascript
// Eski yöntem (string concatenation)
const name = 'Ahmet';
const age = 25;
const message = 'Merhaba, benim adım ' + name + ' ve ' + age + ' yaşındayım.';

// Template literal
const message2 = `Merhaba, benim adım ${name} ve ${age} yaşındayım.`;
console.log(message2);
```

## String Interpolation
```javascript
const user = {
  name: 'Zeynep',
  age: 28,
  city: 'Ankara'
};

// Expression kullanımı
const intro = `${user.name} ${user.age} yaşında ve ${user.city}'da yaşıyor.`;

// Hesaplama
const price = 100;
const tax = 18;
const total = `Toplam: ${price + (price * tax / 100)} TL`;
console.log(total); // "Toplam: 118 TL"

// Function çağrısı
const upperName = `İsim: ${user.name.toUpperCase()}`;
console.log(upperName); // "İsim: ZEYNEP"

// Ternary operator
const isAdult = `${user.age >= 18 ? 'Yetişkin' : 'Çocuk'}`;
```

## Multi-line Strings
```javascript
// Eski yöntem
const oldMultiline = 'Birinci satır\n' +
                     'İkinci satır\n' +
                     'Üçüncü satır';

// Template literal ile
const multiline = `
  Birinci satır
  İkinci satır
  Üçüncü satır
`;

// HTML oluşturma
const html = `
  <div class="card">
    <h2>${user.name}</h2>
    <p>Yaş: ${user.age}</p>
    <p>Şehir: ${user.city}</p>
  </div>
`;
```

## Expression Kullanımı
```javascript
const a = 5;
const b = 10;

// Matematiksel işlemler
console.log(`${a} + ${b} = ${a + b}`); // "5 + 10 = 15"
console.log(`${a} * ${b} = ${a * b}`); // "5 * 10 = 50"

// Karşılaştırma
console.log(`${a} > ${b}? ${a > b}`); // "5 > 10? false"

// Array/Object method
const names = ['Ali', 'Veli', 'Ayşe'];
console.log(`İsimler: ${names.join(', ')}`); 
// "İsimler: Ali, Veli, Ayşe"

// Nested template literal
const result = `Sonuç: ${a > b ? `${a} büyük` : `${b} büyük`}`;
```

## Tagged Templates (İleri Seviye)
```javascript
// Custom processing
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}

const name = 'Ahmet';
const age = 25;
const tagged = highlight`Adı ${name} ve yaşı ${age}`;
console.log(tagged); 
// "Adı <strong>Ahmet</strong> ve yaşı <strong>25</strong>"

// Localization
function i18n(strings, ...values) {
  // Translation logic
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || '');
  }, '');
}
```

## Pratik Örnekler

### URL Oluşturma
```javascript
const baseURL = 'https://api.example.com';
const endpoint = 'users';
const id = 123;
const params = 'include=posts';

const url = `${baseURL}/${endpoint}/${id}?${params}`;
console.log(url); 
// "https://api.example.com/users/123?include=posts"
```

### SQL Query (Dikkatli kullan!)
```javascript
// ⚠️ Production'da parametrize query kullan
const userId = 5;
const query = `
  SELECT * FROM users 
  WHERE id = ${userId} 
  AND active = true
`;
```

### CSS Styles
```javascript
const theme = {
  primary: '#007bff',
  fontSize: '16px',
  padding: '10px'
};

const styles = `
  .button {
    background-color: ${theme.primary};
    font-size: ${theme.fontSize};
    padding: ${theme.padding};
  }
`;
```

### Conditional Content
```javascript
const user = { name: 'Ali', isAdmin: true };

const message = `
  Hoşgeldin ${user.name}!
  ${user.isAdmin ? 'Admin paneline erişebilirsin.' : ''}
`;
```

## React'te Kullanım
```javascript
// JSX içinde template literals
function UserCard({ name, age, avatar }) {
  return (
    <div className={`user-card ${age >= 18 ? 'adult' : 'child'}`}>
      <img src={`/avatars/${avatar}`} alt={`${name} avatar`} />
      <h2>{`${name}, ${age}`}</h2>
    </div>
  );
}

// CSS modules ile
<div className={`${styles.card} ${isActive ? styles.active : ''}`}>

// Styled components
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  font-size: ${props => props.size || '14px'};
  padding: 10px 20px;
`;
```

## Özel Karakterler
```javascript
// Backtick kullanmak için escape
const text = `Bu bir \` backtick içerir`;

// $ işareti
const money = `Fiyat: \$100`;

// Template literal içinde template literal
const nested = `Dış: ${`İç: ${5 + 5}`}`; // "Dış: İç: 10"
```

## raw Property
```javascript
// Escape sequence'leri işlemeden kullan
const path = String.raw`C:\Users\Documents\file.txt`;
console.log(path); // "C:\Users\Documents\file.txt"

// Normal template literal
const normal = `C:\Users\Documents\file.txt`; // \U, \D hatalı escape
```

## Performance Not
Template literal'ler string concatenation'dan genelde daha hızlıdır ve okunabilirliği artırır. Modern JavaScript'te tercih edilir.
