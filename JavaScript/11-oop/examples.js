// ========== OOP Örnekleri ==========

// 1. Temel Class
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.mileage = 0;
  }

  drive(km) {
    this.mileage += km;
    return `${this.brand} ${km} km yol aldı`;
  }

  getInfo() {
    return `${this.year} ${this.brand} ${this.model} - ${this.mileage} km`;
  }
}

const car1 = new Car('BMW', 'X5', 2020);
console.log(car1.drive(100));
console.log(car1.getInfo());

// 2. Inheritance
class Vehicle {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }

  start() {
    return `${this.brand} çalıştırıldı`;
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, year, engineSize) {
    super(brand, year);
    this.engineSize = engineSize;
  }

  wheelie() {
    return `${this.brand} tek tekerlek üzerinde gidiyor!`;
  }

  // Override
  start() {
    return `${super.start()} - Motor: ${this.engineSize}cc`;
  }
}

const bike = new Motorcycle('Yamaha', 2022, 600);
console.log(bike.start());
console.log(bike.wheelie());

// 3. Static Methods
class StringHelper {
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static truncate(str, length) {
    return str.length > length ? str.slice(0, length) + '...' : str;
  }

  static reverse(str) {
    return str.split('').reverse().join('');
  }
}

console.log(StringHelper.capitalize('hello')); // "Hello"
console.log(StringHelper.truncate('Long text here', 8)); // "Long tex..."
console.log(StringHelper.reverse('JavaScript')); // "tpircSavaJ"

// 4. Getter ve Setter
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    if (value < -273.15) {
      throw new Error('Mutlak sıfırın altında olamaz!');
    }
    this._celsius = value;
  }

  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }

  get kelvin() {
    return this._celsius + 273.15;
  }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 86;
console.log(temp.celsius); // 30

// 5. Private Fields
class BankAccount {
  #balance;
  #transactionHistory = [];

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      this.#addTransaction('deposit', amount);
      return true;
    }
    return false;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      this.#addTransaction('withdraw', amount);
      return true;
    }
    return false;
  }

  #addTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      date: new Date(),
      balanceAfter: this.#balance
    });
  }

  getBalance() {
    return this.#balance;
  }

  getTransactions() {
    return [...this.#transactionHistory]; // Copy döndür
  }
}

const account = new BankAccount('Ali', 1000);
account.deposit(500);
account.withdraw(200);
console.log('Bakiye:', account.getBalance()); // 1300
console.log('İşlemler:', account.getTransactions().length); // 2

// 6. Factory Pattern
class User {
  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static createAdmin(name, email) {
    return new User(name, email, 'admin');
  }

  static createGuest() {
    return new User('Guest', 'guest@example.com', 'guest');
  }

  hasPermission(permission) {
    const permissions = {
      admin: ['read', 'write', 'delete'],
      user: ['read', 'write'],
      guest: ['read']
    };
    return permissions[this.role].includes(permission);
  }
}

const admin = User.createAdmin('Ahmet', 'ahmet@example.com');
const guest = User.createGuest();

console.log(admin.hasPermission('delete')); // true
console.log(guest.hasPermission('write')); // false

// 7. Singleton Pattern
class Database {
  static #instance;
  #data = {};

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
    Database.#instance = this;
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }

  set(key, value) {
    this.#data[key] = value;
  }

  get(key) {
    return this.#data[key];
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();

db1.set('user', 'Ali');
console.log(db2.get('user')); // "Ali" - aynı instance
console.log(db1 === db2); // true

// 8. Builder Pattern
class Pizza {
  constructor() {
    this.size = 'medium';
    this.cheese = false;
    this.pepperoni = false;
    this.mushrooms = false;
  }

  setSize(size) {
    this.size = size;
    return this;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addMushrooms() {
    this.mushrooms = true;
    return this;
  }

  build() {
    return `${this.size} pizza: ${[
      this.cheese && 'peynir',
      this.pepperoni && 'salam',
      this.mushrooms && 'mantar'
    ].filter(Boolean).join(', ')}`;
  }
}

const myPizza = new Pizza()
  .setSize('large')
  .addCheese()
  .addPepperoni()
  .build();

console.log(myPizza); // "large pizza: peynir, salam"

// 9. Pratik: Todo List Manager
class TodoList {
  #todos = [];
  #nextId = 1;

  add(title) {
    const todo = {
      id: this.#nextId++,
      title,
      completed: false,
      createdAt: new Date()
    };
    this.#todos.push(todo);
    return todo;
  }

  complete(id) {
    const todo = this.#todos.find(t => t.id === id);
    if (todo) {
      todo.completed = true;
      return true;
    }
    return false;
  }

  remove(id) {
    const index = this.#todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.#todos.splice(index, 1);
      return true;
    }
    return false;
  }

  getAll() {
    return [...this.#todos];
  }

  getCompleted() {
    return this.#todos.filter(t => t.completed);
  }

  getPending() {
    return this.#todos.filter(t => !t.completed);
  }

  getStats() {
    return {
      total: this.#todos.length,
      completed: this.getCompleted().length,
      pending: this.getPending().length
    };
  }
}

const todoList = new TodoList();
todoList.add('JavaScript öğren');
todoList.add('React öğren');
todoList.add('Proje yap');
todoList.complete(1);

console.log('Stats:', todoList.getStats());
console.log('Pending:', todoList.getPending());

// 10. Composition Pattern
const canSwim = {
  swim() {
    return `${this.name} yüzüyor`;
  }
};

const canFly = {
  fly() {
    return `${this.name} uçuyor`;
  }
};

const canWalk = {
  walk() {
    return `${this.name} yürüyor`;
  }
};

class Duck {
  constructor(name) {
    this.name = name;
    Object.assign(this, canSwim, canFly, canWalk);
  }
}

class Fish {
  constructor(name) {
    this.name = name;
    Object.assign(this, canSwim);
  }
}

const duck = new Duck('Daffy');
console.log(duck.swim()); // "Daffy yüzüyor"
console.log(duck.fly()); // "Daffy uçuyor"

const fish = new Fish('Nemo');
console.log(fish.swim()); // "Nemo yüzüyor"
// fish.fly(); // HATA - fly yok
