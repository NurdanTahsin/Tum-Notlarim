// ========== Destructuring Örnekleri ==========

// 1. Array Destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...others] = colors;
console.log(primary); // "red"
console.log(secondary); // "green"
console.log(others); // ["blue", "yellow"]

// 2. Object Destructuring
const product = {
  id: 1,
  name: 'Laptop',
  price: 5000,
  stock: 10,
  category: 'Electronics'
};

const { name, price, stock: stokMiktari } = product;
console.log(name, price, stokMiktari); // "Laptop" 5000 10

// 3. İç içe destructuring
const company = {
  name: 'Tech Corp',
  ceo: {
    name: 'Ahmet Yılmaz',
    age: 45
  },
  employees: [
    { name: 'Ayşe', role: 'Developer' },
    { name: 'Mehmet', role: 'Designer' }
  ]
};

const { 
  name: companyName, 
  ceo: { name: ceoName }, 
  employees: [firstEmployee] 
} = company;

console.log(companyName); // "Tech Corp"
console.log(ceoName); // "Ahmet Yılmaz"
console.log(firstEmployee.name); // "Ayşe"

// 4. Function parameters
function displayUser({ name, email, role = 'User' }) {
  console.log(`${name} (${email}) - ${role}`);
}

displayUser({ 
  name: 'Zeynep', 
  email: 'zeynep@example.com' 
});

// 5. Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1

// 6. API response destructuring
const apiResponse = {
  success: true,
  data: {
    user: {
      id: 123,
      username: 'johndoe',
      profile: {
        bio: 'Developer',
        location: 'Istanbul'
      }
    }
  },
  message: 'Fetched successfully'
};

const { 
  data: { 
    user: { 
      username, 
      profile: { location } 
    } 
  } 
} = apiResponse;

console.log(username, location); // "johndoe" "Istanbul"

// 7. Array methods ile
const users = [
  { id: 1, name: 'Ali', age: 25 },
  { id: 2, name: 'Veli', age: 30 },
  { id: 3, name: 'Ayşe', age: 28 }
];

// Her user'ı destructure et
users.forEach(({ name, age }) => {
  console.log(`${name} is ${age} years old`);
});

// map ile
const names = users.map(({ name }) => name);
console.log(names); // ["Ali", "Veli", "Ayşe"]

// 8. Rest pattern ile object filtreleme
function removePassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

const userWithPass = { 
  id: 1, 
  name: 'Test', 
  password: 'secret123' 
};

console.log(removePassword(userWithPass)); 
// { id: 1, name: 'Test' }

// 9. Dynamic property names
const key = 'username';
const { [key]: value } = { username: 'johndoe' };
console.log(value); // "johndoe"

// 10. Conditional destructuring
const config = {
  theme: 'dark',
  lang: 'tr'
};

const { 
  theme = 'light', 
  lang = 'en',
  timezone = 'UTC' // yoksa varsayılan
} = config;

console.log(theme, lang, timezone); // "dark" "tr" "UTC"
