# Closures (Kapanışlar)

## Closure Nedir?
Closure, bir fonksiyonun kendi scope'unun dışındaki değişkenlere erişebilmesidir. İç fonksiyon, dış fonksiyonun değişkenlerini "hatırlar".

## Temel Örnek
```javascript
function outerFunction() {
  const outerVar = 'Dış değişken';
  
  function innerFunction() {
    console.log(outerVar); // Erişebilir!
  }
  
  return innerFunction;
}

const myFunc = outerFunction();
myFunc(); // "Dış değişken" - hala erişilebilir
```

## Private Variables Pattern
```javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
// console.log(counter.count); // undefined - erişilemez!
```

## Factory Functions
```javascript
function createPerson(name) {
  let age = 0; // Private
  
  return {
    getName() {
      return name;
    },
    getAge() {
      return age;
    },
    birthday() {
      age++;
      return `${name} artık ${age} yaşında`;
    }
  };
}

const person1 = createPerson('Ali');
const person2 = createPerson('Veli');

console.log(person1.birthday()); // "Ali artık 1 yaşında"
console.log(person2.birthday()); // "Veli artık 1 yaşında"
// Her instance kendi private değişkenine sahip
```

## Module Pattern
```javascript
const calculator = (function() {
  // Private variables
  let result = 0;
  const history = [];
  
  // Private function
  function addToHistory(operation) {
    history.push(operation);
  }
  
  // Public API
  return {
    add(num) {
      result += num;
      addToHistory(`+${num}`);
      return this;
    },
    subtract(num) {
      result -= num;
      addToHistory(`-${num}`);
      return this;
    },
    getResult() {
      return result;
    },
    getHistory() {
      return [...history]; // Copy döndür
    },
    clear() {
      result = 0;
      history.length = 0;
    }
  };
})();

calculator.add(10).subtract(3);
console.log(calculator.getResult()); // 7
console.log(calculator.getHistory()); // ["+10", "-3"]
```

## Function Factories
```javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Arrow function ile
const multiplier2 = (factor) => (number) => number * factor;
```

## Event Handlers ile Closure
```javascript
function createButton(label) {
  const button = document.createElement('button');
  button.textContent = label;
  
  let clickCount = 0; // Private
  
  button.addEventListener('click', function() {
    clickCount++;
    console.log(`${label} ${clickCount} kez tıklandı`);
  });
  
  return button;
}

const btn1 = createButton('Buton 1');
const btn2 = createButton('Buton 2');
// Her buton kendi clickCount'una sahip
```

## Loop'ta Closure Problemi
```javascript
// ❌ YANLIŞ - Beklenen sonuç vermez
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Her zaman 3 yazdırır
  }, 100);
}

// ✅ DOĞRU 1 - let kullan
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 100);
}

// ✅ DOĞRU 2 - IIFE ile closure oluştur
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i);
}
```

## Memoization (Caching)
```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('Cache hit!');
      return cache[key];
    }
    
    console.log('Calculating...');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Pahalı hesaplama
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
console.log(memoFib(10)); // Calculating... 55
console.log(memoFib(10)); // Cache hit! 55
```

## Partial Application
```javascript
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Merhaba');
console.log(sayHello('Ali')); // "Merhaba, Ali!"
console.log(sayHello('Veli')); // "Merhaba, Veli!"
```

## React'te Closure Kullanımı

### useState ile
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // Closure - count'u yakalar
  const increment = () => {
    setCount(count + 1); // ⚠️ Stale closure problemi olabilir
  };
  
  // ✅ Daha güvenli
  const increment2 = () => {
    setCount(prev => prev + 1);
  };
  
  return <button onClick={increment2}>{count}</button>;
}
```

### useEffect ile
```javascript
function Timer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Closure - count değerini yakalar
      console.log(count);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [count]); // Dependency array önemli!
}
```

### Custom Hook
```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Closure - key ve initialValue'yu yakalar
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  
  useEffect(() => {
    // Closure - key ve value'yu yakalar
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}
```

## Önemli Notlar
✅ **Avantajlar**:
- Data privacy (private variables)
- Factory functions
- Callback'lerde state tutma
- Memoization/caching

⚠️ **Dikkat**:
- Memory leak riski (gereksiz reference tutma)
- Stale closure (React'te sık görülür)
- Performance overhead (çok sayıda closure)
