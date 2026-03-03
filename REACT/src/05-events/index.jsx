import { useState, useEffect } from 'react'
import './styles.css'

// useEffect - Component Lifecycle ve Yan Etkiler

// Örnek 1: Dependency Array'in 3 Farklı Kullanımı
function Example1() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    // 1. Boş array [] -> Sadece component mount olduğunda (ilk render)
    useEffect(() => {
        console.log('✅ Component ilk kez yüklendi (Mount)')
    }, [])

    // 2. Dependency ile [count] -> count her değiştiğinde
    useEffect(() => {
        console.log('🔄 Count değişti:', count)
    }, [count])

    // 3. Dependency yok -> Her render'da (dikkatli kullan!)
    useEffect(() => {
        console.log('⚡ Component render oldu')
    })

    return (
        <div className="example-box">
            <h3>📌 Örnek 1: Dependency Array'in 3 Türü</h3>
            <p className="info">Console'u aç ve farkları gözlemle!</p>

            <div className="controls-group">
                <div>
                    <p className="count-display">Sayaç: {count}</p>
                    <button className="btn-primary" onClick={() => setCount(count + 1)}>
                        Artır (useEffect tetiklenir)
                    </button>
                </div>

                <div>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="İsim yaz"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="note">İsim yazdığında sadece 3. useEffect çalışır</p>
                </div>
            </div>

            <div className="code-explanation">
                <h4>📝 Kullanım:</h4>
                <pre className="code-block">
                    {`useEffect(() => {...}, [])      // 1 kez (mount)
useEffect(() => {...}, [count]) // count değişince
useEffect(() => {...})          // her render`}
                </pre>
            </div>
        </div>
    )
}

// Örnek 2: Cleanup Function - Timer ve Memory Leak Önleme
function Example2() {
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        let interval = null

        if (isActive) {
            // Timer başlat
            interval = setInterval(() => {
                setSeconds(s => s + 1)
            }, 1000)
            console.log('⏱️ Timer başlatıldı')
        }

        // CLEANUP FUNCTION: Component unmount olduğunda veya isActive değiştiğinde
        return () => {
            if (interval) {
                clearInterval(interval)
                console.log('🧹 Timer temizlendi (memory leak önlendi)')
            }
        }
    }, [isActive]) // isActive her değiştiğinde cleanup çalışır

    const reset = () => {
        setSeconds(0)
        setIsActive(false)
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 2: Cleanup Function (Temizlik)</h3>

            <div className="timer-display">
                {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
            </div>

            <div className="button-group">
                <button
                    className={isActive ? "btn-danger" : "btn-success"}
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? '⏸️ Durdur' : '▶️ Başlat'}
                </button>
                <button className="btn-secondary" onClick={reset}>
                    🔄 Sıfırla
                </button>
            </div>

            <div className="warning-box">
                <strong>⚠️ Önemli:</strong> Timer, event listener, subscription gibi işlemleri
                cleanup function ile temizlemezsen <strong>memory leak</strong> olur!
            </div>

            <div className="code-explanation">
                <h4>📝 Cleanup Pattern:</h4>
                <pre className="code-block">
                    {`useEffect(() => {
  const interval = setInterval(...)
  
  return () => {
    clearInterval(interval) // Temizlik
  }
}, [dependency])`}
                </pre>
            </div>
        </div>
    )
}

// Örnek 3: API'den Veri Çekme (Async/Await)
function Example3() {
    const [userId, setUserId] = useState(1)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        // useEffect içinde direkt async yazamazsın, ama içeride tanımlayabilirsin
        const fetchUser = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                if (!response.ok) throw new Error('Kullanıcı bulunamadı')

                const data = await response.json()
                setUser(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [userId]) // userId değişince yeni veri çek

    return (
        <div className="example-box">
            <h3>📌 Örnek 3: API'den Veri Çekme (Async/Await)</h3>

            <div className="user-selector">
                <label>Kullanıcı ID:</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="input-field"
                />
            </div>

            {loading && <p className="loading">🔄 Yükleniyor...</p>}

            {error && <p className="error">❌ Hata: {error}</p>}

            {user && !loading && (
                <div className="user-card">
                    <h4>👤 {user.name}</h4>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Telefon:</strong> {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                    <p><strong>Şehir:</strong> {user.address.city}</p>
                    <p><strong>Firma:</strong> {user.company.name}</p>
                </div>
            )}

            <div className="code-explanation">
                <h4>📝 Async Pattern:</h4>
                <pre className="code-block">
                    {`useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      setState(data)
    } catch (err) {
      setError(err)
    }
  }
  fetchData()
}, [dependency])`}
                </pre>
            </div>
        </div>
    )
}

// Örnek 4: DOM Manipülasyonu (Document Title)
function Example4() {
    const [notificationCount, setNotificationCount] = useState(0)

    useEffect(() => {
        // Sekme başlığını güncelle
        if (notificationCount > 0) {
            document.title = `(${notificationCount}) Yeni Bildirim`
        } else {
            document.title = 'React Dersleri'
        }

        // Cleanup: Component unmount olunca eski başlığa dön
        return () => {
            document.title = 'React Dersleri'
        }
    }, [notificationCount])

    return (
        <div className="example-box">
            <h3>📌 Örnek 4: DOM Manipülasyonu</h3>
            <p className="info">👆 Sekme başlığına bak!</p>

            <div className="notification-display">
                <span className="badge">{notificationCount}</span>
                <span>Bildirim</span>
            </div>

            <div className="button-group">
                <button
                    className="btn-primary"
                    onClick={() => setNotificationCount(notificationCount + 1)}
                >
                    ➕ Bildirim Ekle
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => setNotificationCount(0)}
                >
                    🗑️ Temizle
                </button>
            </div>

            <div className="tip-box">
                <strong>💡 Kullanım Alanları:</strong>
                <ul>
                    <li>document.title güncelleme</li>
                    <li>body'ye class ekleme (dark mode)</li>
                    <li>Scroll pozisyonu ayarlama</li>
                    <li>Focus yönetimi</li>
                </ul>
            </div>
        </div>
    )
}

// Örnek 5: localStorage ile Kalıcı State
function Example5() {
    // Lazy initialization: İlk renderda localStorage'dan oku
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    })
    const [input, setInput] = useState('')

    // Her todos değiştiğinde localStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
        console.log('💾 localStorage güncellendi:', todos.length, 'görev')
    }, [todos])

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, done: false }])
            setInput('')
        }
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div className="example-box">
            <h3>📌 Örnek 5: localStorage ile Kalıcı Veri</h3>

            <div className="todo-input-group">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Yeni görev..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button className="btn-success" onClick={addTodo}>
                    ➕ Ekle
                </button>
            </div>

            <div className="todo-list">
                {todos.map(todo => (
                    <div key={todo.id} className="todo-item">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span className={todo.done ? 'done' : ''}>{todo.text}</span>
                        <button
                            className="btn-delete"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            {todos.length === 0 && (
                <p className="info">Henüz görev yok. Bir tane ekle!</p>
            )}

            <div className="tip-box">
                <strong>🔄 Sayfayı yenile:</strong> Todo'lar kaybolmayacak!
                localStorage sayesinde tarayıcıda kalıcı olarak saklanıyor.
            </div>
        </div>
    )
}

// Örnek 6: Event Listener (Keyboard & Window)
function Example6() {
    const [key, setKey] = useState('')
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    // Klavye event'i
    useEffect(() => {
        const handleKeyPress = (e) => {
            setKey(`${e.key} (${e.code})`)
        }

        window.addEventListener('keydown', handleKeyPress)

        // Cleanup: Event listener'ı kaldır
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    // Window resize event'i
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="example-box">
            <h3>📌 Örnek 6: Event Listener'lar</h3>

            <div className="event-display">
                <div className="event-box">
                    <h4>⌨️ Klavye</h4>
                    <p className="key-display">{key || 'Bir tuşa bas...'}</p>
                </div>

                <div className="event-box">
                    <h4>🖥️ Pencere Boyutu</h4>
                    <p><strong>Genişlik:</strong> {windowSize.width}px</p>
                    <p><strong>Yükseklik:</strong> {windowSize.height}px</p>
                </div>
            </div>

            <div className="warning-box">
                <strong>⚠️ Kritik:</strong> Event listener'ları mutlaka cleanup function
                ile kaldır! Aksi halde her render'da yeni listener eklenir ve
                <strong> memory leak</strong> oluşur.
            </div>

            <div className="code-explanation">
                <h4>📝 Event Pattern:</h4>
                <pre className="code-block">
                    {`useEffect(() => {
  const handler = (e) => {...}
  window.addEventListener('event', handler)
  
  return () => {
    window.removeEventListener('event', handler)
  }
}, [])`}
                </pre>
            </div>
        </div>
    )
}

// Örnek 7: useEffect Kuralları ve Best Practices
function Example7() {
    return (
        <div className="example-box summary">
            <h3>📌 Örnek 7: useEffect Kuralları</h3>

            <div className="rules-grid">
                <div className="rule-card good">
                    <h4>✅ Doğru Kullanım</h4>
                    <ul>
                        <li><strong>API çağrıları</strong> useEffect içinde</li>
                        <li><strong>Cleanup function</strong> her zaman kullan</li>
                        <li><strong>Dependency array</strong> eksiksiz belirt</li>
                        <li><strong>Async/await</strong> için içeride fonksiyon tanımla</li>
                        <li><strong>Loading state</strong> ile kullanıcı bilgilendir</li>
                    </ul>
                </div>

                <div className="rule-card bad">
                    <h4>❌ Yanlış Kullanım</h4>
                    <ul>
                        <li>useEffect içinde <strong>sonsuz döngü</strong> oluşturma</li>
                        <li><strong>Dependency array</strong> atlamak</li>
                        <li>Cleanup function <strong>yazmamak</strong></li>
                        <li>useEffect'i <strong>conditional</strong> kullanmak</li>
                        <li>Direkt <strong>async useEffect</strong> yazmak</li>
                    </ul>
                </div>
            </div>

            <div className="lifecycle-section">
                <h4>🔄 Component Lifecycle</h4>
                <div className="lifecycle-flow">
                    <div className="flow-step">
                        <strong>1️⃣ Mount</strong>
                        <p>Component ilk kez oluşturulur</p>
                        <code>useEffect(() =&gt; {'{...}'}, [])</code>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step">
                        <strong>2️⃣ Update</strong>
                        <p>State veya props değişir</p>
                        <code>useEffect(() =&gt; {'{...}'}, [dep])</code>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step">
                        <strong>3️⃣ Unmount</strong>
                        <p>Component DOM'dan kaldırılır</p>
                        <code>return () =&gt; {'{...}'}</code>
                    </div>
                </div>
            </div>

            <div className="common-patterns">
                <h4>📚 Yaygın Kullanım Senaryoları</h4>
                <div className="pattern-grid">
                    <div className="pattern-item">
                        <span className="pattern-icon">🌐</span>
                        <strong>API Fetching</strong>
                        <p>Veri çekme ve loading state</p>
                    </div>
                    <div className="pattern-item">
                        <span className="pattern-icon">⏱️</span>
                        <strong>Timer/Interval</strong>
                        <p>Zaman tabanlı işlemler</p>
                    </div>
                    <div className="pattern-item">
                        <span className="pattern-icon">🎧</span>
                        <strong>Event Listeners</strong>
                        <p>Klavye, mouse, scroll</p>
                    </div>
                    <div className="pattern-item">
                        <span className="pattern-icon">💾</span>
                        <strong>localStorage</strong>
                        <p>Kalıcı veri saklama</p>
                    </div>
                    <div className="pattern-item">
                        <span className="pattern-icon">🎨</span>
                        <strong>DOM Manipulation</strong>
                        <p>Title, class, focus</p>
                    </div>
                    <div className="pattern-item">
                        <span className="pattern-icon">📡</span>
                        <strong>Subscriptions</strong>
                        <p>WebSocket, events</p>
                    </div>
                </div>
            </div>

            <div className="tip-box-large">
                <h4>💡 Önemli Notlar</h4>
                <div className="tips-content">
                    <div className="tip-item">
                        <strong>1. Dependency Array boş [] ise:</strong>
                        <p>useEffect sadece component mount olduğunda <strong>1 kez</strong> çalışır.
                            API çağrıları, event listener kurma gibi işlemler için idealdir.</p>
                    </div>
                    <div className="tip-item">
                        <strong>2. Dependency Array'e state/prop ekle:</strong>
                        <p>useEffect içinde kullandığın her state ve prop değişkenini dependency array'e ekle.
                            React bunu otomatik kontrol eder, uyarı verirse dinle!</p>
                    </div>
                    <div className="tip-item">
                        <strong>3. Cleanup her zaman kullan:</strong>
                        <p>Timer, event listener, subscription gibi işlemlerde cleanup function zorunlu.
                            Memory leak ve bug'ların %80'i cleanup yazmamaktan kaynaklanır!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Ana Component
export default function UseEffect() {
    return (
        <div className="useeffect-page">
            <div className="header">
                <h1>⚡ useEffect Hook</h1>
                <p className="description">
                    <strong>useEffect</strong>, React component'lerinin "yan etkileri" (side effects)
                    yönetmek için kullanılan en önemli Hook'lardan biridir. API çağrıları, timer'lar,
                    event listener'lar, DOM manipülasyonu ve dış sistemlerle etkileşim useEffect ile yapılır.
                </p>
                <p className="description">
                    Component'in <strong>lifecycle</strong>'ı boyunca (mount, update, unmount)
                    kod çalıştırmamızı sağlar. Doğru kullanıldığında güçlü, yanlış kullanıldığında
                    performans sorunlarına ve bug'lara yol açar.
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
            </div>

            <div className="footer-note">
                <p>
                    <strong>🎯 Özet:</strong> useEffect, React'in dış dünyayla etkileşim kurduğu yerdir.
                    Dependency array'i doğru belirle, cleanup function'ları yaz, sonsuz döngülerden kaçın.
                    Bu 3 kuralı hatırlarsan useEffect'te ustalaşırsın! 🚀
                </p>
            </div>
        </div>
    )
}
