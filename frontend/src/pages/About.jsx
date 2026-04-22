import { Link } from 'react-router-dom'

function About() {
  const capabilities = [
    'Адаптивные тесты в формате ЕНТ',
    'AI-разбор ошибок и объяснений',
    'Прогноз итогового результата',
    'Дашборды прогресса по темам',
    'Персональные рекомендации',
    'Единый учебный трек по целям',
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 fade-up">
      <section className="ent-card p-8 md:p-10 text-center">
        <span className="ent-pill border-violet-200 bg-violet-50 text-violet-700 mb-4">О проекте</span>
        <h1 className="text-4xl font-black ent-gradient-text mb-3">AI-тренажер ЕНТ</h1>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Платформа объединяет тестирование, аналитику и искусственный интеллект, чтобы готовиться к ЕНТ
          быстрее и эффективнее.
        </p>
      </section>

      <section className="ent-card p-6 bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white">
        <h2 className="text-2xl font-bold mb-2">Наша миссия</h2>
        <p className="text-violet-50">
          Дать каждому ученику персонального AI-наставника, который объясняет ошибки, показывает
          прогресс и строит реальный путь к высокому баллу.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Возможности</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {capabilities.map((item) => (
            <div key={item} className="ent-card p-4 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Технологии</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="ent-card p-5"><p className="font-semibold">React + Tailwind</p><p className="text-sm text-slate-600">Современный и быстрый UI.</p></div>
          <div className="ent-card p-5"><p className="font-semibold">Go + Gin</p><p className="text-sm text-slate-600">Надежный backend для API.</p></div>
          <div className="ent-card p-5"><p className="font-semibold">SQLite + GORM</p><p className="text-sm text-slate-600">Хранение тестов и прогресса.</p></div>
        </div>
      </section>

      <section className="ent-card p-7 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Готовы начать?</h3>
        <p className="text-slate-600 mb-5">Запустите свой первый тест и получите AI-разбор ошибок.</p>
        <Link to="/tests" className="ent-gradient-btn px-6 py-3 rounded-xl font-semibold">Начать тест</Link>
      </section>
    </div>
  )
}

export default About
