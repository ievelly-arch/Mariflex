
import { Navigate } from 'react-router-dom'

function RotaProtegida({ children, tipoPermitido }) {
  let usuario = null

  try {
    const dados = localStorage.getItem('mariflexUsuario')
    usuario = dados ? JSON.parse(dados) : null
  } catch {
    usuario = null
  }

  // Sem sessão: encaminha para o login.
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Com sessão, mas sem permissão: volta para a Home.
  if (tipoPermitido && usuario.tipo !== tipoPermitido) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RotaProtegida
