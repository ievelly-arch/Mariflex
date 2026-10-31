
import { Navigate } from 'react-router-dom'

function RotaProtegida({ children, tipoPermitido }) {
  let usuario = null

  try {
    const dados = localStorage.getItem('mariflexUsuario')
    usuario = dados ? JSON.parse(dados) : null
  } catch {
    usuario = null
  }

  // Verifica se existe uma sessão com token
  if (!usuario || !usuario.token || !usuario.tipo) {
    return <Navigate to="/login" replace />
  }

  // Verifica se o usuário possui o tipo permitido
  if (tipoPermitido && usuario.tipo !== tipoPermitido) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RotaProtegida
