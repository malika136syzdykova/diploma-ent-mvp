import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Home from './pages/Home'
import Test from './pages/Test'
import Tests from './pages/Tests'
import Progress from './pages/Progress'
import Register from './pages/Register'
import Login from './pages/Login'
import Prediction from './pages/Prediction'
import Layout from './components/Layout'
import AIChat from './pages/AIChat'
import About from './pages/About'

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/test" element={<Test />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  )
}

export default App

