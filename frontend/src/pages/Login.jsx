import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка входа')
      }

      login(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Ошибка при входе. Попробуйте еще раз.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[72vh] flex items-center justify-center px-4 fade-up">
      <div className="max-w-md w-full ent-card p-8">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center text-2xl mx-auto mb-3">
          🧠
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 text-center">AI-тренажер ЕНТ</h2>
        <p className="text-center text-sm text-slate-600 mb-6">Войдите в свой аккаунт</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Введите пароль"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500"
              >
                {showPassword ? 'Скрыть' : 'Показать'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full ent-gradient-btn disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">ИЛИ</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button className="w-full border border-slate-300 rounded-lg py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          Войти через Google
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Тестовый пользователь: `nurkhan@example.com` / пароль `123456`
        </p>
      </div>
    </div>
  )
}

export default Login


