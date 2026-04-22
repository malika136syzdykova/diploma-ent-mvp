import { Link } from 'react-router-dom'

function Tests() {
  const subjects = [
    {
      key: 'math',
      title: 'Математическая грамотность',
      description: 'Логика, базовые вычисления и практические задачи.',
      icon: '🧮',
      questions: 10,
    },
    {
      key: 'history',
      title: 'История Казахстана',
      description: 'Ключевые события, даты, личности и исторические процессы.',
      icon: '🏛️',
      questions: 20,
    },
    {
      key: 'reading',
      title: 'Грамотность чтения',
      description: 'Понимание текста, анализ и интерпретация информации.',
      icon: '📘',
      questions: 10,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-up">
      <h1 className="text-3xl font-black text-slate-900 mb-2">
        Выберите <span className="ent-gradient-text">предмет</span>
      </h1>
      <p className="text-slate-600 mb-8">Запустите тест и получите разбор ошибок от AI-ассистента.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {subjects.map((subject) => (
          <div key={subject.key} className="ent-card p-6 hover-lift flex flex-col">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center text-2xl mb-4">
              {subject.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{subject.title}</h2>
            <p className="text-sm text-slate-600 mt-2 flex-1">{subject.description}</p>
            <p className="text-xs text-slate-500 mt-3">{subject.questions} вопросов</p>
            <Link
              to={`/test?subject=${encodeURIComponent(subject.title)}`}
              className="w-full text-center ent-gradient-btn rounded-xl py-3 mt-4 font-semibold"
            >
              Начать тест
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tests
