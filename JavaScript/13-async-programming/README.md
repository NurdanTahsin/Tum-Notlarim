# Asynchronous Programming (Asenkron Programlama)

## Senkron vs Asenkron

### Senkron (Synchronous)
Kod satır satır çalışır, bir işlem bitmeden diğeri başlamaz.

```javascript
console.log('1. Başla');
console.log('2. İşlem yap');
console.log('3. Bitir');

// Çıktı sırayla:
// 1. Başla
// 2. İşlem yap
// 3. Bitir
```

**Problem**: Uzun süren işlemler tüm programı bloklar!

```javascript
console.log('Başla');

// 5 saniye bekle (BLOKLAR!)
for (let i = 0; i < 5000000000; i++) {}

console.log('Bitir'); // 5 saniye sonra çalışır
// Kullanıcı 5 saniye beklemek zorunda!
```

### Asenkron (Asynchronous)
Uzun süren işlemler arka planda çalışır, program devam eder.

```javascript
console.log('1. Başla');

setTimeout(() => {
  console.log('2. 2 saniye sonra');
}, 2000);

console.log('3. Hemen devam');

// Çıktı:
// 1. Başla
// 3. Hemen devam
// 2. 2 saniye sonra (2 saniye bekledikten sonra)
```

**Avantaj**: Program donmaz, kullanıcı diğer işlemleri yapabilir!

### JavaScript'te Asenkron İşlemler
```javascript
// Asenkron işlemler:
setTimeout()        // Zamanlayıcı
setInterval()       // Periyodik çalışma
fetch()            // API çağrısı
Promise            // Gelecekteki bir değer
async/await        // Modern asenkron syntax
```

## Eski Yöntemler (Pek Kullanılmaz)

### 1. Callback Functions
Fonksiyonu başka fonksiyona parametre olarak geçirme.

```javascript
// Temel callback
function fetchData(callback) {
  setTimeout(() => {
    callback('Veri geldi');
  }, 1000);
}

fetchData((data) => {
  console.log(data); // "Veri geldi"
});
```

**Problem: Callback Hell**
```javascript
// ❌ Callback hell - Okunması çok zor!
getUser(function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      getAuthor(comments[0].userId, function(author) {
        console.log(author); // 4 seviye içiçe!
      });
    });
  });
});
```

### 2. XMLHttpRequest (AJAX)
Eski tarayıcı API'si - artık kullanılmaz.

```javascript
// ❌ Eski yöntem - kullanma!
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};

xhr.open('GET', 'https://api.example.com/users');
xhr.send();
```

**Neden kullanılmaz?**
- Karmaşık syntax
- Error handling zor
- Modern alternatifler var (Fetch API)

## Promises (Söz Verme) - Orta Seviye

Promise, gelecekte tamamlanacak bir işlemi temsil eder.

### Promise States (Durumlar)
```javascript
// 1. Pending - Bekliyor
// 2. Fulfilled - Başarılı (resolve)
// 3. Rejected - Başarısız (reject)
```

### Promise Oluşturma
```javascript
const myPromise = new Promise((resolve, reject) => {
  // Async işlem
  const success = true;
  
  if (success) {
    resolve('İşlem başarılı!'); // Başarılı sonuç
  } else {
    reject('Hata oluştu!'); // Hata durumu
  }Chaining (Zincirleme)
Callback hell'den kurtulmak için!

// Fulfilled (başarılı)
const fulfilled = Promise.resolve('Başarılı');

// Rejected (hatalı)
const rejected = Promise.reject('Hata');
```

### Promise Chaining
```javascript
fetch('https://api.example.com/user/1')
  .then(response => response.json())
  .then(user => {
    console.log(user);
    return fetch(`https://api.example.com/user/${user.id}/posts`);
  })
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error('Hata:', error))
  .finally(() => console.log('İşlem tamamlandı'));
```

## Async/Await (Modern Yöntem) ⭐

### Temel Kullanım
```javascript
//# Promise.all, allSettled, race, any
```javascript
// Promise.all - Hepsi başarılı olmalı
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);

// Promise.allSettled - Hata olsa da sonuç döner
const results = await Promise.allSettled([
  fetchUser(),
  fetchPosts()
]);

// Promise.race - İlk tamamlanan kazanır
const fastest = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2()
]);

// Promise.any - İlk başarılı sonuç
const first = await Promise.any([
  fetchFromServer1(),

// await kullanmak için async gerekli
async function example() {
  const result = await someAsyncFunction();
  // await sadece asyns() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Fetch hatası:', error);
    throw error;
  }
}

// POST request
async function createUser(userData) {
  try {
    c❌ Sıralı (Yavaş)
```javascript
async function sequential() {
  console.time('sequential');
  
  const user = await fetchUser();     // 1 saniye bekle
  const posts = await fetchPosts();   // 1 saniye daha bekle
  const comments = await fetchComments(); // 1 saniye daha bekle
  
  console.timeEnd('sequential'); // ~3 saniye
  return { user, posts, comments };
}
```

#### ✅ Paralel (Hızlı)
```javascript
async function parallel() {
  console.time('parallel');
  
  // Hepsini aynı anda başlat - Promise.all kullan!
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  
  console.timeEnd('parallel'); // ~1 saniye (en yavaşı kadar)
  return { user, posts, comments };
}
```

**Kural**: Birbirine bağımlı değilse paralel çalıştır!

### Promise Methods ile Async/Await

#}

// Kullanım
const result = await safeFetch('/api/users');
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

#### Multiple Try/Catch
```javascript
async function complexOperation() {
  let user, posts;
  
  t#ry {
    user = await fetchUser();
  } catch (error) {
    console.error('User fetch hatası:', error);
    user = null;
  }
  
  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error('Posts fetch hatası:', error);
    posts = [];
  }
  
  return { user, posts };
}
```

### Sıralı vs Paralel Çağrılar
// #Response kontrolü
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data));
```

### POST Request
```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'Ali',
    email: 'ali@example.com'
  }#)
})
  .then(response => response.json())
  .then(data => console.log(data));
```
# Pratik Patternler

#### Timeout Pattern
```javascript
function timeout(ms) {
  return new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout!')), ms)
  );
}

async function fetchWithTimeout(url, ms = 5000) {
  try {
    const response = await Promise.race([
      fetch(url),
      timeout(ms)
    ]);
    return await response.json();
  } catch (error) {
    console.error('Timeout veya fetch hatası:', error);
    throw error;
  }
}

// Kullanım
const data = await fetchWithTimeout('/api/users', 3000);
```

#### Retry Pattern
```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(`Deneme ${i + 1} başarısız`);
      
      if (i === retries - 1) throw error; // Son deneme
      
      // Üstel geri çekilme (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
}
```

#### Loading State Pattern
```javascript
async function withLoading(asyncFn, setLoading) {
  setLoading(true);
  try {
    const result = await asyncFn();
    return result;
  } finally {
    setLoading(false);
  }
}
```

### Async Loop Operations

#### Sequential Loop
```javascript
// Her item'ı sırayla işle
async function processItemsSequential(items) {
  const results = [];
  
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}
```

#### Parallel Loop
```javascript
// Tüm item'ları paralel işle
async function processItemsParallel(items) {
  return Promise.all(
    items.map(item => processItem(item))
  );
}
```

#### Controlled Concurrency
```javascript
// Aynı anda max N tane işlem
async function processWithLimit(items, limit = 3) {
  const results = [];
  
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    const chunkResults = await Promise.all(
      chunk.map(item => processItem(item))
    );
    results.push(...chunkResults);
  }
  
  return results;
}Async/Await Kullanımı ⭐

### useEffect ile API Çağrısı
#### Paralel (Aynı Anda)
```javascript
async function parallel() {
  console.time('parallel');
  
  // Hepsini aynı anda başlat
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  
  console.timeEnd('parallel'); // ~1 saniye
  return { user, posts, comments };
}
```

## Promise Static Methods

### Promise.all() - Hepsi Başarılı Olmalı
```javascript
async function getAllData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    Event Handler'da Async
```javascript
function UserForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log('Başarılı:', data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Custom Hook ileers, posts, comments };
  } catch (error) {
    // Herhangi biri hata verirse buraya düşer
    console.error('Bir hata oluştu:', error);
  }UserList() {
  const { data, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  
  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Özet: Hangi Yöntemi Kullanmalı?

### ❌ Kullanma:
- **Callback Hell** - Okunması çok zor
- **XMLHttpRequest (AJAX)** - Eski ve karmaşık

### ✅ Kullan:
- **Async/Await** - Modern, okunabilir, en çok kullanılan
- **Fetch API** - HTTP istekleri için
- **Promise.all** - Paralel işlemler için

### React'te:
```javascript
// ✅ En iyi yaklaşım
async function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/users');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
  }, []);
  
  return <div>{data?.map(...)}</div>;
}
```

## Önemli Notlar

⚠️ **await sadece async fonksiyon içinde kullanılır**
⚠️ **Paralel işlemler için Promise.all kullan**
⚠️ **Her zaman try/catch kullan**
⚠️ **Loading ve error state'leri yönet**
✅ **Fetch API > XMLHttpRequest**
✅ **Async/Await > Promise chains**
✅ **Async/Await > Callbacks**   console.log(`${index}: Hata`, result.reason);
    }
  });
}
```

### Promise.race() - İlk Tamamlanan Kazanır
```javascript
async function raceExample() {
  const result = await Promise.race([
    fetch('/api/server1').then(r => r.json()),
    fetch('/api/server2').then(r => r.json())
  ]);
  
  console.log('İlk yanıt:', result);
}

// Timeout pattern
async function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout!')), timeout)
    )
  ]);
}
```

### Promise.any() - İlk Başarılı Sonuç
```javascript
async function anyExample() {
  try {
    const result = await Promise.any([
      fetch('/api/server1').then(r => r.json()),
      fetch('/api/server2').then(r => r.json()),
      fetch('/api/server3').then(r => r.json())
    ]);
    
    console.log('İlk başarılı:', result);
  } catch (error) {
    // Hepsi hata verirse
    console.log('Tümü başarısız');
  }
}
```

## Fetch API (AJAX Yerine)

### GET Request
```javascript
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Fetch hatası:', error);
    throw error;
  }
}
```

### POST Request
```javascript
async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create user hatası:', error);
    throw error;
  }
}

// Kullanım
createUser({ name: 'Ali', email: 'ali@example.com' });
```

### PUT/DELETE
```javascript
async function updateUser(id, userData) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}

async function deleteUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'DELETE'
  });
  return response.ok;
}
```

## Error Handling

### Try/Catch
```javascript
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### Multiple Try/Catch
```javascript
async function complexOperation() {
  let user, posts;
  
  try {
    user = await fetchUser();
  } catch (error) {
    console.error('User fetch hatası:', error);
    user = null;
  }
  
  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error('Posts fetch hatası:', error);
    posts = [];
  }
  
  return { user, posts };
}
```

## React'te Kullanım

### useEffect ile
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [userId]);
  
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  return <div>{user?.name}</div>;
}
```

### Custom Hook
```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Kullanım
function Component() {
  const { data, loading, error } = useFetch('/api/users');
  // ...
}
```

## AJAX (Kısa Bilgi)
XMLHttpRequest - Eski yöntem, artık Fetch API kullanılır.
```javascript
// ❌ Eski yöntem - kullanma
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users');
xhr.onload = () => console.log(xhr.response);
xhr.send();

// ✅ Modern - Fetch kullan
fetch('/api/users').then(r => r.json()).then(console.log);
```
