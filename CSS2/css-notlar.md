# CSS Notları

## CSS Specificity (Öncelik Kuralları)

CSS'de hangi stilin uygulanacağını belirleyen **specificity** sistemi vardır. Kod sırası sadece eşit öncelikte kurallar için geçerlidir.

### Specificity Hesaplama

Her CSS seçicisinin bir öncelik değeri vardır:

| Seçici Türü | Değer | Örnek |
|------------|-------|-------|
| Inline Style | 1-0-0-0 | `<div style="color: red">` |
| ID | 0-1-0-0 | `#logo` |
| Class, Attribute, Pseudo-class | 0-0-1-0 | `.info`, `[type="text"]`, `:hover` |
| Element, Pseudo-element | 0-0-0-1 | `div`, `p`, `::before` |

### Örnek Karşılaştırmalar

```css
/* Specificity: 0-0-0-1 (1 element) */
span {
    color: red;
}

/* Specificity: 0-0-1-0 (1 class) */
.primary {
    color: blue;
}

/* Specificity: 0-0-1-1 (1 class + 1 element) */
.info span {
    color: red;
}

/* Specificity: 0-0-2-0 (2 class) */
.info .primary {
    color: blue;
}

/* Specificity: 0-1-0-0 (1 id) */
#para1 {
    color: green;
}

/* Specificity: 0-1-1-0 (1 id + 1 class) - EN YÜKSEK */
#para1.lead {
    color: purple;
}
```
**Basamak gibi düşün:**

0-1-0-0 > 0-0-99-99
         
### Pratik Örnek

```html
<p class="info">
    Lorem ipsum <span class="primary">dolor</span>
</p>
```

```css
.info span {
    color: red;    /* 0-0-1-1 */
}

.info .primary {
    color: blue;   /* 0-0-2-0 - KAZANAN! */
}
```

**Sonuç:** `span` elementi **mavi** olur çünkü `.info .primary` daha spesifiktir.

### Önemli Kurallar

1. **Daha yüksek specificity her zaman kazanır**
2. Eşit specificity'de **son yazılan kural** kazanır
3. `!important` tüm kuralları ezer (kullanımı önerilmez)
4. Araya boşluk konulduğunda "içindeki" anlamına gelir (direkt **çocuk olmak zorunda değil**).



## Bazı Emmet Kısayolları

Visual Studio Code'da HTML ve CSS yazmayı hızlandıran **Emmet** kısayolları kullanabilirsiniz.

### Element + Class

```html
div.box-1
```
**Enter'a basınca:**
```html
<div class="box-1"></div>
```

### Element + ID

```html
div#box-1
```
**Enter'a basınca:**
```html
<div id="box-1"></div>
```

### Element + Birden Fazla Class

```html
div.box-1.active.primary
```
**Enter'a basınca:**
```html
<div class="box-1 active primary"></div>
```

### Class + ID Birlikte

```html
div#main.container
```
**Enter'a basınca:**
```html
<div id="main" class="container"></div>
```

### Element Belirtmeden (varsayılan `div`)

```html
.box-1
```
**Enter'a basınca:**
```html
<div class="box-1"></div>
```

### Diğer Elementlerle

```html
button.btn-primary
span.highlight
p#intro.lead
```
**Enter'a basınca:**
```html
<button class="btn-primary"></button>
<span class="highlight"></span>
<p id="intro" class="lead"></p>
```

### Çoklu Element Oluşturma

```html
div.box-1*3
```
**Enter'a basınca:**
```html
<div class="box-1"></div>
<div class="box-1"></div>
<div class="box-1"></div>
```

**Not:** Emmet kısayolları hem HTML hem de CSS dosyalarında çalışır.

<br>
<br>

## CSS Pseudo-Class'lar

Pseudo-class'lar, bir öğenin **özel bir durumda olduğunu** belirtmek için kullanılır. Sadece tıklanabilir öğeler için değil, çok çeşitli durumlar ve öğe tipleri için kullanılabilir.

### Söz Dizimi

```css
seçici:pseudo-class {
    özellik: değer;
}
```

### Etkileşim Durumları (User Action)

Bu pseudo-class'lar kullanıcı etkileşimlerini yakalar:

```css
/* Fare üzerine geldiğinde */
a:hover {
    color: red;
}

/* Tıklanma anında */
button:active {
    background-color: blue;
}

/* Odaklandığında (klavye veya fare ile) */
input:focus {
    border: 2px solid green;
}

/* Ziyaret edilmiş link */
a:visited {
    color: purple;
}
```

### Yapısal Pseudo-Class'lar

Öğenin HTML yapısındaki konumuna göre seçim yapar:

```css
/* İlk çocuk öğe */
p:first-child {
    font-weight: bold;
}

/* Son çocuk öğe */
li:last-child {
    border-bottom: none;
}

/* N'inci çocuk öğe */
tr:nth-child(odd) {
    background-color: #f2f2f2;
}

tr:nth-child(even) {
    background-color: white;
}

/* Belirli sırada */
li:nth-child(3) {
    color: red;
}

/* İçi boş öğeler */
div:empty {
    display: none;
}

/* Tek çocuk olan öğeler */
p:only-child {
    text-align: center;
}
```

### Form Durumları

Form elemanlarının durumlarını hedefler:

```css
/* Devre dışı input */
input:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Aktif input */
input:enabled {
    background-color: white;
}

/* İşaretli checkbox/radio */
input:checked {
    accent-color: green;
}

/* Zorunlu alanlar */
input:required {
    border-left: 3px solid red;
}

/* İsteğe bağlı alanlar */
input:optional {
    border-left: 3px solid gray;
}

/* Geçerli veri */
input:valid {
    border-color: green;
}

/* Geçersiz veri */
input:invalid {
    border-color: red;
}

/* Placeholder görünürken */
input:placeholder-shown {
    font-style: italic;
}
```

### Mantıksal Pseudo-Class'lar

```css
/* Belirtilen öğe HARİÇ herkes */
p:not(.highlight) {
    color: gray;
}

/* Kök öğe (genelde <html>) */
:root {
    --main-color: blue;
}

/* URL hash'ine eşleşen öğe */
:target {
    background-color: yellow;
}
```

### Link Durumları

Linkler için özel pseudo-class sırası:

```css
/* LVHA - LoVe HAte (sıra önemli!) */

/* 1. Ziyaret edilmemiş */
a:link {
    color: blue;
}

/* 2. Ziyaret edilmiş */
a:visited {
    color: purple;
}

/* 3. Hover durumu */
a:hover {
    color: red;
}

/* 4. Aktif (tıklanma anı) */
a:active {
    color: orange;
}
```

### Pratik Örnekler

**Zebra striping (Tablo satırları):**

```css
tr:nth-child(odd) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #e0e0e0;
}
```

**Form validasyonu:**

```css
input:invalid:focus {
    border: 2px solid red;
    outline: none;
}

input:valid:focus {
    border: 2px solid green;
    outline: none;
}
```

**Liste stili:**

```css
li:first-child {
    font-weight: bold;
}

li:last-child {
    border-bottom: none;
}

li:hover {
    background-color: #f0f0f0;
}
```

### Önemli Notlar

1. **Tıklanabilir olmayan öğeler de kullanabilir**: `p:first-child`, `div:empty`, `span:hover`
2. **Specificity**: Pseudo-class'lar class seçicisi kadar önceliğe sahiptir (0-0-1-0)
3. **Birden fazla kullanılabilir**: `input:required:invalid:focus`
4. **Tarayıcı desteği**: Eski tarayıcılarda bazı pseudo-class'lar çalışmayabilir

<br>
<br>

## CSS Position Özellikleri

Position özelliği, bir elementin **nasıl konumlandırılacağını** belirler. Farklı position değerleri, elementlerin sayfa akışındaki davranışlarını tamamen değiştirir.

### Position Değerleri

```css
position: static;    /* Varsayılan - Normal akış */
position: relative;  /* Kendi konumuna göre hareket */
position: absolute;  /* Parent'a göre konumlanır */
position: fixed;     /* Viewport'a göre sabit */
position: sticky;    /* Hybrid - scroll'da sabitlenir */
```

---

## 1. `position: static` (Varsayılan)

Elementlerin **normal akışta** olduğu durumdur. `top`, `right`, `bottom`, `left` ve `z-index` özellikleri **çalışmaz**.

```css
div {
    position: static; /* Varsayılan değer */
}
```

**Özellikler:**
- ✅ Normal HTML akışında sırayla dizilir
- ❌ Konumlandırma özellikleri (top, left, vb.) çalışmaz
- ✅ Diğer elementlerle etkileşim halinde

---

## 2. `position: relative`

Element **kendi orijinal konumuna göre** hareket eder. Önemli: **Tarayıcı elementi hala eski yerinde görür!**

```css
.box {
    position: relative;
    top: 20px;    /* Yukarıdan 20px aşağı */
    left: 30px;   /* Soldan 30px sağa */
    z-index: 1;   /* Üst üste binmelerde öncelik */
}
```

### Davranış Özellikleri

```html
<span style="position: relative; left: 75px;">SPAN</span>
Lorem ipsum dolor sit amet.
```

**Sonuç:** 
- Span görsel olarak 75px sağa kayar
- Ama yazı (Lorem ipsum) spanin **eski konumundan** başlar
- Tarayıcı spani "hayali olarak" eski yerinde görür

### Kullanım Alanları

✅ **Ne zaman kullanılır:**
- Badge'leri hafifçe yukarı/aşağı kaydırmak
- İkonları metinle hizalamak
- **İçindeki `absolute` elementler için referans noktası oluşturmak** (En yaygın!)
- Hover efektlerinde hafif hareket

**Örnek: Referans Noktası**

```css
.card {
    position: relative; /* Parent */
    width: 300px;
    height: 200px;
}

.badge {
    position: absolute; /* Child */
    top: 10px;
    right: 10px;
    /* card'a göre konumlanır */
}
```

**Örnek: Hafif Ayarlama**

```css
.icon {
    position: relative;
    top: 2px; /* İkonu metinle hizala */
}

button:hover {
    position: relative;
    top: -2px; /* Hover'da yukarı kalk */
}
```

### Önemli Notlar

- 🔴 **Eski yerinde hayali boşluk bırakır**
- ✅ Diğer elementlerin yerini etkilemez
- ✅ `z-index` çalışır
- ✅ `top`, `right`, `bottom`, `left` kullanılabilir

---

### 🎯 Gerçek Hayat Örnekleri: Relative Nerede İşe Yarar?

Sizin örneğinizdeki gibi **span hareket eder ama paragraf etkilenmez** durumu aslında çok pratiktir!

#### 1️⃣ **Notification Badge (Bildirim Sayısı)**

```html
<button>
    Mesajlar
    <span class="badge">5</span>
</button>
```

```css
.badge {
    position: relative;
    top: -10px;      /* Badge'i yukarı kaldır */
    left: -5px;      /* Hafif sola çek */
    background: red;
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 12px;
}
```

**Sonuç:** 
- Badge yukarı kalkar ama buton genişliği değişmez
- "Mesajlar" yazısı normal yerinde kalır
- Badge'in hayali yeri korunduğu için buton düzeni bozulmaz

---

#### 2️⃣ **İkon Hizalama (Çok yaygın!)**

```html
<p>
    <i class="icon">📧</i> Email gönderildi
</p>
```

```css
.icon {
    position: relative;
    top: 2px;  /* İkonu 2px aşağı kaydır - metinle aynı hizada */
}
```

**Neden İşe Yarar:**
- İkon görsel olarak metinle hizalanır
- Ama paragrafın satır yüksekliği değişmez
- Yan taraftaki "Email gönderildi" yazısı normal akışını sürdürür

---

#### 3️⃣ **Hover Efekti (Sayfa Düzenini Bozmadan)**

```html
<ul class="menu">
    <li>Anasayfa</li>
    <li>Hakkımızda</li>
    <li>İletişim</li>
</ul>
```

```css
.menu li {
    display: inline-block;
    padding: 10px 20px;
    transition: all 0.3s;
}

.menu li:hover {
    position: relative;
    top: -3px;  /* Hover'da yukarı kalk */
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}
```

**Sonuç:**
- Mouse üzerine gelince li yukarı kalkar
- Ama diğer menü öğeleri yer değiştirmez
- Sayfa düzeni sağlam kalır (titremiş görünmez)

---

#### 4️⃣ **Yıldız Rating Sistemi**

```html
<div class="rating">
    <span class="star filled">★</span>
    <span class="star filled">★</span>
    <span class="star half">★</span>
    <span class="star">★</span>
    <span class="star">★</span>
    <span class="count">(4.5)</span>
</div>
```

```css
.star {
    color: gold;
    font-size: 20px;
}

.star.half {
    position: relative;
    left: -3px;  /* Yarım yıldız hafif içeri */
}

.count {
    position: relative;
    top: -2px;   /* Sayıyı yıldızlarla hizala */
    color: gray;
    font-size: 14px;
}
```

**Neden Önemli:**
- Yarım yıldız ve sayı hizalanır
- Ama rating div'inin genişliği değişmez
- Yan taraftaki elementler etkilenmez

---

#### 5️⃣ **Süsleyici Eleman (Decorative)**

```html
<h2 class="title">
    Özel Teklifler
</h2>
```

```css
.title::before {
    content: "🔥";
    position: relative;
    top: 3px;      /* Emoji'yi başlıkla hizala */
    margin-right: 8px;
}
```

**Sonuç:**
- Emoji hizalanır ama başlık normal yerinde
- Başlığın satır yüksekliği artmaz

---

#### 6️⃣ **Input İçinde İkon**

```html
<div class="search-box">
    <i class="search-icon">🔍</i>
    <input type="text" placeholder="Ara...">
</div>
```

```css
.search-box {
    position: relative;
}

.search-icon {
    position: absolute;  /* Bu sefer absolute! */
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

input {
    padding-left: 35px;  /* İkona yer aç */
}
```

**Not:** Burada search-box'a `relative` verip icon'a `absolute` verdik. Bu da çok yaygın bir pattern!

---

#### 7️⃣ **Fiyat Etiketi Üstü Çizili**

```html
<div class="price">
    <span class="old-price">₺150</span>
    <span class="new-price">₺99</span>
</div>
```

```css
.old-price {
    text-decoration: line-through;
    color: gray;
    position: relative;
    top: -5px;  /* Eski fiyatı hafif yukarı kaldır */
    font-size: 14px;
}

.new-price {
    color: red;
    font-weight: bold;
    font-size: 24px;
}
```

---

### 💡 Özet: Neden "Hayali Boşluk" İyi?

**Sorun değil, özellik!** 

```
❌ Absolute kullansan → Diğer elementler üst üste biner
✅ Relative kullansan → Sadece görsel ayar, düzen bozulmaz
```

**Temel Mantık:**
- Element **görsel olarak** hareket eder
- Ama sayfa düzeni (layout) **etkilenmez**
- Diğer elementler elementi **eski yerinde görür**

Bu sayede:
- ✅ Hover efektleri sayfa düzenini bozmaz
- ✅ İkonları hizalarsın ama satır yüksekliği artmaz
- ✅ Badge'leri kaydırırsın ama buton boyutu değişmez
- ✅ Sayfa "titremiş" görünmez

---

## 3. `position: absolute`

Element **normal akıştan tamamen çıkar** ve en yakın **"position özelliği olan"** parent'a göre konumlanır.

```css
.parent {
    position: relative; /* Referans noktası */
    width: 200px;
    height: 200px;
}

.child {
    position: absolute;
    bottom: 10px;  /* Parent'ın altından 10px yukarı */
    right: 10px;   /* Parent'ın sağından 10px sola */
}
```

### Nasıl Çalışır?

**Referans Noktası Arama:**
1. En yakın parent'a bakar → `position: static` dışında bir değer var mı?
2. Varsa → O parent'a göre konumlanır
3. Yoksa → Bir üst parent'a bakar
4. Hiçbirinde yoksa → `<body>` veya `<html>`'e göre konumlanır

```css
/* ❌ Yanlış - absolute body'e göre konumlanır */
<div>                          /* position: static */
    <div class="absolute">     /* Nereye bağlanacak? body'e! */
    </div>
</div>

/* ✅ Doğru - absolute parent'a göre konumlanır */
<div style="position: relative;">  /* Referans noktası */
    <div class="absolute">         /* Parent'a bağlanır */
    </div>
</div>
```

### Kullanım Alanları

✅ **Ne zaman kullanılır:**
- Dropdown menüler
- Tooltip'ler
- Modal kapatma butonu (X)
- Notification badge'leri
- Resim üzerine overlay
- Card üzerine "YENİ" badge'i

**Örnek: Resim Badge**

```html
<div class="product-card">
    <img src="product.jpg">
    <span class="badge">YENİ</span>
</div>
```

```css
.product-card {
    position: relative;
    width: 300px;
}

.badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}
```

**Örnek: Modal Kapatma Butonu**

```css
.modal {
    position: fixed; /* veya relative */
    width: 500px;
    height: 300px;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}
```

**Örnek: Dropdown Menü**

```css
.menu-item {
    position: relative;
}

.dropdown {
    position: absolute;
    top: 100%; /* Parent'ın hemen altı */
    left: 0;
    display: none;
}

.menu-item:hover .dropdown {
    display: block;
}
```

### Önemli Notlar

- 🔴 **Normal akıştan tamamen çıkar** (hayali boşluk bile bırakmaz)
- 🔴 Diğer elementler onu yokmuş gibi görür
- ✅ `z-index` çalışır
- ✅ Parent'ın `position` değeri `static` dışında olmalı
- ⚠️ Parent'ı olmayan absolute elementler body'e göre konumlanır

---

## 4. `position: fixed`

Element **viewport'a (tarayıcı penceresine) göre** sabitlenir. Sayfa scroll edilse bile **hep aynı yerde** kalır.

```css
.fixed-navbar {
    position: fixed;
    top: 0;        /* En üstte */
    left: 0;
    right: 0;      /* Sağdan sola tüm genişlik */
    background: black;
    color: white;
    z-index: 1000; /* En önde görünsün */
}
```

### Kullanım Alanları

✅ **Ne zaman kullanılır:**
- Sticky navigation bar (üstte sabit menü)
- "Yukarı çık" butonu (sağ alt köşe)
- Chat widget (sağ alt)
- Cookie bildirimi (alt veya üst)
- Floating action button

**Örnek: Sticky Header**

```css
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 999;
}

/* Body'ye padding ekle ki içerik header'ın altında kalmasın */
body {
    padding-top: 60px;
}
```

**Örnek: "Yukarı Çık" Butonu**

```css
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: blue;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
}
```

**Örnek: Cookie Banner**

```css
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: rgba(0,0,0,0.9);
    color: white;
    text-align: center;
    z-index: 9999;
}
```

### Önemli Notlar

- 🔴 **Viewport'a göre konumlanır** (parent'tan bağımsız)
- 🔴 Scroll yapılsa bile yerinde kalır
- 🔴 Normal akıştan çıkar
- ✅ `z-index` çalışır
- ⚠️ Mobilde dikkatli kullanın (ekran küçük)

---

## 5. `position: sticky`

**Hybrid** bir position değeri. Önce **normal akışta** durur, scroll edildiğinde **belirli bir noktada sabitlenir**.

```css
.sticky-header {
    position: sticky;
    top: 0; /* Üstte 0px kalınca yapış */
    background: white;
    z-index: 10;
}
```

### Nasıl Çalışır?

1. Element başlangıçta **normal akışta** (relative gibi)
2. Scroll edildiğinde belirlenen noktaya gelince **fixed gibi yapışır**
3. Parent container'ın sonuna gelince **yapışma biter**

### Kullanım Alanları

✅ **Ne zaman kullanılır:**
- Tablo başlıkları (scroll'da başlık görünsün)
- Sidebar navigasyon
- Section başlıkları
- Sticky CTA button

**Örnek: Tablo Başlığı**

```css
table {
    width: 100%;
}

thead th {
    position: sticky;
    top: 0;
    background: #333;
    color: white;
    z-index: 10;
}
```

**Örnek: Sticky Section Başlıkları**

```css
.section-title {
    position: sticky;
    top: 60px; /* Header'dan 60px aşağıda yapış */
    background: white;
    padding: 10px 0;
    border-bottom: 2px solid #ddd;
}
```

**Örnek: Sticky Sidebar**

```css
.sidebar {
    position: sticky;
    top: 20px; /* Üstten 20px boşlukta yapış */
    height: fit-content;
}
```

### Önemli Notlar

- ✅ **Normal akışta yer kaplar** (relative gibi)
- ✅ Scroll'da sabitlenir (fixed gibi)
- ⚠️ `top`, `bottom`, `left`, `right`'tan **en az biri** belirtilmeli
- ⚠️ Parent container'ın `overflow` değeri `visible` olmalı
- ⚠️ Parent'ın yüksekliği sticky element'ten büyük olmalı

---

## Position Özet Tablosu

| Position | Akışta? | Konumlandırma | Scroll'da | Kullanım |
|----------|---------|---------------|-----------|----------|
| `static` | ✅ Evet | - | Normal | Varsayılan |
| `relative` | ✅ Evet | Kendi konumuna göre | Normal | Hafif ayar, absolute referansı |
| `absolute` | ❌ Hayır | Parent'a göre | Scroll olur | Dropdown, tooltip, badge |
| `fixed` | ❌ Hayır | Viewport'a göre | Sabit kalır | Navbar, "yukarı çık" btn |
| `sticky` | ✅ Evet | Hybrid | Yapışır | Tablo başlığı, sidebar |

---

## Z-Index Nedir?

`z-index`, elementlerin **üst üste bindiğinde** hangi sırada görüneceğini belirler (z-ekseni = derinlik).

```css
.red {
    position: relative;
    z-index: 1; /* Önde */
}

.blue {
    position: relative;
    z-index: 0; /* Arkada (varsayılan) */
}
```

### Önemli Kurallar

1. **Sadece positioned elementlerde çalışır** (`static` hariç)
2. Büyük değer = Daha önde
3. Negatif değer = Arkada (`z-index: -1`)
4. Parent'ın z-index'i child'ı etkiler (stacking context)

## Responsive Units (Duyarlı Birimler)

Responsive units, farklı ekran boyutlarına ve cihazlara göre esnek bir şekilde ölçeklendirilebilen CSS ölçü birimleridir.

### Ana Responsive Birimler

- **`%` (yüzde)** - Üst elementin boyutuna göre yüzdesel değer
- **`em`** - Mevcut elementin font boyutuna göre
- **`rem`** - Kök elementin (root/html) font boyutuna göre
- **`vw`** - Viewport genişliğinin yüzdesi (1vw = ekran genişliğinin %1'i)
- **`vh`** - Viewport yüksekliğinin yüzdesi (1vh = ekran yüksekliğinin %1'i)
- **`vmin`** - Viewport'un küçük boyutunun yüzdesi
- **`vmax`** - Viewport'un büyük boyutunun yüzdesi

### Sabit Birimler (Responsive Değil)

- `px` (piksel) - Ekran boyutuna göre değişmez

Responsive tasarımda `px` yerine bu esnek birimleri kullanmak, web sitenizin farklı cihazlarda daha iyi görünmesini sağlar.
