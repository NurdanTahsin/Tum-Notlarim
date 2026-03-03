import { useState } from 'react'
import './styles.css'

// State - React'te Durum Yönetimi

// Örnek 1: Basit useState Kullanımı
function Example1() {
    const [count, setCount] = useState(0)

    return (
        <div className="example-box">
            <h3>📌 Örnek 1: Basit useState</h3>
            <p className="count-display">Sayaç: {count}</p>
            <button className="btn-primary" onClick={() => setCount(count + 1)}>
                Artır
            </button>
            <button className="btn-danger" onClick={() => setCount(0)}>
                Sıfırla
            </button>
            <p className="note">💡 useState, component'e durum (state) ekler</p>
        </div>
    )
}

// Örnek 2: Artırma ve Azaltma
function Example2() {
    const [number, setNumber] = useState(50)

    const increment = () => setNumber(number + 1)
    const decrement = () => setNumber(number - 1)
    const reset = () => setNumber(50)

    return (
        <div className="example-box">
            <h3>📌 Örnek 2: Artırma ve Azaltma</h3>
            <div className="counter-display">
                <button className="btn-circle" onClick={decrement}>-</button>
                <span className="number">{number}</span>
                <button className="btn-circle" onClick={increment}>+</button>
            </div>
            <button className="btn-secondary" onClick={reset}>
                Sıfırla (50)
            </button>
            <p className="note">💡 State değişince component yeniden render olur</p>
        </div>
    )
}

// Örnek 3: Input ile State
function Example3() {
    const [name, setName] = useState('')

    return (
        <div className="example-box">
            <h3>📌 Örnek 3: Input ile State</h3>
            <input
                type="text"
                className="input-field"
                placeholder="Adınızı girin"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {name && <p className="greeting-text">Merhaba, {name}! 👋</p>}
            <button className="btn-secondary" onClick={() => setName('')}>
                Temizle
            </button>
            <p className="note">💡 Input değeri state'te tutulur (Controlled Input)</p>
        </div>
    )
}

// Örnek 4: Toggle/Boolean State
function Example4() {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="example-box">
            <h3>📌 Örnek 4: Toggle (Aç/Kapa)</h3>
            <button
                className="btn-primary"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? 'Gizle' : 'Göster'}
            </button>
            {isVisible && (
                <div className="message-box">
                    <p>🎉 Bu bir gizli mesaj!</p>
                    <p>Toggle ile gösteriliyor</p>
                </div>
            )}
            <p className="note">💡 Boolean state ile göster/gizle yapabiliriz</p>
        </div>
    )
}

// Örnek 5: Object State
function Example5() {
    const [user, setUser] = useState({
        name: 'Ahmet',
        age: 25,
        city: 'İstanbul'
    })

    const updateName = () => {
        setUser({ ...user, name: 'Mehmet' })
    }

    const updateAge = () => {
        setUser({ ...user, age: user.age + 1 })
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 5: Object State</h3>
            <div className="user-info">
                <p><strong>İsim:</strong> {user.name}</p>
                <p><strong>Yaş:</strong> {user.age}</p>
                <p><strong>Şehir:</strong> {user.city}</p>
            </div>
            <button className="btn-primary" onClick={updateName}>
                İsmi Değiştir
            </button>
            <button className="btn-primary" onClick={updateAge}>
                Yaşı Artır
            </button>
            <p className="note">💡 Object state'i güncellerken spread operator (...) kullan</p>
        </div>
    )
}

// Örnek 6: Array State
function Example6() {
    const [items, setItems] = useState(['React', 'JavaScript'])
    const [newItem, setNewItem] = useState('')

    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem])
            setNewItem('')
        }
    }

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index))
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 6: Array State (Liste)</h3>
            <div className="add-item-section">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Yeni öğe ekle"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <button className="btn-add" onClick={addItem}>
                    Ekle
                </button>
            </div>
            <ul className="items-list">
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button
                            className="btn-remove"
                            onClick={() => removeItem(index)}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
            <p className="note">💡 Array state'i güncellerken yeni array oluştur</p>
        </div>
    )
}

// Örnek 7: Multiple States
function Example7() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const fullName = `${firstName} ${lastName}`.trim()

    return (
        <div className="example-box">
            <h3>📌 Örnek 7: Birden Fazla State</h3>
            <div className="form-group">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Ad"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Soyad"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {fullName && (
                <div className="result-box">
                    <p><strong>Ad Soyad:</strong> {fullName}</p>
                    <p><strong>Email:</strong> {email}</p>
                </div>
            )}
            <p className="note">💡 Her değişken için ayrı state kullanabiliriz</p>
        </div>
    )
}

// Örnek 8: State ile Koşullu Render
function Example8() {
    const [status, setStatus] = useState('idle')

    const statusConfig = {
        idle: { text: 'Beklemede...', color: '#6b7280', emoji: '⏳' },
        loading: { text: 'Yükleniyor...', color: '#3b82f6', emoji: '🔄' },
        success: { text: 'Başarılı!', color: '#10b981', emoji: '✅' },
        error: { text: 'Hata oluştu!', color: '#ef4444', emoji: '❌' }
    }

    const current = statusConfig[status]

    return (
        <div className="example-box">
            <h3>📌 Örnek 8: State ile Koşullu Render</h3>
            <div
                className="status-box"
                style={{ backgroundColor: current.color }}
            >
                <span className="status-emoji">{current.emoji}</span>
                {current.text}
            </div>
            <div className="button-group">
                <button className="btn-small" onClick={() => setStatus('idle')}>
                    Beklemede
                </button>
                <button className="btn-small" onClick={() => setStatus('loading')}>
                    Yükleniyor
                </button>
                <button className="btn-small" onClick={() => setStatus('success')}>
                    Başarılı
                </button>
                <button className="btn-small" onClick={() => setStatus('error')}>
                    Hata
                </button>
            </div>
            <p className="note">💡 State'e göre farklı görünümler gösterebiliriz</p>
        </div>
    )
}

// Örnek 9: Previous State Kullanımı
function Example9() {
    const [count, setCount] = useState(0)

    const increment = () => {
        // ✅ DOĞRU: Previous state kullan
        setCount(prevCount => prevCount + 1)
    }

    const multipleIncrement = () => {
        // Bu 3 kez çalışır çünkü previous state kullanıyoruz
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 9: Previous State</h3>
            <p className="count-display">Sayaç: {count}</p>
            <button className="btn-primary" onClick={increment}>
                +1 Artır
            </button>
            <button className="btn-success" onClick={multipleIncrement}>
                +3 Artır
            </button>
            <button className="btn-danger" onClick={() => setCount(0)}>
                Sıfırla
            </button>
            <p className="note">💡 State'i kendisine göre güncellerken prev kullan</p>
        </div>
    )
}

// Örnek 10: State Kuralları
function Example10() {
    return (
        <div className="example-box summary">
            <h3>📌 Örnek 10: State Kuralları ve Best Practices</h3>
            <div className="rules-grid">
                <div className="rule-card">
                    <h4>✅ useState Hook'u</h4>
                    <p>Component'in en üstünde kullan</p>
                    <code>const [state, setState] = useState(initialValue)</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Immutability</h4>
                    <p>State'i direkt değiştirme, yeni değer oluştur</p>
                    <code>❌ state.push() | ✅ setState([...state, item])</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Asenkron Güncellemeler</h4>
                    <p>setState asenkron çalışır, hemen güncellemez</p>
                    <code>setState(value) // Sonra çalışır</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Previous State</h4>
                    <p>State'i kendine göre güncellerken prev kullan</p>
                    <code>setState(prev =&gt; prev + 1)</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Object/Array State</h4>
                    <p>Güncellerken spread operator kullan</p>
                    <code>setState({"{...state, key: newValue}"})</code>
                </div>
                <div className="rule-card">
                    <h4>✅ Koşullu Hook Kullanma</h4>
                    <p>Hook'ları if/loop içinde kullanma</p>
                    <code>❌ if (condition) useState()</code>
                </div>
            </div>
            <div className="tip-box">
                <h4>💡 State vs Props</h4>
                <div className="comparison">
                    <div className="comparison-col">
                        <h5>State</h5>
                        <ul>
                            <li>Component içinde tanımlanır</li>
                            <li>Component tarafından yönetilir</li>
                            <li>Değiştirilebilir (mutable)</li>
                            <li>Değişince re-render olur</li>
                        </ul>
                    </div>
                    <div className="comparison-col">
                        <h5>Props</h5>
                        <ul>
                            <li>Parent'tan gelir</li>
                            <li>Parent tarafından yönetilir</li>
                            <li>Değiştirilemez (immutable)</li>
                            <li>Yeni props gelince re-render olur</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Ana component - Tüm örnekleri birleştir
export default function State() {
    return (
        <div className="state-page">
            <div className="header">
                <h1>🔄 State - Durum Yönetimi</h1>
                <p className="description">
                    State, React component'lerinin sahip olduğu ve yönetebildiği verilerdir.
                    Props'tan farklı olarak, state component içinde tanımlanır ve değiştirilebilir.
                    State değiştiğinde React otomatik olarak component'i yeniden render eder.
                    useState hook'u ile functional component'lere state özelliği kazandırırız.
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
                <p>💡 <strong>Önemli:</strong> State, React'in en temel kavramlarından biridir.
                    State yönetiminde immutability prensibine dikkat et, component'lerin performansını
                    optimize etmek için gereksiz re-render'lardan kaçın!</p>
            </div>
        </div>
    )
}
