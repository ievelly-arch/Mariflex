import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [termoBusca, setTermoBusca] = useState('')
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mariflexUsuario'))
    } catch {
      return null
    }
  })

  useEffect(() => {
    function atualizarUsuario() {
      try {
        setUsuario(JSON.parse(localStorage.getItem('mariflexUsuario')))
      } catch {
        setUsuario(null)
      }
    }

    window.addEventListener('storage', atualizarUsuario)
    return () => window.removeEventListener('storage', atualizarUsuario)
  }, [])

  function buscarProdutos() {
    const termo = termoBusca.trim()
    navigate(
      termo
        ? `/catalogo?busca=${encodeURIComponent(termo)}`
        : '/catalogo'
    )
  }

  function sair() {
    localStorage.removeItem('mariflexUsuario')
    setUsuario(null)
    navigate('/', { replace: true })
  }

  return (
    <main className="home">

      <div className="top-bar">
        <span>
          🚚 Frete grátis para todo o RN em compras acima de R$ 500,00!
        </span>
        <div>
          <span>☏ Atendimento: (84) 99999-9999</span>
          <span>◷ Seg a Sex: 08h às 18h</span>
        </div>
      </div>

      <header className="header">
        <div className="header-main">

          <Link to="/" className="logo" aria-label="Mariflex Móveis & Casa - Início">
            <img
              className="logo-symbol-image"
              src="/mariflex-simbolo-vinho.png"
              alt=""
            />
            <img
              className="logo-wordmark-image"
              src="/mariflex-nome-vinho.png"
              alt="Mariflex Móveis & Casa"
            />
          </Link>

          <div className="search">
            <input
              type="text"
              placeholder="Busque por móveis, ambientes ou categorias..."
              aria-label="Buscar móveis"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') buscarProdutos()
              }}
            />

            <button type="button" aria-label="Buscar" onClick={buscarProdutos}>
              <svg className="header-icon search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10" cy="10" r="7" />
                <path d="M15.2 15.2L21 21" />
              </svg>
            </button>
          </div>

          <div className="header-actions">

            {usuario ? (
              <>
                <Link
                  to={usuario.tipo === 'cliente' ? '/perfil' : '/funcionario'}
                  className="header-action"
                >
                  <svg className="header-icon profile-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="7.5" r="4" />
                    <path d="M4 21c.4-4.5 3.4-7 8-7s7.6 2.5 8 7Z" />
                  </svg>
                  <small>
                    {usuario.tipo === 'funcionario' ? 'Área funcionário' : 'Meu perfil'}
                  </small>
                </Link>

                <button type="button" className="header-action" onClick={sair}>
                  <svg className="header-icon logout-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 4H5.8A1.8 1.8 0 0 0 4 5.8v12.4A1.8 1.8 0 0 0 5.8 20H10" />
                    <path d="M13 8l4 4-4 4M8 12h9" />
                  </svg>
                  <small>Sair</small>
                </button>
              </>
            ) : (
              <Link to="/login" className="header-action">
                <svg className="header-icon profile-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="7.5" r="4" />
                  <path d="M4 21c.4-4.5 3.4-7 8-7s7.6 2.5 8 7Z" />
                </svg>
                <small>Entrar</small>
              </Link>
            )}

            <button type="button" className="header-action" aria-label="Favoritos">
              <svg className="header-icon favorite-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 8.7c0 4.2-8.8 10.1-8.8 10.1S3.2 12.9 3.2 8.7A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.3Z" />
              </svg>
              <small>Favoritos</small>
            </button>

            <Link to="/carrinho" className="header-action cart" aria-label="Carrinho">
              <svg className="header-icon cart-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 3.5h2.2l2.5 12.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 1.9-1.5L21.5 8H6" />
                <circle cx="9" cy="20" r="1.7" />
                <circle cx="18" cy="20" r="1.7" />
              </svg>
              <b>0</b>
              <small>Carrinho</small>
            </Link>

          </div>
        </div>

        <nav className="navigation">
          <Link to="/" className="active">Início</Link>
          <Link to="/catalogo">Catálogo</Link>
          <a href="#categorias">Categorias <span>⌄</span></a>
          <a href="#promocoes">Promoções</a>
          <a href="#pagamento">Formas de Pagamento</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-small">Bem-vindo à</span>
          <h1>Mariflex</h1>

          <p>
            Encontre os móveis perfeitos para transformar
            sua casa com conforto, estilo e qualidade.
          </p>

          <div className="hero-buttons">
            <Link to="/catalogo" className="primary-button">
              Ver Catálogo <span>→</span>
            </Link>
            <a href="#sobre" className="secondary-button">
              Saiba mais sobre nós
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
            alt="Sala de estar decorada com móveis"
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden'
            }}
          />

          <div className="hero-dots">
            <span className="active"></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="benefit">
          <div className="benefit-icon">🚚</div>
          <div>
            <strong>Frete Grátis</strong>
            <p>Para todo o RN em compras acima de R$ 500,00.</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">🛡</div>
          <div>
            <strong>Compra Segura</strong>
            <p>Seus dados protegidos com toda segurança e privacidade.</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">💳</div>
          <div>
            <strong>Parcelamento</strong>
            <p>Parcele suas compras em até 12x no cartão.</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">🎧</div>
          <div>
            <strong>Atendimento</strong>
            <p>Suporte rápido e humanizado sempre que precisar.</p>
          </div>
        </div>
      </section>

      <section className="categories" id="categorias">
        <div className="section-heading">
          <span>Explore nossos produtos</span>
          <h2>Explore nossas categorias</h2>
        </div>

        <div className="category-grid">
          <a href="/catalogo" className="category-card">
            <div className="category-icon">🛋</div>
            <div className="category-info">
              <h3>Sofás</h3>
              <span>Ver produtos →</span>
            </div>
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80" alt="Sofá para sala de estar" />
          </a>

          <a href="/catalogo" className="category-card">
            <div className="category-icon">🛏</div>
            <div className="category-info">
              <h3>Quartos</h3>
              <span>Ver produtos →</span>
            </div>
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80" alt="Ambiente de quarto decorado" />
          </a>

          <a href="/catalogo" className="category-card">
            <div className="category-icon">🚪</div>
            <div className="category-info">
              <h3>Guarda-Roupas</h3>
              <span>Ver produtos →</span>
            </div>
            <img src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=700&q=80" alt="Móveis para organização do quarto" />
          </a>

          <a href="/catalogo" className="category-card">
            <div className="category-icon">🍽</div>
            <div className="category-info">
              <h3>Salas de Jantar</h3>
              <span>Ver produtos →</span>
            </div>
            <img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80" alt="Mesa e cadeiras para sala de jantar" />
          </a>

          <a href="/catalogo" className="category-card">
            <div className="category-icon">📺</div>
            <div className="category-info">
              <h3>Racks e Painéis</h3>
              <span>Ver produtos →</span>
            </div>
            <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80" alt="Painel para televisão na sala" />
          </a>
        </div>

        <Link to="/catalogo" className="categories-button">
          Ver todas as categorias <span>→</span>
        </Link>
      </section>

      <section className="about" id="sobre">
        <div className="about-content">
          <span className="section-label">SOBRE A MARIFLEX</span>
          <h2>Qualidade para transformar sua casa.</h2>
          <p>
            Na Mariflex, acreditamos que cada ambiente merece móveis que unam
            beleza, conforto e funcionalidade.
          </p>
          <p>
            Trabalhamos para oferecer produtos de qualidade e um atendimento
            próximo, ajudando você a encontrar as melhores opções para sua casa.
          </p>
          <a href="#contato" className="primary-button">
            Fale conosco <span>→</span>
          </a>
        </div>

        <div className="about-highlight">
          <span>MARIFLEX</span>
          <strong>
            Seu ambiente.
            <br />
            Seu estilo.
            <br />
            Seu espaço.
          </strong>
        </div>
      </section>

      <section className="final-cta" id="promocoes">
        <div>
          <span>ENCONTRE SEU PRÓXIMO MÓVEL</span>
          <h2>Sua casa merece o melhor.</h2>
          <p>
            Explore nosso catálogo e encontre móveis para deixar cada ambiente
            ainda mais especial.
          </p>
        </div>

        <Link to="/catalogo" className="primary-button">
          Ver Catálogo <span>→</span>
        </Link>
      </section>

      <footer className="footer" id="contato">
        <div className="footer-brand">
          <div className="footer-logo">
            <strong>MARIFLEX</strong>
            <span>MÓVEIS</span>
          </div>
          <p>Qualidade e conforto para o seu lar.</p>
        </div>

        <div className="footer-column">
          <strong>Endereço</strong>
          <span>📍 Rua Exemplo, 123 - Natal/RN</span>
        </div>

        <div className="footer-column" id="pagamento">
          <strong>Formas de pagamento</strong>
          <span>VISA &nbsp; ●● &nbsp; ELO &nbsp; PIX</span>
        </div>

        <div className="footer-column">
          <strong>Siga-nos</strong>
          <span>◎ &nbsp; ● &nbsp; ◉</span>
        </div>
      </footer>

    </main>
  )
}

export default Home