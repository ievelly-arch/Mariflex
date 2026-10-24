import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Perfil.css'

const API_URL = 'http://localhost:3000'
const CHAVE_USUARIO = 'mariflexUsuario'

function formatarPreco(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function formatarData(data) {
  if (!data) return 'Data não disponível'

  const dataFormatada = new Date(data)

  if (Number.isNaN(dataFormatada.getTime())) {
    return 'Data não disponível'
  }

  return dataFormatada.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  })
}

function lerUsuario() {
  try {
    const dados = localStorage.getItem(CHAVE_USUARIO)
    return dados ? JSON.parse(dados) : null
  } catch {
    return null
  }
}

function Perfil() {
  const [usuario] = useState(lerUsuario)
  const [cliente, setCliente] = useState(null)
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')


function sairDaConta() {
  localStorage.removeItem(CHAVE_USUARIO)
  window.location.href = '/login'
}


  useEffect(() => {
    async function carregarPerfil() {
      if (!usuario) {
        setMensagem('Entre na sua conta para consultar seu perfil.')
        setCarregando(false)
        return
      }

      if (usuario.tipo !== 'cliente' || !usuario.cpf) {
        setMensagem(
          'Esta página é destinada a contas de clientes. Entre com uma conta de cliente para continuar.'
        )
        setCarregando(false)
        return
      }

      try {
        const resposta = await fetch(
          `${API_URL}/users/perfil/${encodeURIComponent(usuario.cpf)}`
        )

        const dados = await resposta.json()

        if (!resposta.ok) {
          throw new Error(
            dados.mensagem || 'Não foi possível carregar seu perfil.'
          )
        }

        setCliente(dados.cliente)
        setPedidos(dados.pedidos || [])
      } catch (erro) {
        setMensagem(
          erro.message ||
            'Não foi possível conectar ao servidor. Confira se o backend está funcionando.'
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarPerfil()
  }, [usuario])

  return (
    <main className="perfil-page">
      <header className="perfil-header">
        <Link to="/" className="perfil-logo">
          <span className="perfil-logo-m">M</span>
          <span>MARIFLEX</span>
        </Link>

        
<nav className="perfil-nav">
  <Link to="/">Início</Link>
  <Link to="/catalogo">Catálogo</Link>
  <Link to="/carrinho">Carrinho</Link>

  <button type="button" onClick={sairDaConta}>
    Sair da conta
  </button>
</nav>

      </header>

      <section className="perfil-conteudo">
        <p className="perfil-eyebrow">ÁREA DO CLIENTE</p>
        <h1>Meu perfil</h1>
        <p className="perfil-introducao">
          Consulte seus dados e acompanhe seus pedidos na Mariflex.
        </p>

        {carregando ? (
          <div className="perfil-aviso" role="status">
            Carregando seus dados...
          </div>
        ) : mensagem ? (
          <div className="perfil-aviso" role="alert">
            <p>{mensagem}</p>
            {!usuario && (
              <Link to="/login" className="perfil-botao">
                Entrar na minha conta
              </Link>
            )}
          </div>
        ) : (
          <>
            <section className="perfil-card">
              <div className="perfil-card-titulo">
                <div className="perfil-avatar" aria-hidden="true">
                  {cliente.nome.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2>{cliente.nome}</h2>
                  <p>Dados pessoais</p>
                </div>
              </div>

              <div className="perfil-dados">
                <div className="perfil-campo">
                  <span>Nome completo</span>
                  <strong>{cliente.nome}</strong>
                </div>

                <div className="perfil-campo">
                  <span>CPF</span>
                  <strong>{cliente.CPF_cliente}</strong>
                </div>

                <div className="perfil-campo">
                  <span>E-mail</span>
                  <strong>{cliente.email}</strong>
                </div>

                <div className="perfil-campo">
                  <span>Telefone</span>
                  <strong>{cliente.telefone}</strong>
                </div>

                <div className="perfil-campo perfil-campo-endereco">
                  <span>Endereço</span>
                  <strong>{cliente.endereco}</strong>
                </div>
              </div>
            </section>

            <section className="perfil-pedidos">
              <div className="perfil-pedidos-titulo">
                <div>
                  <p className="perfil-eyebrow">ACOMPANHAMENTO</p>
                  <h2>Meus pedidos</h2>
                </div>

                <span>
                  {pedidos.length}{' '}
                  {pedidos.length === 1 ? 'pedido' : 'pedidos'}
                </span>
              </div>

              {pedidos.length === 0 ? (
                <div className="perfil-sem-pedidos">
                  <span aria-hidden="true">🛍</span>
                  <h3>Você ainda não tem pedidos</h3>
                  <p>
                    Quando você realizar uma compra, os detalhes aparecerão
                    aqui.
                  </p>
                  <Link to="/catalogo" className="perfil-botao">
                    Explorar catálogo
                  </Link>
                </div>
              ) : (
                <div className="perfil-lista-pedidos">
                  {pedidos.map((pedido) => (
                    <article className="perfil-pedido" key={pedido.idpedido}>
                      <div className="perfil-pedido-cabecalho">
                        <div>
                          <span>Pedido</span>
                          <h3>#{pedido.idpedido}</h3>
                        </div>

                        <div>
                          <span>Data</span>
                          <strong>{formatarData(pedido.data)}</strong>
                        </div>

                        <div>
                          <span>Pagamento</span>
                          <strong>{pedido.pagamento}</strong>
                        </div>

                        <div>
                          <span>Total</span>
                          <strong className="perfil-pedido-total">
                            {formatarPreco(pedido.valor_total)}
                          </strong>
                        </div>
                      </div>

                      <div className="perfil-pedido-itens">
                        {pedido.itens.map((item, indice) => (
                          <div
                            className="perfil-pedido-item"
                            key={`${pedido.idpedido}-${indice}`}
                          >
                            {item.produto?.imagem ? (
                              <img
                                src={item.produto.imagem}
                                alt={item.produto.nome || 'Produto'}
                              />
                            ) : (
                              <div className="perfil-imagem-vazia">
                                M
                              </div>
                            )}

                            <div>
                              <strong>
                                {item.produto?.nome ||
                                  item.produto?.descricao ||
                                  'Produto indisponível'}
                              </strong>
                              <span>
                                Quantidade: {item.quantidade}
                              </span>
                            </div>

                            <strong>
                              {formatarPreco(
                                item.preco * item.quantidade
                              )}
                            </strong>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </section>

      <footer className="perfil-footer">
        <strong>MARIFLEX</strong>
        <p>Conforto e estilo para o seu lar.</p>
      </footer>
    </main>
  )
}

export default Perfil