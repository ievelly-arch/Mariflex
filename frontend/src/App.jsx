import { Routes, Route } from 'react-router-dom'
import Home from './Componentes/Home/Home'
import Login from './Componentes/Login/Login'
import Cadastro from './Componentes/Cadastro/Cadastro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  )
}

export default App