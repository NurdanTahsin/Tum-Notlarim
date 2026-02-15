// ========== Closures Örnekleri ==========

// 1. Temel Closure
function makeGreeting(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = makeGreeting('Merhaba');
const sayHi = makeGreeting('Selam');

console.log(sayHello('Ali')); // "Merhaba, Ali!"
console.log(sayHi('Veli')); // "Selam, Veli!"

// 2. Counter with Private State
function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    reset() {
      count = initialValue;
      return count;
    },
    getValue() {
      return count;
    }
  };
}

const counter1 = createCounter(10);
const counter2 = createCounter(0);

console.log(counter1.increment()); // 11
console.log(counter1.increment()); // 12
console.log(counter2.increment()); // 1
// Her counter kendi state'ini tutuyor

// 3. Private Variables Pattern
function bankAccount(initialBalance) {
  let balance = initialBalance;
  const transactions = [];
  
  function addTransaction(type, amount) {
    transactions.push({
      type,
      amount,
      date: new Date(),
      balance
    });
  }
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        addTransaction('deposit', amount);
        return balance;
      }
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        addTransaction('withdraw', amount);
        return balance;
      }
      return 'Yetersiz bakiye';
    },
    getBalance() {
      return balance;
    },
    getTransactions() {
      return [...transactions]; // Copy döndür
    }
  };
}

const myAccount = bankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(200);
console.log('Bakiye:', myAccount.getBalance()); // 1300
console.log('İşlemler:', myAccount.getTransactions());

// 4. Function Factory
function powerFunction(exponent) {
  return function(base) {
    return Math.pow(base, exponent);
  };
}

const square = powerFunction(2);
const cube = powerFunction(3);

console.log(square(5)); // 25
console.log(cube(3)); // 27

// 5. Memoization (Performance Optimization)
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('📦 Cache\'ten alındı');
      return cache.get(key);
    }
    
    console.log('🔄 Hesaplanıyor...');
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function expensiveCalculation(n) {
  let sum = 0;
  for (let i = 0; i < n * 1000000; i++) {
    sum += i;
  }
  return sum;
}

const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(100)); // Hesaplanıyor...
console.log(memoizedCalc(100)); // Cache'ten alındı

// 6. Module Pattern (IIFE)
const shoppingCart = (function() {
  // Private
  const items = [];
  let total = 0;
  
  function calculateTotal() {
    total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  
  // Public API
  return {
    addItem(name, price, quantity = 1) {
      items.push({ name, price, quantity });
      calculateTotal();
    },
    removeItem(name) {
      const index = items.findIndex(item => item.name === name);
      if (index !== -1) {
        items.splice(index, 1);
        calculateTotal();
      }
    },
    getItems() {
      return [...items];
    },
    getTotal() {
      return total;
    },
    clear() {
      items.length = 0;
      total = 0;
    }
  };
})();

shoppingCart.addItem('Laptop', 5000);
shoppingCart.addItem('Mouse', 50, 2);
console.log('Sepet toplamı:', shoppingCart.getTotal()); // 5100

// 7. Event Handler with Closure
function createClickCounter(elementId) {
  let clicks = 0;
  
  return function() {
    clicks++;
    console.log(`${elementId} ${clicks} kez tıklandı`);
    return clicks;
  };
}

const button1Handler = createClickCounter('button1');
const button2Handler = createClickCounter('button2');

// Simülasyon
button1Handler(); // "button1 1 kez tıklandı"
button1Handler(); // "button1 2 kez tıklandı"
button2Handler(); // "button2 1 kez tıklandı"

// 8. Partial Application
function multiply(a, b, c) {
  return a * b * c;
}

function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

const multiplyByTwo = partial(multiply, 2);
console.log(multiplyByTwo(3, 4)); // 2 * 3 * 4 = 24

const multiplyByTwoAndThree = partial(multiply, 2, 3);
console.log(multiplyByTwoAndThree(4)); // 2 * 3 * 4 = 24

// 9. Currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

// 10. Timer with Closure
function createTimer(name) {
  let startTime = null;
  let running = false;
  
  return {
    start() {
      if (!running) {
        startTime = Date.now();
        running = true;
        console.log(`${name} başlatıldı`);
      }
    },
    stop() {
      if (running) {
        const elapsed = Date.now() - startTime;
        running = false;
        console.log(`${name} durduruldu - ${elapsed}ms geçti`);
        return elapsed;
      }
    },
    isRunning() {
      return running;
    }
  };
}

const timer = createTimer('İşlem');
timer.start();
// Biraz bekle
setTimeout(() => timer.stop(), 1000);

// 11. Configuration Builder
function createConfig() {
  const config = {
    apiUrl: '',
    timeout: 5000,
    headers: {}
  };
  
  return {
    setApiUrl(url) {
      config.apiUrl = url;
      return this; // Chaining için
    },
    setTimeout(ms) {
      config.timeout = ms;
      return this;
    },
    setHeader(key, value) {
      config.headers[key] = value;
      return this;
    },
    build() {
      return { ...config }; // Copy döndür
    }
  };
}

const apiConfig = createConfig()
  .setApiUrl('https://api.example.com')
  .setTimeout(10000)
  .setHeader('Authorization', 'Bearer token')
  .setHeader('Content-Type', 'application/json')
  .build();

console.log(apiConfig);

// 12. Rate Limiter
function createRateLimiter(maxCalls, timeWindow) {
  const calls = [];
  
  return function(fn) {
    const now = Date.now();
    
    // Eski çağrıları temizle
    while (calls.length > 0 && calls[0] < now - timeWindow) {
      calls.shift();
    }
    
    if (calls.length < maxCalls) {
      calls.push(now);
      return fn();
    } else {
      console.log('⚠️ Rate limit aşıldı, lütfen bekleyin');
      return null;
    }
  };
}

const limitedFunction = createRateLimiter(3, 5000); // 5 saniyede max 3 çağrı

// Test
for (let i = 0; i < 5; i++) {
  limitedFunction(() => console.log(`Çağrı ${i + 1}`));
}

// 13. Once Function (Sadece 1 kez çalışır)
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initializeApp = once(() => {
  console.log('Uygulama başlatılıyor...');
  return { initialized: true };
});

console.log(initializeApp()); // "Uygulama başlatılıyor..."
console.log(initializeApp()); // Sessiz - tekrar çalışmaz
console.log(initializeApp()); // Sessiz

// 14. Data Validator Factory
function createValidator(rules) {
  return function(data) {
    const errors = [];
    
    for (const [field, rule] of Object.entries(rules)) {
      if (rule.required && !data[field]) {
        errors.push(`${field} gereklidir`);
      }
      if (rule.minLength && data[field]?.length < rule.minLength) {
        errors.push(`${field} en az ${rule.minLength} karakter olmalı`);
      }
      if (rule.pattern && !rule.pattern.test(data[field])) {
        errors.push(`${field} formatı geçersiz`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
}

const validateUser = createValidator({
  username: { required: true, minLength: 3 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { required: true, minLength: 8 }
});

const result = validateUser({
  username: 'ab',
  email: 'invalid-email',
  password: '123'
});

console.log(result);
