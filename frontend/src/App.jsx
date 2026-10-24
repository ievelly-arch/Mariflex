import { Routes, Route } from 'react-router-dom'
import Home from './Componentes/Home/Home'
import Login from './Componentes/Login/Login'
import Cadastro from './Componentes/Cadastro/Cadastro'
import Carrinho from './Componentes/Carrinho/Carrinho'
import Catalogo from './Componentes/Catalogo/Catalogo'
import Perfil from './Componentes/Perfil/perfil'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  )
}

export default App