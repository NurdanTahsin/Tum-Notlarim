# Events (Olaylar)

## Event Listener Ekleme
```javascript
// Modern yöntem (önerilen)
element.addEventListener('click', function() {
  console.log('Tıklandı');
});

// Arrow function ile
element.addEventListener('click', () => {
  console.log('Tıklandı');
});

// Eski yöntem (kullanma)
element.onclick = function() { };
```

## Sık Kullanılan Events

### Mouse Events
```javascript
element.addEventListener('click', e => {}); // Tıklama
element.addEventListener('dblclick', e => {}); // Çift tıklama
element.addEventListener('mouseenter', e => {}); // Mouse üzerine geldi
element.addEventListener('mouseleave', e => {}); // Mouse ayrıldı
element.addEventListener('mousemove', e => {}); // Mouse hareket
```

### Keyboard Events
```javascript
input.addEventListener('keydown', e => {
  console.log(e.key); // Basılan tuş
  if (e.key === 'Enter') {
    // Enter tuşuna basıldı
  }
});

input.addEventListener('keyup', e => {}); // Tuş bırakıldı
```

### Form Events
```javascript
form.addEventListener('submit', e => {
  e.preventDefault(); // Sayfanın yenilenmesini engelle
  // Form işleme
});

input.addEventListener('change', e => {
  console.log(e.target.value);
});

input.addEventListener('input', e => {
  // Her karakter değişiminde
  console.log(e.target.value);
});
```

## Event Object
```javascript
button.addEventListener('click', (event) => {
  console.log(event.target); // Tıklanan element
  console.log(event.type); // 'click'
  console.log(event.clientX, event.clientY); // Mouse pozisyonu
  
  event.preventDefault(); // Varsayılan davranışı engelle
  event.stopPropagation(); // Event bubbling'i durdur
});
```

## Event Delegation
```javascript
// ❌ Her butona ayrı listener (verimsiz)
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// ✅ Parent'a tek listener (verimli)
document.getElementById('container').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    handleClick(e);
  }
});
```

## React'te Events
```javascript
// React'te event isimleri camelCase
function Button() {
  const handleClick = (e) => {
    console.log('Tıklandı');
  };
  
  return (
    <button onClick={handleClick}>Tıkla</button>
    // onChange, onSubmit, onKeyDown, onMouseEnter vb.
  );
}
```

## Event Listener Kaldırma
```javascript
const handler = () => console.log('Tıklandı');

element.addEventListener('click', handler);
element.removeEventListener('click', handler); // Aynı referans gerekli
```
