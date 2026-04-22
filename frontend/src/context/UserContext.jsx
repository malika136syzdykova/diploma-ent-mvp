import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const refreshUser = async () => {
    if (!user?.id) return
    try {
      const response = await fetch(`/api/users/${user.id}`)
      if (!response.ok) return
      const data = await response.json()
      login(data.user)
    } catch (e) {
      console.error('Failed to refresh user', e)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userId: user?.id || null,
        userName: user?.name || null,
        userEmail: user?.email || null,
        userAvatar: user?.avatar || '',
        targetScore: user?.target_score || 0,
        login,
        refreshUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}


