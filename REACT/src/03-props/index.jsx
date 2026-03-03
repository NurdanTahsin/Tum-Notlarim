import './styles.css'

// Props - React'te Veri Aktarımı

// Örnek 1: Temel Props Kullanımı
function Example1() {
    function Greeting({ name }) {
        return <p className="greeting">Merhaba, {name}!</p>
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 1: Temel Props Kullanımı</h3>
            <Greeting name="Ahmet" />
            <Greeting name="Ayşe" />
            <Greeting name="Mehmet" />
            <p className="note">💡 Props, component'lere dışarıdan veri göndermeyi sağlar</p>
        </div>
    )
}

// Örnek 2: Çoklu Props
function Example2() {
    function UserCard({ name, age, job }) {
        return (
            <div className="user-card">
                <h4>👤 {name}</h4>
                <p>Yaş: {age}</p>
                <p>Meslek: {job}</p>
            </div>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 2: Çoklu Props</h3>
            <UserCard name="Ali" age={25} job="Developer" />
            <UserCard name="Zeynep" age={28} job="Designer" />
            <UserCard name="Can" age={30} job="Manager" />
            <p className="note">💡 Bir component'e birden fazla prop gönderebiliriz</p>
        </div>
    )
}

// Örnek 3: Props Destructuring
function Example3() {
    // Yöntem 1: Destructuring ile
    function Product({ name, price, inStock }) {
        return (
            <div className="product-card">
                <h4>{name}</h4>
                <p className="price">{price} ₺</p>
                <p className={inStock ? "in-stock" : "out-stock"}>
                    {inStock ? "✅ Stokta var" : "❌ Stok yok"}
                </p>
            </div>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 3: Props Destructuring</h3>
            <Product name="Laptop" price={15000} inStock={true} />
            <Product name="Mouse" price={250} inStock={true} />
            <Product name="Keyboard" price={800} inStock={false} />
            <p className="note">💡 Destructuring ile props daha okunabilir olur</p>
        </div>
    )
}

// Örnek 4: Default Props
function Example4() {
    function Button({ text = "Tıkla", color = "#3b82f6" }) {
        return (
            <button className="custom-btn" style={{ backgroundColor: color }}>
                {text}
            </button>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 4: Default Props</h3>
            <Button />
            <Button text="Kaydet" />
            <Button text="Sil" color="#f87171" />
            <Button text="Düzenle" color="#10b981" />
            <p className="note">💡 Default değerler prop gönderilmezse kullanılır</p>
        </div>
    )
}

// Örnek 5: Props ile Fonksiyon Gönderme
function Example5() {
    function Button({ onClick, label }) {
        return (
            <button className="action-btn" onClick={onClick}>
                {label}
            </button>
        )
    }

    const handleClick = () => {
        alert("Butona tıklandı!")
    }

    const handleSave = () => {
        alert("Kaydedildi!")
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 5: Props ile Fonksiyon Gönderme</h3>
            <Button onClick={handleClick} label="Tıkla" />
            <Button onClick={handleSave} label="Kaydet" />
            <p className="note">💡 Props ile fonksiyon da gönderebiliriz (Event Handler)</p>
        </div>
    )
}

// Örnek 6: Children Props
function Example6() {
    function Card({ children, title }) {
        return (
            <div className="card-wrapper">
                <h4 className="card-title">{title}</h4>
                <div className="card-content">{children}</div>
            </div>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 6: Children Props</h3>
            <Card title="Bilgi">
                <p>Bu bir children örneği</p>
                <p>İstediğimiz içeriği koyabiliriz</p>
            </Card>
            <Card title="Uyarı">
                <strong>Dikkat!</strong>
                <p>Bu önemli bir mesaj</p>
            </Card>
            <p className="note">💡 children, component etiketleri arasındaki içeriktir</p>
        </div>
    )
}

// Örnek 7: Array Props
function Example7() {
    function TodoList({ items }) {
        return (
            <ul className="todo-list">
                {items.map((item, index) => (
                    <li key={index} className="todo-item">
                        {item}
                    </li>
                ))}
            </ul>
        )
    }

    const todos = ["React öğren", "Proje yap", "Portfolio hazırla"]
    const shopping = ["Ekmek", "Süt", "Yumurta"]

    return (
        <div className="example-box">
            <h3>📌 Örnek 7: Array Props</h3>
            <h4>Yapılacaklar:</h4>
            <TodoList items={todos} />
            <h4>Alışveriş:</h4>
            <TodoList items={shopping} />
            <p className="note">💡 Array (dizi) de prop olarak gönderilebilir</p>
        </div>
    )
}

// Örnek 8: Object Props
function Example8() {
    function ProfileCard({ user }) {
        return (
            <div className="profile-card">
                <img src={user.avatar} alt={user.name} className="avatar" />
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>{user.bio}</p>
            </div>
        )
    }

    const user = {
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        bio: "Full Stack Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 8: Object Props</h3>
            <ProfileCard user={user} />
            <p className="note">💡 Object (nesne) prop olarak gönderilebilir</p>
        </div>
    )
}

// Örnek 9: Spread Operator ile Props
function Example9() {
    function Card({ title, description, color, icon }) {
        return (
            <div className="info-card" style={{ borderColor: color }}>
                <div className="card-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        )
    }

    const cardData = {
        title: "React",
        description: "JavaScript Library",
        color: "#61dafb",
        icon: "⚛️"
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 9: Spread Operator ile Props</h3>
            <Card {...cardData} />
            <Card
                title="JavaScript"
                description="Programming Language"
                color="#f7df1e"
                icon="🟨"
            />
            <p className="note">💡 Spread operator ({"{...obj}"}) ile tüm props'ları hızlıca gönderebiliriz</p>
        </div>
    )
}

// Örnek 10: Props Kuralları
function Example10() {
    return (
        <div className="example-box summary">
            <h3>📌 Örnek 10: Props Kuralları ve İpuçları</h3>
            <div className="rules-grid">
                <div className="rule-card">
                    <h4>✅ Props Read-Only</h4>
                    <p>Props değiştirilemez! (Immutable)</p>
                    <code>❌ props.name = "Yeni isim"</code>
                </div>
                <div className="rule-card">
                    <h4>✅ CamelCase Kullan</h4>
                    <p>Prop isimleri camelCase olmalı</p>
                    <code>✅ userName, isActive</code>
                </div>
                <div className="rule-card">
                    <h4>✅ JSX'te Süslü Parantez</h4>
                    <p>String dışındaki değerler {"{}"} içinde</p>
                    <code>✅ age={"{25}"} isActive={"{true}"}</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Boolean Props</h4>
                    <p>True için sadece prop adı yeter</p>
                    <code>✅ disabled = disabled={"{true}"}</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Key Prop</h4>
                    <p>Listelerde mutlaka key kullan</p>
                    <code>✅ key={"{item.id}"}</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Destructuring</h4>
                    <p>Props'u destructure et</p>
                    <code>✅ function Card({"{title}"}) {"{}"}</code>
                </div>
            </div>
            <div className="tip-box">
                <h4>💡 Props vs State</h4>
                <ul>
                    <li><strong>Props:</strong> Parent'tan child'a veri aktarımı (dışarıdan gelir)</li>
                    <li><strong>State:</strong> Component'in kendi içindeki veri (içerde yönetilir)</li>
                </ul>
            </div>
        </div>
    )
}

// Ana component - Tüm örnekleri birleştir
export default function Props() {
    return (
        <div className="props-page">
            <div className="header">
                <h1>📦 Props - Properties</h1>
                <p className="description">
                    Props (properties), React component'lerine veri ve fonksiyon göndermek için kullanılır.
                    Props sayesinde component'ler yeniden kullanılabilir ve dinamik hale gelir. Props,
                    parent component'ten child component'e tek yönlü (one-way) veri akışı sağlar ve
                    değiştirilemez (immutable) özelliğe sahiptir.
                </p>
            </div>

            <div className="examples-grid">
                <Example1 />
                <Example2 />
                <Example3 />
                <Example4 />
                <Example5 />
                <Example6 />
                <Example7 />
                <Example8 />
                <Example9 />
                <Example10 />
            </div>

            <div className="footer-note">
                <p>💡 <strong>Hatırla:</strong> Props component'leri dinamik ve esnek yapar.
                    Aynı component'i farklı verilerle kullanarak kod tekrarını önleriz ve
                    sürdürülebilir yapılar oluştururuz!</p>
            </div>
        </div>
    )
}
