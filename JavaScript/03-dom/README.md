# DOM Manipülasyonu

> **Not**: React/React Native'de sanal DOM kullanıldığı için direkt DOM manipülasyonu nadirdir. Ama temel kavramları bilmek önemli.

## Element Seçimi
```javascript
// ID ile
const element = document.getElementById('myId');

// Class ile
const elements = document.getElementsByClassName('myClass');
const elementsQuery = document.querySelectorAll('.myClass');

// Tag ile
const divs = document.getElementsByTagName('div');

// Query Selector (en kullanışlı)
const first = document.querySelector('.class'); // İlk eşleşen
const all = document.querySelectorAll('.class'); // Tüm eşleşenler
```

## İçerik Değiştirme
```javascript
// Text içeriği
element.textContent = "Yeni metin";
element.innerText = "Görünen metin";

// HTML içeriği
element.innerHTML = "<strong>Kalın metin</strong>";
```

## Attribute ve Style
```javascript
// Attribute
element.setAttribute('data-id', '123');
const value = element.getAttribute('data-id');

// Class işlemleri
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('dark-mode');

// Style
element.style.color = 'red';
element.style.backgroundColor = 'blue';
```

## Element Oluşturma/Silme
```javascript
// Oluşturma
const yeniDiv = document.createElement('div');
yeniDiv.textContent = "Yeni element";
document.body.appendChild(yeniDiv);

// Silme
element.remove();
// veya
parent.removeChild(element);
```

## React ile Karşılaştırma
```javascript
// Vanilla JS
document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('text').textContent = "Tıklandı";
});

// React
function Component() {
  const [text, setText] = useState("İlk metin");
  return <button onClick={() => setText("Tıklandı")}>{text}</button>;
}
```

**React'te**: DOM'u doğrudan manipüle etmek yerine state kullanılır. React sanal DOM'u günceller, gerçek DOM'a yansıtır.
