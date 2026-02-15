// ========== Async Programming Örnekleri ==========

// ========== PROMISES ==========

// 1. Temel Promise
const simplePromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  
  setTimeout(() => {
    if (success) {
      resolve('İşlem başarılı! 🎉');
    } else {
      reject('İşlem başarısız! ❌');
    }
  }, 1000);
});

simplePromise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// 2. Promise Chaining
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Ahmet', postCount: 10 });
    }, 500);
  });
}

function fetchPosts(count) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `Post ${i + 1}`
      }));
      resolve(posts);
    }, 500);
  });
}

// Chain kullanımı
fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return fetchPosts(user.postCount);
  })
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => console.error(error))
  .finally(() => console.log('İşlem tamamlandı'));

// ========== ASYNC/AWAIT ==========

// 3. Temel async/await
async function getUserData() {
  try {
    const user = await fetchUser(1);
    console.log('Kullanıcı:', user);
    
    const posts = await fetchPosts(user.postCount);
    console.log('Postlar:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('Hata:', error);
  }
}

// 4. Gerçek API çağrısı
async function fetchGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return {
      name: data.name,
      bio: data.bio,
      repos: data.public_repos,
      followers: data.followers
    };
  } catch (error) {
    console.error('GitHub API hatası:', error);
    throw error;
  }
}

// Kullanım
// fetchGitHubUser('torvalds').then(console.log);

// 5. Multiple API calls - Sequential (Sıralı)
async function sequentialCalls() {
  console.time('sequential');
  
  const user1 = await fetchUser(1); // 500ms
  const user2 = await fetchUser(2); // 500ms
  const user3 = await fetchUser(3); // 500ms
  
  console.timeEnd('sequential'); // ~1500ms
  return [user1, user2, user3];
}

// 6. Multiple API calls - Parallel (Paralel)
async function parallelCalls() {
  console.time('parallel');
  
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  
  console.timeEnd('parallel'); // ~500ms
  return [user1, user2, user3];
}

// Test
// sequentialCalls();
// parallelCalls();

// 7. Promise.all - Hepsi başarılı olmalı
async function getAllData() {
  try {
    const results = await Promise.all([
      fetchUser(1),
      fetchUser(2),
      fetchPosts(5)
    ]);
    
    console.log('Tüm veriler:', results);
    return results;
  } catch (error) {
    // Herhangi biri başarısız olursa
    console.error('Promise.all hatası:', error);
  }
}

// 8. Promise.allSettled - Hata olsa da devam et
async function getAllDataWithErrors() {
  const results = await Promise.allSettled([
    fetchUser(1),
    Promise.reject('Hata 1'),
    fetchPosts(3),
    Promise.reject('Hata 2')
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`${index}: ✅`, result.value);
    } else {
      console.log(`${index}: ❌`, result.reason);
    }
  });
}

// 9. Promise.race - İlk tamamlanan
async function raceExample() {
  const fast = new Promise(resolve => setTimeout(() => resolve('Hızlı'), 100));
  const slow = new Promise(resolve => setTimeout(() => resolve('Yavaş'), 1000));
  
  const winner = await Promise.race([fast, slow]);
  console.log('Kazanan:', winner); // "Hızlı"
}

// 10. Timeout Pattern
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

// 11. Retry Pattern
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(`Deneme ${i + 1} başarısız`);
      if (i === retries - 1) throw error;
      
      // Üstel geri çekilme
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// 12. CRUD API Wrapper
class UserAPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getAll() {
    const response = await fetch(`${this.baseURL}/users`);
    return response.json();
  }

  async getById(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`User ${id} bulunamadı`);
    }
    return response.json();
  }

  async create(userData) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async update(id, userData) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async delete(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  }
}

// Kullanım
const api = new UserAPI('https://jsonplaceholder.typicode.com');
// api.getById(1).then(console.log);

// 13. Loading State Wrapper
async function withLoading(asyncFn, loadingCallback) {
  loadingCallback(true);
  try {
    const result = await asyncFn();
    return result;
  } finally {
    loadingCallback(false);
  }
}

// Kullanım
// withLoading(
//   () => fetchUser(1),
//   (loading) => console.log('Loading:', loading)
// );

// 14. Cache Pattern
class CachedAPI {
  constructor() {
    this.cache = new Map();
    this.cacheTime = 60000; // 1 dakika
  }

  async fetch(url) {
    const cached = this.cache.get(url);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTime) {
      console.log('📦 Cache hit:', url);
      return cached.data;
    }
    
    console.log('🌐 Fetching:', url);
    const response = await fetch(url);
    const data = await response.json();
    
    this.cache.set(url, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }

  clearCache() {
    this.cache.clear();
  }
}

const cachedAPI = new CachedAPI();
// cachedAPI.fetch('https://api.github.com/users/torvalds');

// 15. Async Array Operations
async function processItems(items, asyncFn) {
  const results = [];
  
  for (const item of items) {
    const result = await asyncFn(item);
    results.push(result);
  }
  
  return results;
}

// Paralel versiyonu
async function processItemsParallel(items, asyncFn) {
  return Promise.all(items.map(item => asyncFn(item)));
}

// 16. Debounced Async (Arama için)
function debounce(asyncFn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await asyncFn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

// Kullanım
const debouncedSearch = debounce(async (query) => {
  const response = await fetch(`/api/search?q=${query}`);
  return response.json();
}, 300);

// 17. React-like useFetch simulation
function createFetchHook() {
  let state = {
    data: null,
    loading: false,
    error: null
  };
  
  return async function useFetch(url) {
    state.loading = true;
    state.error = null;
    
    try {
      const response = await fetch(url);
      state.data = await response.json();
    } catch (error) {
      state.error = error.message;
    } finally {
      state.loading = false;
    }
    
    return state;
  };
}

// 18. Queue Pattern
class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(asyncFn) {
    while (this.running >= this.concurrency) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    
    this.running++;
    
    try {
      return await asyncFn();
    } finally {
      this.running--;
      const resolve = this.queue.shift();
      if (resolve) resolve();
    }
  }
}

// Kullanım
const queue = new AsyncQueue(2); // Max 2 eşzamanlı istek

// queue.add(() => fetchUser(1));
// queue.add(() => fetchUser(2));
// queue.add(() => fetchUser(3));

// 19. Async Generator
async function* fetchPaginated(baseUrl, totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await response.json();
    yield data;
  }
}

// Kullanım
// for await (const pageData of fetchPaginated('/api/users', 5)) {
//   console.log('Sayfa verisi:', pageData);
// }

// 20. Error Boundary Pattern
async function safeAsync(asyncFn, fallback = null) {
  try {
    return await asyncFn();
  } catch (error) {
    console.error('Yakalanan hata:', error);
    return fallback;
  }
}

// Kullanım
const result = await safeAsync(
  () => fetchUser(999),
  { id: 0, name: 'Varsayılan' }
);
