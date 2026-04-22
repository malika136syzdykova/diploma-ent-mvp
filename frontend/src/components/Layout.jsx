import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useState } from 'react'

function Layout({ children }) {
  const { userId, userName, logout } = useUser()
  const [chatOpen, setChatOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/tests', label: 'Тесты' },
    { to: '/progress', label: 'Прогресс' },
    { to: '/prediction', label: 'Прогноз' },
    { to: '/about', label: 'О проекте' },
  ]

  return (
    <div className="min-h-screen">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold">
                🧠
              </div>
              <Link to="/" className="text-lg font-extrabold tracking-tight text-slate-900">
                AI-тренажер ЕНТ
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3 relative">
              {userId ? (
                <>
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold"
                    title="Профиль"
                  >
                    {(userName || 'U').slice(0, 1).toUpperCase()}
                  </button>
                  {menuOpen && (
                    <div className="absolute top-12 right-0 w-60 ent-card p-3 z-40">
                      <p className="font-semibold text-slate-900">{userName || `ID: ${userId}`}</p>
                      <p className="text-xs text-slate-500 mb-3">
                        {userName ? `${userName.toLowerCase()}@ent-ai.kz` : `user${userId}@ent-ai.kz`}
                      </p>
                      <Link
                        to="/progress"
                        className="block text-sm py-2 px-2 rounded-lg hover:bg-violet-50 text-slate-700"
                        onClick={() => setMenuOpen(false)}
                      >
                        Мой прогресс
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full mt-1 text-left text-sm py-2 px-2 rounded-lg hover:bg-red-50 text-red-600"
                      >
                        Выйти
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm ent-gradient-btn px-4 py-2 rounded-lg"
                >
                  Войти
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <div className="fixed right-4 bottom-4 z-30">
        {chatOpen && (
          <div className="w-[340px] ent-card p-4 mb-3 fade-up">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-900">AI Разбор ошибок</h3>
                <p className="text-xs text-slate-500">ЕНТ помощник</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="bg-slate-100 rounded-xl px-3 py-2 text-slate-700 max-w-[85%]">
                Привет! Я помогу разобрать ошибки и предложу план подготовки.
              </p>
              <p className="bg-violet-600 text-white rounded-xl px-3 py-2 ml-auto max-w-[85%]">
                Почему я ошибаюсь в теме История Казахстана?
              </p>
              <p className="bg-slate-100 rounded-xl px-3 py-2 text-slate-700 max-w-[85%]">
                Сделай 10 вопросов по теме и повтори ключевые даты. Фокус: точность формулировок.
              </p>
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                disabled
                placeholder="Скоро: чат с ИИ..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
              <button className="rounded-xl ent-gradient-btn px-3 py-2 text-sm">➤</button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen((v) => !v)}
          className="h-14 w-14 rounded-full ent-gradient-btn flex items-center justify-center text-xl animate-pulse"
        >
          💬
        </button>
      </div>
    </div>
  )
}

export default Layout

