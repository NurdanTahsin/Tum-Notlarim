import './styles.css'

// Components - React'te Component Yapısı

// Örnek 1: Basit Functional Component
function Example1() {
    // En basit component yapısı
    function WelcomeMessage() {
        return <h3>Merhaba, React Component!</h3>
    }

    function Greeting() {
        return <p>Bu bir functional component örneği</p>
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 1: Basit Functional Component</h3>
            <WelcomeMessage />
            <Greeting />
            <p className="note">💡 Component'ler büyük harfle başlamalı</p>
        </div>
    )
}

// Örnek 2: Component Composition (İç İçe Componentler)
function Example2() {
    function Header() {
        return (
            <div className="header-box">
                <h4>🎯 Başlık Component</h4>
            </div>
        )
    }

    function Content() {
        return (
            <div className="content-box">
                <p>📝 İçerik Component</p>
            </div>
        )
    }

    function Footer() {
        return (
            <div className="footer-box">
                <p>📍 Footer Component</p>
            </div>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 2: Component Composition</h3>
            <Header />
            <Content />
            <Footer />
            <p className="note">💡 Büyük component'leri küçük parçalara bölebiliriz</p>
        </div>
    )
}

// Örnek 3: Tekrar Kullanılabilir Component
function Example3() {
    function UserCard() {
        return (
            <div className="user-card">
                <h4>👤 Kullanıcı</h4>
                <p>Bu bir kullanıcı kartı</p>
            </div>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 3: Tekrar Kullanılabilir Component</h3>
            <UserCard />
            <UserCard />
            <UserCard />
            <p className="note">💡 Aynı component'i istediğimiz kadar kullanabiliriz</p>
        </div>
    )
}

// Örnek 4: Component'lere Veri Gönderme (Basit Props)
function Example4() {
    function Message({ text }) {
        return <p className="message-box">{text}</p>
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 4: Component'e Veri Gönderme</h3>
            <Message text="Merhaba!" />
            <Message text="React öğreniyorum" />
            <Message text="Component'ler harika!" />
            <p className="note">💡 Props ile component'leri dinamik yapabiliriz</p>
        </div>
    )
}

// Örnek 5: Component ile Liste Oluşturma
function Example5() {
    function ListItem({ item }) {
        return <li className="list-item">{item}</li>
    }

    const items = ["React", "JavaScript", "CSS", "HTML"]

    return (
        <div className="example-box">
            <h3>📌 Örnek 5: Component ile Liste</h3>
            <ul>
                {items.map((item, index) => (
                    <ListItem key={index} item={item} />
                ))}
            </ul>
            <p className="note">💡 Listeler için key prop'u önemli</p>
        </div>
    )
}

// Örnek 6: Button Component
function Example6() {
    function Button({ label, color }) {
        return (
            <button
                className="custom-btn"
                style={{ backgroundColor: color }}
            >
                {label}
            </button>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 6: Button Component</h3>
            <Button label="Kaydet" color="#4ade80" />
            <Button label="Sil" color="#f87171" />
            <Button label="Düzenle" color="#60a5fa" />
            <p className="note">💡 Aynı component, farklı verilerle farklı görünür</p>
        </div>
    )
}

// Örnek 7: Card Component
function Example7() {
    function Card({ title, description, icon }) {
        return (
            <div className="info-card">
                <div className="card-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        )
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 7: Card Component</h3>
            <div className="cards-grid">
                <Card
                    icon="🚀"
                    title="Kolay"
                    description="React öğrenmek kolay"
                />
                <Card
                    icon="⚡"
                    title="Hızlı"
                    description="Performanslı uygulamalar"
                />
                <Card
                    icon="🎨"
                    title="Esnek"
                    description="Dilediğin gibi tasarla"
                />
            </div>
        </div>
    )
}

// Örnek 8: Component İsimlendirme
function Example8() {
    // ✅ DOĞRU: PascalCase (Büyük harfle başla)
    function MyComponent() {
        return <p className="success">✅ MyComponent (Doğru)</p>
    }

    // ❌ YANLIŞ: küçük harfle (HTML tag gibi algılanır)
    // function mycomponent() {
    //   return <p>HTML tag gibi algılanır</p>
    // }

    return (
        <div className="example-box">
            <h3>📌 Örnek 8: Component İsimlendirme</h3>
            <MyComponent />
            <div className="rules">
                <p>✅ PascalCase kullan: <code>MyComponent</code></p>
                <p>❌ camelCase kullanma: <code>myComponent</code></p>
                <p>❌ kebab-case kullanma: <code>my-component</code></p>
            </div>
        </div>
    )
}

// Örnek 9: Component Hiyerarşisi
function Example9() {
    function App() {
        return (
            <div className="app-container">
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }

    function Header() {
        return <div className="section-header">Header Component</div>
    }

    function Main() {
        return (
            <div className="section-main">
                <Sidebar />
                <Content />
            </div>
        )
    }

    function Sidebar() {
        return <div className="section-sidebar">Sidebar</div>
    }

    function Content() {
        return <div className="section-content">Content</div>
    }

    function Footer() {
        return <div className="section-footer">Footer Component</div>
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 9: Component Hiyerarşisi</h3>
            <App />
            <p className="note">💡 Component'ler ağaç yapısında organize edilir</p>
        </div>
    )
}

// Örnek 10: Component Avantajları
function Example10() {
    return (
        <div className="example-box summary">
            <h3>📌 Örnek 10: Component Neden Önemli?</h3>
            <div className="benefits-grid">
                <div className="benefit">
                    <div className="benefit-icon">🔄</div>
                    <h4>Tekrar Kullanılabilir</h4>
                    <p>Bir kez yaz, her yerde kullan</p>
                </div>
                <div className="benefit">
                    <div className="benefit-icon">🧩</div>
                    <h4>Modüler Yapı</h4>
                    <p>Karmaşık UI'ları küçük parçalara böl</p>
                </div>
                <div className="benefit">
                    <div className="benefit-icon">🛠️</div>
                    <h4>Kolay Bakım</h4>
                    <p>Her component bağımsız çalışır</p>
                </div>
                <div className="benefit">
                    <div className="benefit-icon">🎯</div>
                    <h4>Odaklanma</h4>
                    <p>Her component bir işe odaklanır</p>
                </div>
            </div>
        </div>
    )
}

// Ana component - Tüm örnekleri birleştir
export default function Components() {
    return (
        <div className="components-page">
            <div className="header">
                <h1>🧩 Components - Componentler</h1>
                <p className="description">
                    React'te her şey component'lerden oluşur. Component'ler, UI'ın yeniden kullanılabilir,
                    bağımsız parçalarıdır. Bir component, JavaScript fonksiyonu gibi çalışır: girdi alır
                    (props) ve ekranda ne görüneceğini belirleyen React elementleri döndürür.
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
                <p>💡 <strong>Önemli:</strong> Component'ler React'in temel yapı taşıdır.
                    İyi component tasarımı, sürdürülebilir ve ölçeklenebilir uygulamalar için kritiktir!</p>
            </div>
        </div>
    )
}