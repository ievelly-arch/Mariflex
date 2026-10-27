
import { Navigate } from 'react-router-dom'

function RotaPublica({ children }) {
  let usuario = null

  try {
    const dados = localStorage.getItem('mariflexUsuario')
    usuario = dados ? JSON.parse(dados) : null
  } catch {
    usuario = null
  }

  if (usuario) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RotaPublica
