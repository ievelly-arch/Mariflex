
import { useNavigate } from 'react-router-dom'

function AreaFuncionario() {
  const navigate = useNavigate()

  let usuario = null

  try {
    usuario = JSON.parse(localStorage.getItem('mariflexUsuario'))
  } catch {
    usuario = null
  }

  function sair() {
    localStorage.removeItem('mariflexUsuario')
    navigate('/login', { replace: true })
  }

  return (
    <main>
      <h1>Área do Funcionário</h1>

      <p>Bem-vindo(a), {usuario?.nome}!</p>
      <p>Você está acessando o sistema como funcionário.</p>

      <button onClick={sair}>
        Sair
      </button>
    </main>
  )
}

export default AreaFuncionario
