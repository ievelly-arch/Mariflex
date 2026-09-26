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
    <main className="login-page">

      <section className="login-showcase"></section>

      <section className="login-area">

        <a href="/" className="back-link">
          <span>←</span>
          Voltar para o site
        </a>

        <div className="login-content">

          <div className="section-title">
            <span></span>
            <p>ÁREA DO CLIENTE</p>
          </div>

          <h1>Entrar</h1>

          <p className="description">
            Acesse sua conta para continuar e
            <br />
            aproveite todas as vantagens.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label htmlFor="email">
                E-mail
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="input-group">

              <label htmlFor="senha">
                Senha
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ♙
                </span>

                <input
                  id="senha"
                  type="password"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={form.senha}
                  onChange={handleChange}
                  required
                />

                <span className="eye-icon">
                  ◉
                </span>

              </div>

            </div>

            <div className="login-options">

              <label className="remember">
                <input
                  type="checkbox"
                  name="lembrar"
                />

                <span></span>

                Lembrar-me
              </label>

              <a href="#recuperar">
                Esqueceu sua senha?
              </a>

            </div>

            <button type="submit" className="login-button">
              <span>Entrar</span>
              <strong>→</strong>
            </button>

          </form>

          <div className="register">

            <div className="register-line">
              <span></span>

              <p>
                Ainda não tem uma conta?
              </p>

              <span></span>
            </div>

            <a href="cadastro">
              Cadastre-se
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Login