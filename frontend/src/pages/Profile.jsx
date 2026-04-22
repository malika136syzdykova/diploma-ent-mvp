import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Profile() {
  const { userId, userName, userAvatar, targetScore, login } = useUser()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [goal, setGoal] = useState(100)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }
    setName(userName || '')
    setAvatar(userAvatar || '')
    setGoal(targetScore || 100)
  }, [userId, userName, userAvatar, targetScore, navigate])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          avatar,
          target_score: Number(goal),
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка сохранения профиля')
      }
      login(data.user)
    } catch (err) {
      setError(err.message || 'Ошибка сохранения профиля')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="ent-card p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Профиль</h1>
        <p className="text-slate-600 mb-6">Имя, аватар и целевой балл ЕНТ</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Имя</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Аватар (URL)</label>
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Целевой балл ЕНТ</label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              min={1}
              max={140}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <button className="ent-gradient-btn px-6 py-3 rounded-lg font-semibold" disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить профиль'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
