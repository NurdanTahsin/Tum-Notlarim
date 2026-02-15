# ES6 Modules (Import/Export)

## Export (Dışa Aktarma)

### Named Exports
```javascript
// utils.js
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export class Calculator {
  add(a, b) {
    return a + b;
  }
}

// Alternatif: Sonunda export
const PI = 3.14159;
const E = 2.71828;
function add(a, b) { return a + b; }

export { PI, E, add };
```

### Default Export
```javascript
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Veya
class User {
  constructor(name) {
    this.name = name;
  }
}
export default User;

// Function için
export default function greet(name) {
  return `Hello, ${name}`;
}

// Direkt değer
export default 42;
```

### Mixed Exports
```javascript
// config.js
export const API_URL = 'https://api.example.com';
export const TIMEOUT = 5000;

export default {
  apiUrl: API_URL,
  timeout: TIMEOUT,
  version: '1.0.0'
};
```

## Import (İçe Aktarma)

### Named Imports
```javascript
// Tek import
import { add } from './utils.js';

// Multiple imports
import { add, multiply, PI } from './utils.js';

// Rename (as kullanarak)
import { add as topla, multiply as carp } from './utils.js';

// Tümünü import
import * as Utils from './utils.js';
// Utils.add(5, 3)
// Utils.PI
```

### Default Import
```javascript
// İsim serbest
import User from './user.js';
import MyUser from './user.js'; // Farklı isim verilebilir
import WhateverName from './user.js'; // Bu da olur
```

### Mixed Imports
```javascript
// Default + named
import User, { validateUser, UserRole } from './user.js';

// Rename default
import { default as User } from './user.js';
```

### Dynamic Import
```javascript
// Conditional import
if (condition) {
  const module = await import('./heavy-module.js');
  module.doSomething();
}

// Lazy loading
button.addEventListener('click', async () => {
  const { animate } = await import('./animations.js');
  animate();
});

// React code splitting
const MyComponent = lazy(() => import('./MyComponent'));
```

## Module Patterns

### Utility Module
```javascript
// mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;

// main.js
import { add, multiply } from './mathUtils.js';
console.log(add(5, 3)); // 8
```

### Class Module
```javascript
// User.js
export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

// main.js
import User from './User.js';
const user = new User('Ali', 'ali@example.com');
```

### Config Module
```javascript
// config.js
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true
  },
  production: {
    apiUrl: 'https://api.example.com',
    debug: false
  }
};

const env = process.env.NODE_ENV || 'development';
export default config[env];

// main.js
import config from './config.js';
console.log(config.apiUrl);
```

### Constants Module
```javascript
// constants.js
export const STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const COLORS = {
  PRIMARY: '#007bff',
  SECONDARY: '#6c757d',
  SUCCESS: '#28a745'
};

export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts'
};
```

## Re-exporting (Yeniden Export)
```javascript
// components/index.js
export { Button } from './Button.js';
export { Input } from './Input.js';
export { Card } from './Card.js';

// Veya
export * from './Button.js';
export * from './Input.js';

// Default'u yeniden export
export { default as Button } from './Button.js';

// main.js
import { Button, Input, Card } from './components';
```

## React ile Kullanım

### Component Export/Import
```javascript
// Button.jsx
export default function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

// App.jsx
import Button from './Button';

function App() {
  return <Button onClick={() => alert('Clicked')}>Tıkla</Button>;
}
```

### Multiple Components
```javascript
// components.jsx
export function Button({ children }) {
  return <button>{children}</button>;
}

export function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

// App.jsx
import { Button, Input } from './components';
```

### Hooks Module
```javascript
// hooks/useCounter.js
import { useState } from 'react';

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Component.jsx
import useCounter from './hooks/useCounter';

function Counter() {
  const { count, increment } = useCounter(0);
  return <button onClick={increment}>{count}</button>;
}
```

### Utils Module
```javascript
// utils/api.js
export async function fetchUsers() {
  const response = await fetch('/api/users');
  return response.json();
}

export async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  return response.json();
}

// Component.jsx
import { fetchUsers } from './utils/api';
```

## Module Scope
```javascript
// counter.js
let count = 0; // Private (modül içi)

export function increment() {
  count++;
  return count;
}

export function getCount() {
  return count;
}

// main.js
import { increment, getCount } from './counter.js';
console.log(increment()); // 1
console.log(getCount()); // 1
// count değişkenine direkt erişilemez
```

## Barrel Exports
```javascript
// components/index.js (barrel file)
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
export { Modal } from './Modal';

// App.jsx - Tek yerden import
import { Button, Input, Card, Modal } from './components';
```

## CommonJS vs ES Modules

### CommonJS (Node.js eski)
```javascript
// ❌ Eski yöntem
const express = require('express');
module.exports = router;
```

### ES Modules (Modern)
```javascript
// ✅ Modern
import express from 'express';
export default router;
```

## HTML'de Module Kullanımı
```html
<!-- type="module" gerekli -->
<script type="module">
  import { add } from './utils.js';
  console.log(add(5, 3));
</script>

<!-- Veya -->
<script type="module" src="main.js"></script>
```

## Best Practices
✅ **Yapılmalı**:
- Named export kullan (tree-shaking için)
- Barrel files ile organize et
- Açıklayıcı isimler kullan

❌ **Yapılmamalı**:
- Default export her yerde kullanma
- Circular dependencies oluşturma
- Çok fazla re-export zincirleme
