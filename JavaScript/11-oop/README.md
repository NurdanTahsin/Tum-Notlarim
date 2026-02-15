# Object-Oriented Programming (OOP)

## Class Tanımlama
```javascript
class Person {
  // Constructor - nesne oluşturulurken çalışır
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet() {
    return `Merhaba, ben ${this.name}`;
  }

  // Method
  getBirthYear() {
    return new Date().getFullYear() - this.age;
  }
}

// Nesne oluşturma
const person1 = new Person('Ahmet', 25);
console.log(person1.greet()); // "Merhaba, ben Ahmet"
console.log(person1.getBirthYear()); // 2001
```

## Inheritance (Kalıtım)
```javascript
// Base class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} bir ses çıkarıyor`;
  }
}

// Derived class
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Parent constructor'ı çağır
    this.breed = breed;
  }

  speak() {
    return `${this.name} havlıyor: Hav hav!`;
  }

  fetch() {
    return `${this.name} topu getiriyor`;
  }
}

const dog = new Dog('Karabaş', 'Golden Retriever');
console.log(dog.speak()); // "Karabaş havlıyor: Hav hav!"
console.log(dog.fetch()); // "Karabaş topu getiriyor"
```

## Static Methods ve Properties
```javascript
class MathHelper {
  // Static property
  static PI = 3.14159;

  // Static method - class üzerinden çağrılır
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  // Instance method
  calculate() {
    return 'Instance method';
  }
}

// Static kullanımı
console.log(MathHelper.PI); // 3.14159
console.log(MathHelper.add(5, 3)); // 8

// Instance method için nesne gerekli
const helper = new MathHelper();
console.log(helper.calculate()); // "Instance method"
```

## Getter ve Setter
```javascript
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this._email = ''; // Private convention
  }

  // Getter - özellik gibi erişilir
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter - özellik gibi atanır
  set fullName(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  }

  get email() {
    return this._email;
  }

  set email(value) {
    if (value.includes('@')) {
      this._email = value;
    } else {
      throw new Error('Geçersiz email');
    }
  }
}

const user = new User('Ahmet', 'Yılmaz');
console.log(user.fullName); // "Ahmet Yılmaz" (getter)
user.fullName = 'Mehmet Demir'; // setter
console.log(user.firstName); // "Mehmet"

user.email = 'test@example.com'; // setter
console.log(user.email); // "test@example.com"
```

## Private Fields (ES2022)
```javascript
class BankAccount {
  #balance = 0; // Private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount('Ali');
account.deposit(1000);
console.log(account.getBalance()); // 1000
// console.log(account.#balance); // HATA! Private field
```

## Static Initialization Block
```javascript
class Config {
  static apiKey;
  static apiUrl;

  static {
    // Static initialization
    this.apiKey = 'abc123';
    this.apiUrl = 'https://api.example.com';
  }

  static getConfig() {
    return {
      key: this.apiKey,
      url: this.apiUrl
    };
  }
}

console.log(Config.getConfig());
```

## Method Chaining
```javascript
class Calculator {
  constructor() {
    this.value = 0;
  }

  add(num) {
    this.value += num;
    return this; // this döndürerek chaining sağla
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  getResult() {
    return this.value;
  }
}

const result = new Calculator()
  .add(10)
  .multiply(5)
  .subtract(20)
  .getResult();

console.log(result); // 30
```

## Abstract Pattern (Interface benzeri)
```javascript
class Shape {
  constructor(color) {
    if (new.target === Shape) {
      throw new Error('Shape soyut class, instance oluşturulamaz');
    }
    this.color = color;
  }

  // Abstract method
  getArea() {
    throw new Error('getArea() implement edilmeli');
  }

  describe() {
    return `${this.color} renkli şekil`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle('kırmızı', 5);
console.log(circle.getArea()); // 78.53...
console.log(circle.describe()); // "kırmızı renkli şekil"
```

## React'te Class Components (Eski yöntem)
```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

// Modern React - Function component
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

## Composition over Inheritance
```javascript
// ❌ Deep inheritance (karmaşık)
class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}

// ✅ Composition (tercih edilen)
const canEat = {
  eat(food) {
    return `${this.name} ${food} yiyor`;
  }
};

const canWalk = {
  walk() {
    return `${this.name} yürüyor`;
  }
};

class Dog {
  constructor(name) {
    this.name = name;
    Object.assign(this, canEat, canWalk);
  }
}

const dog = new Dog('Karabaş');
console.log(dog.eat('kemik')); // "Karabaş kemik yiyor"
console.log(dog.walk()); // "Karabaş yürüyor"
```
