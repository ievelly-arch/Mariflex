
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Carrinho.css'

const CHAVE_CARRINHO = 'mariflexCarrinho'
const CHAVE_USUARIO = 'mariflexUsuario'
const API_URL = 'http://localhost:3000'

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function lerCarrinho() {
  try {
    const dados = localStorage.getItem(CHAVE_CARRINHO)
    return dados ? JSON.parse(dados) : []
  } catch {
    return []
  }
}

function Carrinho() {
  const [itens, setItens] = useState(lerCarrinho)
  const [pagamento, setPagamento] = useState('')
  const [remetente, setRemetente] = useState('')
  const [destinatario, setDestinatario] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens))
  }, [itens])

  function alterarQuantidade(id, variacao) {
    setItens((atuais) =>
      atuais.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: Math.max(
                1,
                Number(item.quantidade || 1) + variacao
              ),
            }
          : item
      )
    )
    setMensagem('')
  }

  function removerItem(id) {
    setItens((atuais) => atuais.filter((item) => item.id !== id))
    setMensagem('')
  }

  const subtotal = itens.reduce(
    (total, item) =>
      total + Number(item.preco) * Number(item.quantidade || 1),
    0
  )

  const quantidadeTotal = itens.reduce(
    (total, item) => total + Number(item.quantidade || 1),
    0
  )

  async function continuarCompra() {
    if (carregando) return

    if (itens.length === 0) {
      setMensagem('Adicione produtos ao carrinho antes de continuar.')
      return
    }

    if (!remetente.trim() || !destinatario.trim()) {
      setMensagem('Preencha os campos de remetente e destinatário.')
      return
    }

    if (remetente.trim().length > 100 || destinatario.trim().length > 100) {
      setMensagem('Remetente e destinatário devem ter até 100 caracteres.')
      return
    }

    if (!pagamento) {
      setMensagem('Selecione uma forma de pagamento.')
      return
    }

    let usuario

    try {
      usuario = JSON.parse(localStorage.getItem(CHAVE_USUARIO) || 'null')
    } catch {
      usuario = null
    }

    if (!usuario || usuario.tipo !== 'cliente' || !usuario.cpf) {
      setMensagem(
        'Não foi possível identificar sua conta de cliente. Saia da conta e entre novamente.'
      )
      return
    }

    const itensPedido = itens.map((item) => ({
      produto_idprodutos: Number(item.id),
      quantidade: Number(item.quantidade || 1),
    }))

    if (
      itensPedido.some(
        (item) =>
          !Number.isInteger(item.produto_idprodutos) ||
          item.produto_idprodutos <= 0 ||
          !Number.isInteger(item.quantidade) ||
          item.quantidade <= 0
      )
    ) {
      setMensagem('Há produtos inválidos no carrinho. Remova-os e adicione-os novamente.')
      return
    }

    setCarregando(true)
    setMensagem('Registrando seu pedido...')

    try {
      const resposta = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clienteCPF: usuario.cpf,
          pagamento,
          remetente: remetente.trim(),
          destinatario: destinatario.trim(),
          itens: itensPedido,
        }),
      })

      const dados = await resposta.json().catch(() => ({}))

      if (!resposta.ok) {
        throw new Error(
          dados.mensagem || 'Não foi possível registrar o pedido.'
        )
      }

      setItens([])
      localStorage.removeItem(CHAVE_CARRINHO)

      setMensagem(
        `Pedido #${dados.pedido.idpedido} registrado com sucesso! Total: ${formatarPreco(dados.pedido.valor_total)}. Nenhuma cobrança foi realizada.`
      )
    } catch (erro) {
      setMensagem(
        erro.message ||
          'Não foi possível conectar ao servidor. Confira se o backend está funcionando.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="carrinho-page">
      <header className="carrinho-header">
        <Link to="/" className="carrinho-logo">
          <span className="carrinho-logo-m">M</span>
          <span>MARIFLEX</span>
        </Link>

        <nav className="carrinho-nav">
          <Link to="/">Início</Link>
          <Link to="/catalogo">Continuar comprando</Link>
        </nav>
      </header>

      <section className="carrinho-conteudo">
        <p className="carrinho-eyebrow">SUA COMPRA</p>
        <h1>Meu carrinho</h1>
        <p className="carrinho-introducao">
          Confira seus produtos antes de continuar.
        </p>

        {itens.length === 0 ? (
          <div className="carrinho-vazio">
            <span className="carrinho-icone-vazio" aria-hidden="true">
              🛒
            </span>
            <h2>Seu carrinho está vazio</h2>
            <p>
              {mensagem ||
                'Explore nosso catálogo e encontre móveis para transformar seu lar.'}
            </p>
            <Link to="/catalogo" className="carrinho-botao-principal">
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="carrinho-layout">
            <section className="carrinho-lista">
              <div className="carrinho-lista-titulo">
                <h2>Produtos escolhidos</h2>
                <span>
                  {quantidadeTotal}{' '}
                  {quantidadeTotal === 1 ? 'item' : 'itens'}
                </span>
              </div>

              {itens.map((item) => (
                <article className="carrinho-item" key={item.id}>
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="carrinho-item-imagem"
                  />

                  <div className="carrinho-item-detalhes">
                    <h3>{item.nome}</h3>
                    <p>{item.categoria}</p>
                    {item.variacoes &&
  Object.entries(item.variacoes).map(([tipo, valor]) => (
    <p key={tipo}>
      <strong>{tipo}:</strong> {valor}
    </p>
  ))}
                    <strong>{formatarPreco(item.preco)}</strong>



                    <div className="carrinho-quantidade">
                      <span>Quantidade:</span>
                      <button
                        type="button"
                        onClick={() => alterarQuantidade(item.id, -1)}
                        aria-label={`Diminuir quantidade de ${item.nome}`}
                        disabled={carregando}
                      >
                        −
                      </button>
                      <span>{Number(item.quantidade || 1)}</span>
                      <button
                        type="button"
                        onClick={() => alterarQuantidade(item.id, 1)}
                        aria-label={`Aumentar quantidade de ${item.nome}`}
                        disabled={carregando}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="carrinho-item-final">
                    <strong>
                      {formatarPreco(
                        Number(item.preco) * Number(item.quantidade || 1)
                      )}
                    </strong>
                    <button
                      type="button"
                      className="carrinho-remover"
                      onClick={() => removerItem(item.id)}
                      disabled={carregando}
                    >
                      Remover
                    </button>
                  </div>
                </article>
              ))}

              <Link to="/catalogo" className="carrinho-voltar">
                ← Continuar comprando
              </Link>
            </section>

            <aside className="carrinho-resumo">
              <h2>Resumo do pedido</h2>

              <div className="carrinho-resumo-linha">
                <span>Subtotal</span>
                <span>{formatarPreco(subtotal)}</span>
              </div>

              <div className="carrinho-resumo-linha">
                <span>Entrega</span>
                <span>A calcular</span>
              </div>

              <div className="carrinho-total">
                <span>Total parcial</span>
                <strong>{formatarPreco(subtotal)}</strong>
              </div>

              <fieldset className="carrinho-pagamento">
                <legend>Forma de pagamento</legend>

                {['Pix', 'Cartão', 'Boleto'].map((forma) => (
                  <label key={forma}>
                    <input
                      type="radio"
                      name="pagamento"
                      value={forma}
                      checked={pagamento === forma}
                      onChange={(evento) => {
                        setPagamento(evento.target.value)
                        setMensagem('')
                      }}
                      disabled={carregando}
                    />
                    {forma}
                  </label>
                ))}
              </fieldset>

              <div className="carrinho-dados-entrega">
                <h3>Dados do pedido</h3>

                <label htmlFor="remetente">Remetente</label>
                <input
                  id="remetente"
                  type="text"
                  value={remetente}
                  onChange={(evento) => {
                    setRemetente(evento.target.value)
                    setMensagem('')
                  }}
                  placeholder="Nome do remetente"
                  maxLength={100}
                  disabled={carregando}
                />

                <label htmlFor="destinatario">Destinatário</label>
                <input
                  id="destinatario"
                  type="text"
                  value={destinatario}
                  onChange={(evento) => {
                    setDestinatario(evento.target.value)
                    setMensagem('')
                  }}
                  placeholder="Nome do destinatário"
                  maxLength={100}
                  disabled={carregando}
                />
              </div>

              {mensagem && (
                <p className="carrinho-mensagem" role="status" aria-live="polite">
                  {mensagem}
                </p>
              )}

              <button
                type="button"
                className="carrinho-botao-principal carrinho-finalizar"
                onClick={continuarCompra}
                disabled={carregando}
              >
                {carregando ? 'Registrando pedido...' : 'Finalizar pedido'}
              </button>

              <p className="carrinho-aviso">
                Esta etapa registra o pedido, mas não realiza cobranças.
              </p>
            </aside>
          </div>
        )}
      </section>

      <footer className="carrinho-footer">
        <strong>MARIFLEX</strong>
        <p>Conforto e estilo para o seu lar.</p>
      </footer>
    </main>
  )
}

export default Carrinho
