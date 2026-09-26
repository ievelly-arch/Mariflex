import { useState } from 'react'
import './Login.css'

function Login() {
  const [form, setForm] = useState({
    email: '',
    senha: ''
  })

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.mensagem || 'E-mail ou senha inválidos.')
        return
      }

      alert(data.mensagem)

      console.log('Usuário:', data.usuario)
      console.log('Tipo:', data.tipo)

    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Mariflex</h1>

        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login