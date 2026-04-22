import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Home() {
  const { userId } = useUser()
  const stats = [
    { title: 'Тестов пройдено', value: '1240', icon: '📝' },
    { title: 'Точность ответов', value: '78%', icon: '🎯' },
    { title: 'Прогноз ЕНТ', value: '112', icon: '📈' },
    { title: 'Рост за месяц', value: '+15%', icon: '🚀' },
  ]
  const features = [
    { title: 'AI-анализ ошибок', text: 'Автоматический разбор неточностей и объяснение правильных решений.', icon: '🤖' },
    { title: 'Адаптивное обучение', text: 'Система подбирает вопросы по вашим слабым темам.', icon: '🧩' },
    { title: 'Отслеживание прогресса', text: 'Графики, динамика и персональные метрики обучения.', icon: '📊' },
    { title: 'Умные рекомендации', text: 'Персональный план повторения и тренировок на каждый день.', icon: '💡' },
  ]

  return (
    <div className="px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8 fade-up">
        <section className="ent-card p-8 md:p-12 relative overflow-hidden text-center">
          <div className="absolute -top-16 right-20 h-56 w-56 rounded-full bg-violet-200/60 blur-3xl" />
          <span className="ent-pill border-violet-200 bg-violet-50 text-violet-700 mb-4">✨ Powered by AI</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            <span className="ent-gradient-text">AI-тренажер</span> подготовки к ЕНТ
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4">
            Современная платформа для умной подготовки: адаптивные тесты, прогнозы, аналитика и AI-разбор ошибок.
          </p>
          <div className="flex justify-center flex-wrap gap-3 mt-8">
            <Link to={userId ? '/tests' : '/register'} className="ent-gradient-btn rounded-xl px-6 py-3 font-semibold">
              {userId ? 'Начать тест' : 'Начать бесплатно'}
            </Link>
            <Link
              to={userId ? '/progress' : '/about'}
              className="rounded-xl px-6 py-3 font-semibold border border-violet-200 bg-white/70 text-violet-700 hover:bg-violet-50 transition-colors"
            >
              {userId ? 'Смотреть прогресс' : 'Узнать больше'}
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div key={item.title} className="ent-card p-5 hover-lift hover:shadow-violet-200">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-3xl font-extrabold ent-gradient-text">{item.value}</p>
              <p className="text-sm text-slate-500 mt-1">{item.title}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Возможности платформы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((item) => (
              <div key={item.title} className="ent-card p-6 hover-lift">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home

