
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Catalogo.css'

const API_URL = 'http://localhost:3000/produtos'

// Imagens ilustrativas para os produtos cadastrados no banco.
// O banco ainda não possui uma coluna de imagem.
const imagensPorCategoria = {
  Sofás:
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
  Quartos:
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85',
  'Guarda-Roupas':
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=85',
  'Racks e Painéis':
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85',
  'Salas de Jantar':
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85',
}

const imagemPadrao =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85'

const formatarPreco = (preco) =>
  Number(preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function Catalogo() {

  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const [pesquisa, setPesquisa] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [carrinho, setCarrinho] = useState([])

  async function carregarProdutos() {
    setCarregando(true)
    setErro('')

    try {
      const resposta = await fetch(API_URL)

      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`)
      }

      const dados = await resposta.json()

      if (!Array.isArray(dados)) {
        throw new Error('A API não retornou uma lista de produtos.')
      }

      setProdutos(
        dados.map((produto) => ({
          id: produto.idprodutos,
          nome: produto.descricao,
          categoria: produto.categoria,
          preco: Number(produto.preco),
          descricao: produto.descricao,
          imagem:
  produto.imagem ||
  imagensPorCategoria[produto.categoria] ||
  imagemPadrao,
        }))
      )
    } catch (error) {
      console.error('Erro ao carregar catálogo:', error)
      setErro('Não é possível carregar o catálogo. Verifique se o backend está funcionando.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  const categorias = useMemo(
    () => [
      'Todas',
      ...new Set(produtos.map((produto) => produto.categoria)),
    ],
    [produtos]
  )

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const termo = pesquisa.trim().toLowerCase()

      const correspondePesquisa =
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)

      const correspondeCategoria =
        categoria === 'Todas' || produto.categoria === categoria

      return correspondePesquisa && correspondeCategoria
    })
  }, [produtos, pesquisa, categoria])

  function adicionarAoCarrinho(produto) {
    setCarrinho((itens) => [...itens, produto])
  }

  return (
    <main className="catalogo-page">
      <header className="catalogo-header">
        <Link to="/" className="catalogo-logo">
          <span className="catalogo-logo-m">M</span>
          <span>MARIFLEX</span>
        </Link>

        <nav className="catalogo-nav">
          <Link to="/">Início</Link>
          <a href="#produtos">Produtos</a>
          <Link to="/login">Entrar</Link>
        </nav>

        <div className="catalogo-carrinho" aria-live="polite">
          <span aria-hidden="true">🛒</span>
          Carrinho ({carrinho.length})
        </div>
      </header>

      <section className="catalogo-banner">
        <p className="catalogo-eyebrow">SEU LAR, SEU ESTILO</p>
        <h1>Encontre seus novos favoritos</h1>
        <p>
          Móveis que combinam conforto, beleza e praticidade para transformar
          seus ambientes.
        </p>
      </section>

      <section className="catalogo-conteudo" id="produtos">
        <div className="catalogo-titulo">
          <div>
            <p className="catalogo-eyebrow">NOSSA SELEÇÃO</p>
            <h2>Explore os produtos</h2>
          </div>

          {!carregando && !erro && (
            <span>
              {produtosFiltrados.length}{' '}
              {produtosFiltrados.length === 1 ? 'produto' : 'produtos'}
            </span>
          )}
        </div>

        {carregando ? (
          <div className="catalogo-vazio" role="status">
            <h3>Carregando produtos...</h3>
            <p>Aguarde enquanto buscamos os móveis da Mariflex.</p>
          </div>
        ) : erro ? (
          <div className="catalogo-vazio" role="alert">
            <h3>Não foi possível carregar o catálogo</h3>
            <p>{erro}</p>
            <button type="button" onClick={carregarProdutos}>
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <div className="catalogo-filtros">
              <label className="catalogo-pesquisa">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Buscar um móvel..."
                  aria-label="Buscar produtos"
                  value={pesquisa}
                  onChange={(evento) => setPesquisa(evento.target.value)}
                />
              </label>

              <label className="catalogo-select-label">
                <span>Categoria:</span>
                <select
                  value={categoria}
                  onChange={(evento) => setCategoria(evento.target.value)}
                >
                  {categorias.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {produtosFiltrados.length > 0 ? (
              <div className="catalogo-grid">
                {produtosFiltrados.map((produto) => (
                  <article className="produto-card" key={produto.id}>
                    <div className="produto-imagem-container">
                      <img
                        className="produto-imagem"
                        src={produto.imagem}
                        alt={produto.nome}
                        loading="lazy"
                        onError={(evento) => {
                          evento.currentTarget.onerror = null
                          evento.currentTarget.src = imagemPadrao
                        }}
                      />

                      <span className="produto-categoria">
                        {produto.categoria}
                      </span>
                    </div>

                    <div className="produto-info">
                      <h3>{produto.nome}</h3>
                      <p className="produto-preco">
                        {formatarPreco(produto.preco)}
                      </p>

                      <div className="produto-acoes">
                        <button
                          type="button"
                          className="produto-btn-detalhes"
                          onClick={() => setProdutoSelecionado(produto)}
                        >
                          Ver detalhes
                        </button>

                        <button
                          type="button"
                          className="produto-btn-adicionar"
                          aria-label={`Adicionar ${produto.nome} ao carrinho`}
                          onClick={() => adicionarAoCarrinho(produto)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="catalogo-vazio">
                <h3>Nenhum produto encontrado</h3>
                <p>
                  Tente outro nome ou selecione uma categoria diferente.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setPesquisa('')
                    setCategoria('Todas')
                  }}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {produtoSelecionado && (
        <div
          className="produto-modal-fundo"
          onClick={() => setProdutoSelecionado(null)}
        >
          <section
            className="produto-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="produto-modal-titulo"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              className="produto-modal-fechar"
              onClick={() => setProdutoSelecionado(null)}
              aria-label="Fechar detalhes"
            >
              ×
            </button>

            <img
              src={produtoSelecionado.imagem}
              alt={produtoSelecionado.nome}
            />

            <div className="produto-modal-info">
              <p className="catalogo-eyebrow">
                {produtoSelecionado.categoria}
              </p>

              <h2 id="produto-modal-titulo">
                {produtoSelecionado.nome}
              </h2>

              <p>{produtoSelecionado.descricao}</p>

              <strong>{formatarPreco(produtoSelecionado.preco)}</strong>

              <button
                type="button"
                className="produto-modal-adicionar"
                onClick={() => adicionarAoCarrinho(produtoSelecionado)}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </section>
        </div>
      )}

      <footer className="catalogo-footer">
        <Link to="/">MARIFLEX</Link>
        <p>Conforto e estilo para o seu lar.</p>
      </footer>
    </main>
  )
}

export default Catalogo