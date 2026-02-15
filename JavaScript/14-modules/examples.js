// ========== ES6 Modules Örnekleri ==========

// ========== EXPORT ÖRNEKLERI ==========

// 1. mathUtils.js - Named exports
// export const PI = 3.14159;
// export const E = 2.71828;

// export function add(a, b) {
//   return a + b;
// }

// export function subtract(a, b) {
//   return a - b;
// }

// export function multiply(a, b) {
//   return a * b;
// }

// export function divide(a, b) {
//   if (b === 0) throw new Error('Division by zero');
//   return a / b;
// }

// 2. User.js - Default export (Class)
// export default class User {
//   constructor(name, email) {
//     this.name = name;
//     this.email = email;
//     this.createdAt = new Date();
//   }

//   greet() {
//     return `Merhaba, ben ${this.name}`;
//   }

//   getInfo() {
//     return {
//       name: this.name,
//       email: this.email,
//       memberSince: this.createdAt.getFullYear()
//     };
//   }
// }

// 3. config.js - Mixed exports
// export const API_URL = 'https://api.example.com';
// export const TIMEOUT = 5000;
// export const MAX_RETRIES = 3;

// const config = {
//   apiUrl: API_URL,
//   timeout: TIMEOUT,
//   maxRetries: MAX_RETRIES,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// };

// export default config;

// 4. constants.js - Multiple named exports
// export const STATUS = {
//   IDLE: 'idle',
//   LOADING: 'loading',
//   SUCCESS: 'success',
//   ERROR: 'error'
// };

// export const COLORS = {
//   PRIMARY: '#007bff',
//   SUCCESS: '#28a745',
//   DANGER: '#dc3545',
//   WARNING: '#ffc107'
// };

// export const ROUTES = {
//   HOME: '/',
//   ABOUT: '/about',
//   CONTACT: '/contact',
//   USERS: '/users'
// };

// 5. validators.js - Utility functions
// export function isEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

// export function isPhoneNumber(phone) {
//   const regex = /^\d{10}$/;
//   return regex.test(phone);
// }

// export function isStrongPassword(password) {
//   return password.length >= 8 && 
//          /[A-Z]/.test(password) && 
//          /[a-z]/.test(password) && 
//          /[0-9]/.test(password);
// }

// export function isEmpty(value) {
//   return value === null || value === undefined || value === '';
// }

// ========== IMPORT ÖRNEKLERI ==========

// 6. Named imports
// import { add, multiply, PI } from './mathUtils.js';
// console.log(add(5, 3)); // 8
// console.log(multiply(4, 2)); // 8
// console.log(PI); // 3.14159

// 7. Renamed imports
// import { add as topla, subtract as cikar } from './mathUtils.js';
// console.log(topla(10, 5)); // 15
// console.log(cikar(10, 5)); // 5

// 8. Namespace import
// import * as Math from './mathUtils.js';
// console.log(Math.add(5, 3)); // 8
// console.log(Math.PI); // 3.14159

// 9. Default import
// import User from './User.js';
// const user = new User('Ali', 'ali@example.com');
// console.log(user.greet());

// 10. Mixed imports
// import config, { API_URL, TIMEOUT } from './config.js';
// console.log(config.apiUrl);
// console.log(API_URL);

// ========== REACT ÖRNEKLERI ==========

// 11. Button.jsx - React Component
// import React from 'react';

// export default function Button({ 
//   children, 
//   onClick, 
//   variant = 'primary',
//   disabled = false 
// }) {
//   return (
//     <button 
//       onClick={onClick}
//       disabled={disabled}
//       className={`btn btn-${variant}`}
//     >
//       {children}
//     </button>
//   );
// }

// 12. hooks/useCounter.js - Custom Hook
// import { useState, useCallback } from 'react';

// export default function useCounter(initialValue = 0) {
//   const [count, setCount] = useState(initialValue);

//   const increment = useCallback(() => {
//     setCount(c => c + 1);
//   }, []);

//   const decrement = useCallback(() => {
//     setCount(c => c - 1);
//   }, []);

//   const reset = useCallback(() => {
//     setCount(initialValue);
//   }, [initialValue]);

//   const setValue = useCallback((value) => {
//     setCount(value);
//   }, []);

//   return { 
//     count, 
//     increment, 
//     decrement, 
//     reset, 
//     setValue 
//   };
// }

// 13. hooks/useFetch.js - Data Fetching Hook
// import { useState, useEffect } from 'react';

// export default function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchData() {
//       try {
//         setLoading(true);
//         const response = await fetch(url);
//         const json = await response.json();
        
//         if (isMounted) {
//           setData(json);
//           setError(null);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message);
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     }

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [url]);

//   return { data, loading, error };
// }

// 14. utils/api.js - API Functions
// const BASE_URL = 'https://jsonplaceholder.typicode.com';

// export async function getUsers() {
//   const response = await fetch(`${BASE_URL}/users`);
//   return response.json();
// }

// export async function getUser(id) {
//   const response = await fetch(`${BASE_URL}/users/${id}`);
//   if (!response.ok) throw new Error('User not found');
//   return response.json();
// }

// export async function createUser(userData) {
//   const response = await fetch(`${BASE_URL}/users`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userData)
//   });
//   return response.json();
// }

// export async function updateUser(id, userData) {
//   const response = await fetch(`${BASE_URL}/users/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userData)
//   });
//   return response.json();
// }

// export async function deleteUser(id) {
//   const response = await fetch(`${BASE_URL}/users/${id}`, {
//     method: 'DELETE'
//   });
//   return response.ok;
// }

// ========== BARREL EXPORTS ==========

// 15. components/index.js - Barrel file
// export { default as Button } from './Button';
// export { default as Input } from './Input';
// export { default as Card } from './Card';
// export { default as Modal } from './Modal';

// App.jsx'de kullanım:
// import { Button, Input, Card, Modal } from './components';

// 16. hooks/index.js - Hooks barrel
// export { default as useCounter } from './useCounter';
// export { default as useFetch } from './useFetch';
// export { default as useLocalStorage } from './useLocalStorage';
// export { default as useToggle } from './useToggle';

// Component'te kullanım:
// import { useCounter, useFetch } from './hooks';

// ========== DYNAMIC IMPORTS ==========

// 17. Lazy loading
// async function loadHeavyModule() {
//   const module = await import('./heavyModule.js');
//   module.doSomethingExpensive();
// }

// button.addEventListener('click', loadHeavyModule);

// 18. Conditional import
// async function loadModule(moduleName) {
//   let module;
  
//   if (moduleName === 'chart') {
//     module = await import('./chartModule.js');
//   } else if (moduleName === 'table') {
//     module = await import('./tableModule.js');
//   }
  
//   return module.default;
// }

// 19. React lazy loading
// import { lazy, Suspense } from 'react';

// const HeavyComponent = lazy(() => import('./HeavyComponent'));

// function App() {
//   return (
//     <Suspense fallback={<div>Yükleniyor...</div>}>
//       <HeavyComponent />
//     </Suspense>
//   );
// }

// ========== PRATIK ÖRNEKLER ==========

// 20. Storage utility module
// export const storage = {
//   get(key) {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   },
  
//   set(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
//   },
  
//   remove(key) {
//     localStorage.removeItem(key);
//   },
  
//   clear() {
//     localStorage.clear();
//   }
// };

// 21. Logger utility
// export class Logger {
//   static log(message, data) {
//     console.log(`[LOG] ${message}`, data);
//   }
  
//   static error(message, error) {
//     console.error(`[ERROR] ${message}`, error);
//   }
  
//   static warn(message, data) {
//     console.warn(`[WARN] ${message}`, data);
//   }
// }

// 22. Date formatter
// export function formatDate(date, format = 'DD/MM/YYYY') {
//   const d = new Date(date);
//   const day = String(d.getDate()).padStart(2, '0');
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const year = d.getFullYear();
  
//   return format
//     .replace('DD', day)
//     .replace('MM', month)
//     .replace('YYYY', year);
// }

// export function isToday(date) {
//   const today = new Date();
//   const d = new Date(date);
//   return d.toDateString() === today.toDateString();
// }

// ========== MODULE PATTERN ==========

// 23. Counter module with private state
// let count = 0; // Private

// export function increment() {
//   return ++count;
// }

// export function decrement() {
//   return --count;
// }

// export function getCount() {
//   return count;
// }

// export function reset() {
//   count = 0;
// }

// Kullanım:
// import * as Counter from './counter.js';
// Counter.increment(); // count değişkenine direkt erişilemez

console.log('Module examples - Her dosya ayrı module olarak düşünülmeli');
console.log('React projelerinde bu yapıyı göreceksin!');
