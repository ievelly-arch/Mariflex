import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Catalogo.css'

const produtos = [
  {
    id: 1,
    nome: 'Sofá Moderno',
    categoria: 'Sala',
    preco: 1899.90,
    descricao: 'Sofá moderno e confortável para deixar sua sala mais aconchegante.',
    imagem: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    nome: 'Poltrona Elegante',
    categoria: 'Sala',
    preco: 799.90,
    descricao: 'Poltrona elegante para complementar a decoração da sua casa.',
    imagem: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    nome: 'Mesa de Jantar',
    categoria: 'Sala de jantar',
    preco: 1299.90,
    descricao: 'Mesa de jantar com design versátil para reunir a família.',
    imagem: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    nome: 'Cama Casal',
    categoria: 'Quarto',
    preco: 1599.90,
    descricao: 'Cama de casal com estilo contemporâneo para seu quarto.',
    imagem: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    nome: 'Mesa de Escritório',
    categoria: 'Escritório',
    preco: 649.90,
    descricao: 'Mesa funcional para organizar seus estudos ou trabalho.',
    imagem: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    nome: 'Estante Moderna',
    categoria: 'Decoração',
    preco: 899.90,
    descricao: 'Estante para organizar livros, objetos e itens decorativos.',
    imagem: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=85',
  },
]

const formatarPreco = (preco) =>
  preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function Catalogo() {
  const [pesquisa, setPesquisa] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [carrinho, setCarrinho] = useState([])

  const categorias = ['Todas', ...new Set(produtos.map((produto) => produto.categoria))]

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const correspondeNome = produto.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase())

      const correspondeCategoria =
        categoria === 'Todas' || produto.categoria === categoria

      return correspondeNome && correspondeCategoria
    })
  }, [pesquisa, categoria])

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
          <span>{produtosFiltrados.length} produtos</span>
        </div>

        <div className="catalogo-filtros">
          <label className="catalogo-pesquisa">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Buscar um móvel..."
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
                  />
                  <span className="produto-categoria">{produto.categoria}</span>
                </div>

                <div className="produto-info">
                  <h3>{produto.nome}</h3>
                  <p className="produto-preco">{formatarPreco(produto.preco)}</p>

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
            <p>Tente outro nome ou selecione uma categoria diferente.</p>
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
              <h2 id="produto-modal-titulo">{produtoSelecionado.nome}</h2>
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