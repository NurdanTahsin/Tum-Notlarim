# HTML-CSS Notları

## Meta Etiketleri
- `<meta charset="utf-8">`: Türkçe karakter desteği için gerekli
- `<meta name="viewport" content="width=device-width, initial-scale=1">`: Mobil uyumluluk için gerekli
- `<meta name="author" content="...">`: Yazar bilgisi (opsiyonel, SEO etkisi yok)
- `<meta name="keywords" content="...">`: **Artık kullanılmıyor** — Google ve modern arama motorları görmezden geliyor
- `<meta name="description" content="Sayfa özeti...">`: Arama sonuçlarında açıklama olarak görünür

## SEO İçin Önemli HTML Öğeleri
```html
<html lang="tr"> <!-- Dil belirtme -->
<title>Açıklayıcı Sayfa Başlığı</title> <!-- Arama sonuçlarında görünür -->
<meta name="description" content="Sayfa özeti..."> <!-- Arama sonuçlarında açıklama -->
<h1>Ana Başlık</h1> <!-- Sayfa konusunu belirtir -->
<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Mobil uyumluluk -->
```

## SEO Nedir?
**SEO (Search Engine Optimization)** = Arama Motoru Optimizasyonu
- Web sitenizin Google, Bing gibi arama motorlarında üst sıralarda çıkmasını sağlayan teknikler
- İçerik kalitesi, anahtar kelimeler, HTML yapısı, mobil uyumluluk ve sayfa hızı önemli faktörler

## Viewport Nedir?
- Cihaz ekranında bir web sayfasının "görünen alanı"
- Responsive tasarım için gerekli — mobil cihazlarda sayfanın doğru boyutta görünmesini sağlar
- `width=device-width`: Sayfa genişliği = ekran genişliği
- `initial-scale=1`: Başlangıç zoom seviyesi %100

## Emmet Kısayolları
**Emmet:** VS Code'da HTML/CSS yazmayı hızlandıran yerleşik araç
- `!` + `Tab` → HTML5 temel şablon oluşturur (DOCTYPE, html, head, body)


## Paragraf Oluşturucu
- `lorem10` + `Tab` → 10 kelimelik rastgele Lorem Ipsum metni oluşturur
- `lorem` + `Tab` → Varsayılan uzunlukta (yaklaşık 30 kelime) Lorem Ipsum metni

## HTML Form ve Label Kullanımı

### `<form>` Elementi
`<form>` etiketi, kullanıcıdan veri toplamak için kullanılan bir kapsayıcıdır. Form içindeki veriler genellikle bir sunucuya gönderilir.

#### Temel Özellikler
- **`action`**: Verinin gönderileceği URL adresi
- **`method`**: Veri gönderme yöntemi
  - `GET`: Veriler URL'de görünür (varsayılan)
  - `POST`: Veriler gizli şekilde gönderilir (önerilen)
- **`enctype`**: Dosya yüklemelerinde kullanılır

```html
<form action="/submit" method="POST">
    <!-- Form elemanları buraya gelir -->
</form>
```

### `<label>` Elementi
`<label>` etiketi, form elemanları için açıklayıcı metin sağlar.

#### Avantajları
1. **Erişilebilirlik**: Ekran okuyucular label'ları okur
2. **Kullanılabilirlik**: Label'a tıklandığında ilgili input aktif olur
3. **SEO**: Arama motorları için form alanlarını tanımlar
4. **Kullanıcı Deneyimi**: Özellikle mobilde tıklama alanını genişletir

#### İki Kullanım Yöntemi

**1. `for` Attribute ile (ÖNERİLEN ✅)**
```html
<label for="name">Name:</label>
<input type="text" id="name" name="name">
```

**Avantajları:**
- Daha temiz ve okunabilir kod
- Esnek yerleşim
- CSS ile stillendirmesi kolay
- Endüstri standardı

**2. Input'u İçine Alarak**
```html
<label>
    Email:
    <input type="email" name="email">
</label>
```

### En İyi Uygulamalar (Best Practices)

#### ✅ Doğru Kullanım
```html
<form action="/submit" method="POST">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
    <br><br>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br><br>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br><br>
    
    <button type="submit">Submit</button>
</form>
```

#### Önemli Kurallar
1. **`id` ve `for` aynı olmalı**: Label ile input'u ilişkilendirir
2. **`name` attribute ekle**: Form gönderiminde gerekli
3. **`required` kullan**: Zorunlu alanları belirt
4. **Anlamlı etiketler**: Kullanıcı dostu açıklamalar


## `id` ve `name` Attribute'ları Arasındaki Fark

#### `id` Attribute
- **Amaç**: Frontend için kullanılır (JavaScript/CSS)
- **Kullanım Alanları**:
  - CSS ile stil vermek
  - JavaScript ile elementi seçmek
  - `<label for="...">` ile ilişkilendirme

#### `name` Attribute
- **Amaç**: Backend için kullanılır
- **Kullanım Alanları**:
  - Form submit edildiğinde sunucuya gönderilen veri anahtarı
  - Sunucu tarafında bu isimle veriye erişilir

#### Önemli Not
İki attribute **farklı amaçlara** hizmet eder, ancak genellikle **aynı isim** verilir.

```html
<!-- Aynı isim (yaygın kullanım) -->
<label for="email">Email:</label>
<input type="text" id="email" name="email">

<!-- Farklı isimler (geçerli ama nadir) -->
<label for="emailInput">Email:</label>
<input type="text" id="emailInput" name="user_email">
```

## Semantic HTML

### Semantic Etiketlerin Faydaları

**Semantic HTML**, içeriğin anlamını belirten HTML etiketleridir (`<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`).

#### 1. **SEO (Arama Motoru Optimizasyonu)**
- Arama motorları (Google, Bing) içeriği daha iyi anlar ve indeksler
- Sayfanın yapısını ve önemli bölümleri kolayca tanır
- Arama sonuçlarında daha üst sıralarda çıkma şansı artar

#### 2. **Erişilebilirlik (Accessibility)**
- Ekran okuyucular sayfayı daha iyi yorumlar
- Görme engelli kullanıcılar için navigasyon kolaylaşır
- ARIA etiketlerine daha az ihtiyaç duyulur
- Engelli kullanıcı deneyimi iyileşir

#### 3. **Kod Okunabilirliği ve Bakım**
- Kodun ne yaptığı daha anlaşılır
- Takım çalışmasında iletişim kolaylaşır
- Bakım ve güncelleme daha kolay
- Yeni geliştirici projeyi daha hızlı anlar

#### 4. **Gelecek Uyumluluk**
- Web standartlarına uygun
- Yeni teknolojiler ile daha iyi entegrasyon
- Tarayıcılar tarafından daha iyi desteklenir

### Semantic vs Non-Semantic

```html
<!-- ❌ Non-Semantic (div ile) -->
<div class="header">
    <div class="nav">
        <a href="#">Ana Sayfa</a>
    </div>
</div>
<div class="content">
    <div class="article">İçerik...</div>
</div>
<div class="footer">Copyright</div>

<!-- ✅ Semantic (anlamlı etiketler) -->
<header>
    <nav>
        <a href="#">Ana Sayfa</a>
    </nav>
</header>
<main>
    <article>İçerik...</article>
</main>
<footer>Copyright</footer>
```

### Temel Semantic Etiketler

| Etiket | Açıklama |
|--------|----------|
| `<header>` | Sayfa veya bölüm başlığı |
| `<nav>` | Navigasyon linkleri |
| `<main>` | Ana içerik (sayfada bir kez kullanılır) |
| `<section>` | Tematik içerik bölümü |
| `<article>` | Bağımsız, tekrar kullanılabilir içerik |
| `<aside>` | Yan içerik (sidebar) |
| `<footer>` | Sayfa veya bölüm altbilgisi |
| `<figure>` | Görsel içerik (resim, grafik) |
| `<figcaption>` | Görsel açıklaması |


### En İyi Uygulamalar

1. **Her zaman semantic etiket kullanın** (`<div>` yerine)
2. **`<main>` sadece bir kez kullanılır** (ana içerik için)
3. **Başlık hiyerarşisine dikkat edin** (`<h1>` → `<h6>`)
4. **`<article>` bağımsız olmalı** (RSS feed'de yayınlanabilir içerik)
5. **`<section>` tematik gruplar için** (bir konuya ait içerikler)

### Sonuç
Semantic HTML ve `<div>` görsel olarak aynı çalışır, ancak semantic HTML **daha profesyonel, erişilebilir ve sürdürülebilir** kod sağlar. Modern web geliştirmede tercih edilmelidir.


