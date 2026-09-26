import { Routes, Route } from 'react-router-dom'
import Login from './Componentes/Login/Login'
import Cadastro from './Componentes/Cadastro/Cadastro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Mariflex</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  )
}

export default App