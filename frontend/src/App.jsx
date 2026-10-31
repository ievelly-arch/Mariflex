
import { Routes, Route } from 'react-router-dom'
import Home from './Componentes/Home/Home'
import Login from './Componentes/Login/Login'
import Cadastro from './Componentes/Cadastro/Cadastro'
import Carrinho from './Componentes/Carrinho/Carrinho'
import Catalogo from './Componentes/Catalogo/Catalogo'
import Perfil from './Componentes/Perfil/perfil'
import DetalhesProduto from './Componentes/DetalhesProduto/DetalhesProduto'
import RotaProtegida from './Componentes/RotaProtegida/RotaProtegida'
import RotaPublica from './Componentes/RotaPublica/RotaPublica'
import AreaFuncionario from './Componentes/AreaFuncionario/AreaFuncionario'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <RotaPublica>
            <Login />
          </RotaPublica>
        }
      />

      <Route
        path="/cadastro"
        element={
          <RotaPublica>
            <Cadastro />
          </RotaPublica>
        }
      />

      <Route
        path="/carrinho"
        element={
          <RotaProtegida tipoPermitido="cliente">
            <Carrinho />
          </RotaProtegida>
        }
      />

      <Route path="/catalogo" element={<Catalogo />} />

      <Route
        path="/perfil"
        element={
          <RotaProtegida tipoPermitido="cliente">
            <Perfil />
          </RotaProtegida>
        }
      />

      <Route
        path="/funcionario"
        element={
          <RotaProtegida tipoPermitido="funcionario">
            <AreaFuncionario />
          </RotaProtegida>
        }
      />

      <Route path="/produto/:id" element={<DetalhesProduto />} />
    </Routes>
  )
}

export default App
