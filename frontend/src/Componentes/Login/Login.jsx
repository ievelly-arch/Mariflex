
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    senha: '',
  })

  const [carregando, setCarregando] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setCarregando(true)

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.mensagem || 'E-mail ou senha inválidos.')
        return
      }

      if (!data.token) {
        alert('O servidor não retornou o token de autenticação.')
        return
      }

      // Guarda o token e os dados necessários para identificar a conta.
      localStorage.setItem(
        'mariflexUsuario',
        JSON.stringify({
          tipo: data.tipo,
          nome: data.usuario.nome,
          email: data.usuario.email,
          cpf: data.usuario.cpf || null,
          token: data.token,
        }),
      )

      alert(data.mensagem || 'Login realizado com sucesso.')

      if (data.tipo === 'funcionario') {
  navigate('/funcionario', { replace: true })
} else {
  navigate('/', { replace: true })
}
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert(
        'Não foi possível conectar ao servidor. Verifique se o backend está funcionando.',
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-showcase"></section>

      <section className="login-area">
        <Link to="/" className="back-link">
          <span>←</span>
          Voltar para o site
        </Link>

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
              <label htmlFor="email">E-mail</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>

              <div className="input-wrapper">
                <span className="input-icon">♙</span>

                <input
                  id="senha"
                  type="password"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={form.senha}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <span className="eye-icon">◉</span>
              </div>
            </div>

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" name="lembrar" />
                <span></span>
                Lembrar-me
              </label>

              <a href="#recuperar">Esqueceu sua senha?</a>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={carregando}
            >
              <span>{carregando ? 'Entrando...' : 'Entrar'}</span>
              <strong>→</strong>
            </button>
          </form>

          <div className="register">
            <div className="register-line">
              <span></span>
              <p>Ainda não tem uma conta?</p>
              <span></span>
            </div>

            <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
