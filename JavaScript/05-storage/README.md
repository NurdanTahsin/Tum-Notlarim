# Web Storage API

## localStorage vs sessionStorage

| Özellik | localStorage | sessionStorage |
|---------|--------------|----------------|
| Süre | Kalıcı (silinene kadar) | Sekme kapanınca siler |
| Kapsam | Tüm sekmeler/pencereler | Sadece o sekme |
| Boyut | ~5-10MB | ~5-10MB |

## localStorage Kullanımı
```javascript
// Veri kaydetme (sadece string)
localStorage.setItem('kullanici', 'Ahmet');
localStorage.setItem('yas', '25');

// Veri okuma
const kullanici = localStorage.getItem('kullanici');
console.log(kullanici); // "Ahmet"

// Veri silme
localStorage.removeItem('kullanici');

// Tüm verileri silme
localStorage.clear();

// Kaç anahtar var?
console.log(localStorage.length);

// Key'leri dolaşma
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}
```

## Object ve Array Saklama
```javascript
// Object kaydetme - JSON kullan
const user = { 
  name: 'Zeynep', 
  age: 28,
  hobbies: ['kod', 'müzik'] 
};

// Kaydet
localStorage.setItem('user', JSON.stringify(user));

// Oku
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log(savedUser.name); // "Zeynep"
```

## sessionStorage Kullanımı
```javascript
// Aynı API, sadece sekme bazlı
sessionStorage.setItem('temp', 'geçici veri');
const temp = sessionStorage.getItem('temp');
sessionStorage.clear();
```

## Pratik Örnekler

### Tema Ayarı
```javascript
// Tema kaydet
const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  document.body.className = theme;
};

// Tema yükle
const loadTheme = () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.className = theme;
};
```

### Sepet Uygulaması
```javascript
// Sepete ekle
const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Sepeti getir
const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};
```

### Form Verilerini Kaydetme
```javascript
// Otomatik kayıt
input.addEventListener('input', (e) => {
  localStorage.setItem('draft', e.target.value);
});

// Sayfa yüklendiğinde geri getir
window.addEventListener('load', () => {
  const draft = localStorage.getItem('draft');
  if (draft) input.value = draft;
});
```

## React'te Kullanım
```javascript
// Custom hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Kullanımı
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

## Önemli Notlar
⚠️ **Güvenlik**: Hassas bilgileri (şifre, token) localStorage'da tutma!  
⚠️ **Sadece string**: Objeleri JSON.stringify/parse kullan  
⚠️ **Senkron**: Büyük verilerle performans sorunu olabilir  
⚠️ **Domain bazlı**: Farklı domainler birbirinin verisini göremez
