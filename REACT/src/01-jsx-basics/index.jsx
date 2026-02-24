import './styles.css'

// JSX Basics - Temel Kurallar ve Örnekler

// Örnek 1: JSX'te JavaScript ifadeleri
function Example1() {
    const name = "React Öğrencisi"
    const age = 25
    const hobbies = ["Kod yazmak", "Kitap okumak", "Müzik dinlemek"]

    return (
        <div className="example-box">
            <h3>📌 Örnek 1: JSX'te JavaScript İfadeleri</h3>
            <p>Merhaba, ben {name}!</p>
            <p>Yaşım: {age}</p>
            <p>İlk hobim: {hobbies[0]}</p>
            <p>2 x 3 = {2 * 3}</p>
        </div>
    )
}

// Örnek 2: className ve style kullanımı
function Example2() {
    const isActive = true
    const bgColor = "#61dafb"

    return (
        <div className="example-box">
            <h3>📌 Örnek 2: className ve Style</h3>
            <p className="highlight">Bu bir highlight class'ı</p>
            <p className={isActive ? "active" : "inactive"}>Dinamik class</p>
            <div style={{ backgroundColor: bgColor, padding: "10px", borderRadius: "8px" }}>
                <p style={{ color: "white" }}>Inline style örneği</p>
            </div>
        </div>
    )
}

// Örnek 3: Fragment kullanımı
function Example3() {
    return (
        <div className="example-box">
            <h3>📌 Örnek 3: Fragment Kullanımı</h3>
            <>
                <p>Fragment ile gereksiz div'den kurtuluruz</p>
                <p>Birden fazla element döndürebiliriz</p>
                <p>DOM'da extra eleman oluşturmaz</p>
            </>
        </div>
    )
}

// Örnek 4: Koşullu render (ternary)
function Example4() {
    const isLoggedIn = true
    const score = 85

    return (
        <div className="example-box">
            <h3>📌 Örnek 4: Koşullu Render</h3>
            {isLoggedIn ? (
                <p className="success">✅ Giriş yapıldı</p>
            ) : (
                <p className="error">❌ Giriş yapılmadı</p>
            )}

            <p>Sınav durumu: {score >= 50 ? "Geçti 🎉" : "Kaldı 😢"}</p>
        </div>
    )
}

// Örnek 5: && operatörü ile koşullu render
function Example5() {
    const notifications = 5
    const showWarning = true

    return (
        <div className="example-box">
            <h3>📌 Örnek 5: && Operatörü</h3>
            {notifications > 0 && (
                <p className="badge">{notifications} yeni bildirim</p>
            )}

            {showWarning && (
                <p className="warning">⚠️ Dikkat: Bu bir uyarı mesajıdır</p>
            )}

            {false && <p>Bu görünmez</p>}
        </div>
    )
}

// Örnek 6: Map ile liste render
function Example6() {
    const fruits = ["Elma", "Armut", "Muz", "Çilek"]

    return (
        <div className="example-box">
            <h3>📌 Örnek 6: Map ile Liste</h3>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
        </div>
    )
}

// Örnek 7: Obje dizisi render
function Example7() {
    const users = [
        { id: 1, name: "Ahmet", role: "Developer" },
        { id: 2, name: "Ayşe", role: "Designer" },
        { id: 3, name: "Mehmet", role: "Manager" }
    ]

    return (
        <div className="example-box">
            <h3>📌 Örnek 7: Obje Dizisi Render</h3>
            <div className="user-grid">
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <h4>{user.name}</h4>
                        <p>{user.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Örnek 8: JSX'te yorum satırı
function Example8() {
    return (
        <div className="example-box">
            <h3>📌 Örnek 8: JSX'te Yorum Satırı</h3>
            {/* Bu bir JSX yorumu */}
            <p>Görünen metin</p>
            {/* 
        Çok satırlı
        yorum örneği
      */}
            <p>JSX içinde {/* inline yorum */} normal yorum çalışmaz</p>
        </div>
    )
}

// Örnek 9: Self-closing tags
function Example9() {
    return (
        <div className="example-box">
            <h3>📌 Örnek 9: Self-Closing Tags</h3>
            <p>HTML'de: img, br, hr etiketleri kapatılmaz</p>
            <p>JSX'te: Mutlaka kapatılmalı</p>
            <img src="/vite.svg" alt="Logo" style={{ width: '50px' }} />
            <br />
            <hr />
            <input type="text" placeholder="Input da kapatılmalı" />
        </div>
    )
}

// Örnek 10: JSX kuralları özet
function Example10() {
    return (
        <div className="example-box summary">
            <h3>📌 Örnek 10: JSX Kuralları Özet</h3>
            <ul className="rules-list">
                <li>✅ Tek bir root element döndür (veya Fragment kullan)</li>
                <li>✅ Tüm etiketler kapatılmalı (self-closing dahil)</li>
                <li>✅ class yerine className kullan</li>
                <li>✅ for yerine htmlFor kullan</li>
                <li>✅ JavaScript ifadeleri {'{ }'} içinde</li>
                <li>✅ camelCase naming (onClick, backgroundColor)</li>
                <li>✅ Boolean attributelar: disabled={'{true}'} veya sadece disabled</li>
                <li>✅ Inline style obje olmalı: style={'{{}}'}</li>
            </ul>
        </div>
    )
}

// Ana component - Tüm örnekleri birleştir
export default function JsxBasics() {
    return (
        <div className="jsx-basics">
            <div className="header">
                <h1>📝 JSX Basics - Temel Kavramlar</h1>
                <p className="description">
                    JSX, JavaScript XML'in kısaltmasıdır. React'te HTML benzeri kod yazmamızı sağlar.
                    Aslında JSX, JavaScript koduna dönüştürülür ve tarayıcıda çalışır.
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
                <p>💡 <strong>İpucu:</strong> JSX kullanırken tarayıcı konsolu açık olsun.
                    Hata mesajları JSX hatalarını bulmada çok yardımcı olur!</p>
            </div>
        </div>
    )
}
