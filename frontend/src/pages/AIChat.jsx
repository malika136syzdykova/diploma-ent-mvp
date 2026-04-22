import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function buildAutoReviewMessage(testReview) {
  if (!testReview) {
    return 'Данные последнего теста не найдены. Пройдите вопрос в разделе "Тест", и я сразу разберу ошибки.'
  }

  const verdict = testReview.isCorrect ? 'Ответ верный.' : 'Есть ошибка в ответе.'
  const tip = testReview.isCorrect
    ? 'Чтобы закрепить результат, решите еще 3-5 похожих вопросов по этой теме.'
    : 'Сфокусируйтесь на логике выбора правильного варианта и повторите тему на коротком конспекте.'

  return [
    `Разбор по теме "${testReview.topic}" (${testReview.subject})`,
    `Вопрос: ${testReview.questionText}`,
    `Ваш ответ: ${testReview.selectedAnswer || '—'}`,
    `Правильный ответ: ${testReview.correctAnswer || '—'}`,
    verdict,
    testReview.explanation ? `Пояснение: ${testReview.explanation}` : 'Пояснение от системы пока отсутствует.',
    `Рекомендация: ${tip}`,
  ].join('\n')
}

function generateAssistantReply(input, testReview) {
  const prompt = input.toLowerCase()
  if (prompt.includes('план') || prompt.includes('что делать')) {
    return 'План на сегодня: 1) повторите теорию 20 минут, 2) решите 10 задач по этой теме, 3) пересмотрите ошибки и запишите 3 вывода.'
  }
  if (prompt.includes('почему') || prompt.includes('ошиб')) {
    return testReview?.explanation
      ? `Причина ошибки обычно в деталях формулировки. По текущему вопросу: ${testReview.explanation}`
      : 'Чаще всего ошибка связана с невнимательностью к ключевым словам вопроса. Давайте разберем следующий пример.'
  }
  if (prompt.includes('сложно') || prompt.includes('не понимаю')) {
    return 'Разбейте тему на 3 микрошагa: базовые термины -> 2 примера -> мини-тест из 5 вопросов. Так прогресс обычно заметнее.'
  }
  return 'Принято. Рекомендую закрепить тему серией коротких тестов и вернуться сюда для разбора следующих ошибок.'
}

function AIChat() {
  const { userId } = useUser()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const testReview = useMemo(() => state?.testReview || null, [state])

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }

    const intro = {
      id: `assistant-intro-${Date.now()}`,
      role: 'assistant',
      text: buildAutoReviewMessage(testReview),
    }
    setMessages([intro])
  }, [userId, navigate, testReview])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    }
    const assistantMsg = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      text: generateAssistantReply(trimmed, testReview),
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="ent-card p-6 md:p-8">
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI чат: разбор ошибок</h1>
          <p className="text-slate-600 text-sm">
            После тестирования чат автоматически показывает разбор ответа и рекомендации.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 h-[470px] overflow-y-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                message.role === 'assistant'
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-blue-600 text-white ml-auto'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Спросите, что повторить или как улучшить результат..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSend}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 transition-colors"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChat
