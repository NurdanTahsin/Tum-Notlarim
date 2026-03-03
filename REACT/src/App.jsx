import { useState } from 'react'
import './App.css'

// Örnekleri hazır olduğunda import et:
import JsxBasics from './01-jsx-basics/index'
import Components from './02-components/index'
import Props from './03-props/index'
// import State from './04-state/index'
// import Events from './05-events/index'
// import ConditionalRendering from './06-conditional-rendering/index'
// import ListsKeys from './07-lists-keys/index'
// import Forms from './08-forms/index'
// import Hooks from './09-hooks/index'
// import Lifecycle from './10-lifecycle/index'

function App() {
  const [activeLesson, setActiveLesson] = useState('home')

  // Örnekleri hazırladıkça buraya ekle:
  const lessons = {
    'jsx-basics': <JsxBasics />,
    'components': <Components />,
    'props': <Props />,
    // 'state': <State />,
    // 'events': <Events />,
    // 'conditional-rendering': <ConditionalRendering />,
    // 'lists-keys': <ListsKeys />,
    // 'forms': <Forms />,
    // 'hooks': <Hooks />,
    // 'lifecycle': <Lifecycle />,
  }

  const menuItems = [
    { id: 'jsx-basics', title: '01 - JSX Basics', emoji: '📝' },
    { id: 'components', title: '02 - Components', emoji: '🧩' },
    { id: 'props', title: '03 - Props', emoji: '📦' },
    { id: 'state', title: '04 - State', emoji: '🔄' },
    { id: 'events', title: '05 - Events', emoji: '🖱️' },
    { id: 'conditional-rendering', title: '06 - Conditional Rendering', emoji: '❓' },
    { id: 'lists-keys', title: '07 - Lists & Keys', emoji: '📋' },
    { id: 'forms', title: '08 - Forms', emoji: '📝' },
    { id: 'hooks', title: '09 - Hooks', emoji: '🪝' },
    { id: 'lifecycle', title: '10 - Lifecycle', emoji: '♻️' },
  ]

  return (
    <div className="app">
      <nav className="sidebar">
        <h2>⚛️ React Dersleri</h2>
        <button
          className={activeLesson === 'home' ? 'active' : ''}
          onClick={() => setActiveLesson('home')}
        >
          🏠 Ana Sayfa
        </button>
        {menuItems.map(item => (
          <button
            key={item.id}
            className={activeLesson === item.id ? 'active' : ''}
            onClick={() => setActiveLesson(item.id)}
            disabled={!lessons[item.id]}
          >
            {item.emoji} {item.title}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeLesson === 'home' ? (
          <div className="home">
            <h1>React Derslerine Hoşgeldin! 🎉</h1>
            <p>Sol menüden bir konu seç ve öğrenmeye başla.</p>
            <div className="info">
              <h3>Nasıl Kullanılır?</h3>
              <ol>
                <li>Bir klasörde çalışmaya başla (örn: <code>01-jsx-basics</code>)</li>
                <li>İçinde <code>index.jsx</code> dosyası oluştur</li>
                <li>Örneklerini yaz</li>
                <li>App.jsx'teki ilgili import ve lessons satırını aktif et</li>
                <li>Sol menüden konunu seç ve çalışır halde gör!</li>
              </ol>
            </div>
          </div>
        ) : lessons[activeLesson] ? (
          lessons[activeLesson]
        ) : (
          <div className="placeholder">
            <h2>Bu ders henüz hazır değil 🚧</h2>
            <p>Klasörde <code>index.jsx</code> oluştur ve örneklerini yaz.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
