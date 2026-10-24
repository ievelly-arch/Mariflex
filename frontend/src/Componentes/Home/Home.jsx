import './Home.css'

function Home() {
  return (
    <main className="home">
      {/* BARRA SUPERIOR */}
      <div className="top-bar">
        <span>
          🚚 Frete grátis para todo o RN em compras acima de R$ 500,00!
        </span>

        <div>
          <span>☏ Atendimento: (84) 99999-9999</span>
          <span>◷ Seg a Sex: 08h às 18h</span>
        </div>
      </div>

      {/* CABEÇALHO */}
      <header className="header">
        <div className="header-main">
          {/* LOGO */}
          <a href="/" className="logo">
            <div className="logo-symbol">M</div>

            <div className="logo-text">
              <strong>MARIFLEX</strong>
              <span>MÓVEIS</span>
            </div>
          </a>

          {/* BUSCA */}
          <div className="search">
            <input
              type="text"
              placeholder="Busque por móveis, ambientes ou categorias..."
              aria-label="Buscar móveis"
            />

            <button type="button" aria-label="Buscar">
              🔍
            </button>
          </div>

          {/* AÇÕES */}
          <div className="header-actions">
            <a href="/perfil" className="header-action">
              <span>♙</span>
              <small>Meu perfil</small>
            </a>

            <button type="button" className="header-action">
              <span>♡</span>
              <small>Favoritos</small>
            </button>

            <a href="/carrinho" className="header-action cart">
              <span>🛒</span>
              <b>0</b>
              <small>Carrinho</small>
            </a>
          </div>
        </div>

        {/* MENU */}
        <nav className="navigation">
          <a href="/" className="active">
            Início
          </a>

          <a href="/catalogo">Catálogo</a>

          <a href="#categorias">
            Categorias <span>⌄</span>
          </a>

          <a href="#promocoes">Promoções</a>

          <a href="#pagamento">Formas de Pagamento</a>

          <a href="#contato">Contato</a>
        </nav>
      </header>

      {/* DESTAQUE PRINCIPAL */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-small">Bem-vindo à</span>

          <h1>Mariflex</h1>

          <p>
            Encontre os móveis perfeitos para transformar
            sua casa com conforto, estilo e qualidade.
          </p>

          <div className="hero-buttons">
            <a href="/catalogo" className="primary-button">
              Ver Catálogo <span>→</span>
            </a>

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

      {/* BENEFÍCIOS */}
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

      {/* CATEGORIAS */}
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
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80"
              alt="Sofá para sala de estar"
              loading="lazy"
            />
          </a>

          <a href="/catalogo" className="category-card">
            <div className="category-icon">🛏</div>
            <div className="category-info">
              <h3>Quartos</h3>
              <span>Ver produtos →</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80"
              alt="Ambiente de quarto decorado"
              loading="lazy"
            />
          </a>

          <a href="/catalogo" className="category-card">
            <div className="category-icon">🚪</div>
            <div className="category-info">
              <h3>Guarda-Roupas</h3>
              <span>Ver produtos →</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=700&q=80"
              alt="Móveis para organização do quarto"
              loading="lazy"
            />
          </a>

          <a href="/catalogo" className="category-card">
            <div className="category-icon">🍽</div>
            <div className="category-info">
              <h3>Salas de Jantar</h3>
              <span>Ver produtos →</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80"
              alt="Mesa e cadeiras para sala de jantar"
              loading="lazy"
            />
          </a>
<a href="/catalogo" className="category-card">
  <div className="category-icon">📺</div>

  <div className="category-info">
    <h3>Racks e Painéis</h3>
    <span>Ver produtos →</span>
  </div>

  <img
    src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80"
    alt="Painel para televisão na sala"
    loading="lazy"
  />
</a>
        </div>

        <a href="/catalogo" className="categories-button">
          Ver todas as categorias <span>→</span>
        </a>
      </section>

      {/* SOBRE */}
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

      {/* CHAMADA PARA O CATÁLOGO */}
      <section className="final-cta" id="promocoes">
        <div>
          <span>ENCONTRE SEU PRÓXIMO MÓVEL</span>
          <h2>Sua casa merece o melhor.</h2>
          <p>
            Explore nosso catálogo e encontre móveis para deixar cada ambiente
            ainda mais especial.
          </p>
        </div>

        <a href="/catalogo" className="primary-button">
          Ver Catálogo <span>→</span>
        </a>
      </section>

      {/* RODAPÉ */}
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