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

  function handleSubmit(event) {
    event.preventDefault()

    console.log(form)
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