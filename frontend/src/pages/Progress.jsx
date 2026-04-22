import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Progress() {
  const { userId } = useUser()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null)
  const [subjectPredictions, setSubjectPredictions] = useState([])
  const [subjectsLoading, setSubjectsLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  const subjects = [
    'Математическая грамотность',
    'Грамотность чтения',
    'История Казахстана',
  ]

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }
    fetchProgress()
    fetchSubjectPredictions()
  }, [userId, navigate])

  const fetchProgress = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/progress/${userId}`)
      const data = await response.json()
      setProgress(data)
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubjectPredictions = async () => {
    setSubjectsLoading(true)
    try {
      const responses = await Promise.all(
        subjects.map(async (subjectName) => {
          const response = await fetch(
            `/api/prediction/${userId}?subject=${encodeURIComponent(subjectName)}`,
          )
          if (!response.ok) {
            return { subjectName, error: true, data: null }
          }
          const data = await response.json()
          return { subjectName, error: false, data }
        }),
      )
      setSubjectPredictions(responses)
    } catch (error) {
      console.error('Error fetching subject predictions:', error)
      setSubjectPredictions(subjects.map((subjectName) => ({ subjectName, error: true, data: null })))
    } finally {
      setSubjectsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-gray-600 text-lg">Загрузка прогресса...</div>
      </div>
    )
  }

  if (!progress) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-gray-600 text-lg">Прогресс не найден</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Ваш прогресс</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="ent-card p-6">
          <div className="text-sm text-slate-600 mb-2">Всего вопросов</div>
          <div className="text-3xl font-bold text-violet-600">{progress.total_questions}</div>
        </div>
        <div className="ent-card p-6">
          <div className="text-sm text-slate-600 mb-2">Правильных ответов</div>
          <div className="text-3xl font-bold text-indigo-600">{progress.correct_answers}</div>
        </div>
        <div className="ent-card p-6">
          <div className="text-sm text-slate-600 mb-2">Процент правильности</div>
          <div className="text-3xl font-bold text-violet-700">
            {progress.percentage.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="ent-card p-6 mb-8">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">Общий прогресс</span>
          <span className="text-sm font-semibold text-slate-900">
            {progress.correct_answers} / {progress.total_questions}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-violet-600 to-indigo-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Баллы по подтемам</h2>
      {subjectsLoading ? (
        <div className="ent-card p-6 text-slate-600">Загрузка аналитики по предметам...</div>
      ) : (
        <div className="space-y-6">
          {subjectPredictions.map((item) => {
            if (item.error || !item.data) {
              return (
                <div key={item.subjectName} className="ent-card p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.subjectName}</h3>
                  <p className="text-slate-500">Данные по предмету пока недоступны.</p>
                </div>
              )
            }

            const sections = item.data.section_scores || []
            const maxScore = sections.reduce((sum, section) => sum + (section.weight || 0), 0)
            const totalScore = item.data.predicted_score || 0
            const accuracy = maxScore > 0 ? (totalScore / maxScore) * 100 : 0

            return (
              <div key={item.subjectName} className="ent-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">{item.subjectName}</h3>
                  <p className="text-slate-600">
                    Освоено <span className="font-semibold text-violet-700">{totalScore.toFixed(1)} / {maxScore}</span>
                    {' '}· точность {accuracy.toFixed(0)}%
                  </p>
                </div>

                <div className="space-y-5">
                  {sections.map((section, idx) => (
                    <div key={`${item.subjectName}-${idx}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
                        <p className="font-semibold text-slate-900">{section.section_name}</p>
                        <p className="text-sm text-slate-500">
                          Вес темы: {section.weight} · Освоенность: {(section.mastery * 100).toFixed(0)}% · Балл:{' '}
                          <span className="text-violet-700 font-semibold">{section.score.toFixed(1)} / {section.weight}</span>
                        </p>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-600"
                          style={{ width: `${Math.max(0, Math.min(100, section.mastery * 100))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {progress.wrong_questions && progress.wrong_questions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Последние ошибки ({progress.wrong_questions.length})
          </h2>
          <div className="space-y-6">
            {progress.wrong_questions.map((q, index) => (
              <div key={index} className="ent-card p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {q.question_text}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {q.options && q.options.length > 0 ? (
                      q.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 border-2 rounded-lg ${
                            option === q.correct_answer
                              ? 'border-violet-500 bg-violet-50'
                              : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {option === q.correct_answer && (
                              <span className="text-violet-600 mr-2 font-bold">✓</span>
                            )}
                            <span className="text-slate-700">{option}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500 text-sm">Варианты ответов не загружены</div>
                    )}
                  </div>
                </div>
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-4">
                  <div className="text-sm font-medium text-violet-900 mb-1">
                    Правильный ответ:
                  </div>
                  <div className="text-violet-800 font-semibold">{q.correct_answer}</div>
                </div>
                {q.explanation && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-slate-700 mb-1">Объяснение:</div>
                    <div className="text-slate-700">{q.explanation}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Progress

