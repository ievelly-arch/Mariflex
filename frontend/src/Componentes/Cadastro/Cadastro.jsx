import { useState } from 'react'
import './Cadastro.css'

function Cadastro() {
  const [form, setForm] = useState({
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: ''
  })

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não coincidem.')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cpf: form.cpf,
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          endereco: form.endereco,
          senha: form.senha
        })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.mensagem || 'Erro ao realizar cadastro.')
        return
      }

      alert(data.mensagem)

      setForm({
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        senha: '',
        confirmarSenha: ''
      })
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">

        <div className="cadastro-header">
          <span>MARIFLEX</span>
          <h1>Crie sua conta</h1>
          <p>Preencha seus dados para realizar seu cadastro.</p>
        </div>

        <form className="cadastro-form" onSubmit={handleSubmit}>

          <div className="cadastro-row">
            <div className="campo">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                value={form.cpf}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cadastro-row">
            <div className="campo">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={form.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="endereco">Endereço</label>
              <input
                id="endereco"
                name="endereco"
                type="text"
                value={form.endereco}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="cadastro-row">
            <div className="campo">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="confirmarSenha">Confirmar senha</label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={form.confirmarSenha}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="cadastro-button">
            Criar conta
          </button>

        </form>

        <p className="cadastro-login">
          Já possui uma conta?
          <a href="/login"> Entrar</a>
        </p>

      </div>
    </div>
  )
}

export default Cadastro