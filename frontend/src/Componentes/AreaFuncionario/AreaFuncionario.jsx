import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  House,
  ShoppingBag,
  ChartNoAxesColumn,
  LayoutGrid,
  CircleHelp,
  LogOut,
  ShoppingCart,
  Box,
  ChartColumnIncreasing,
  UserCircle
} from 'lucide-react'

import './AreaFuncionario.css'

function AreaFuncionario() {
  const navigate = useNavigate()

  let usuario = null

  try {
    usuario = JSON.parse(localStorage.getItem('mariflexUsuario'))
  } catch {
    usuario = null
  }

  useEffect(() => {
    if (!usuario || usuario.tipo !== 'funcionario') {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  function sair() {
    localStorage.removeItem('mariflexUsuario')
    navigate('/login', { replace: true })
  }

  if (!usuario || usuario.tipo !== 'funcionario') {
    return null
  }

  const nome = usuario.nome || 'Funcionário'

  return (
    <main className="funcionario-layout">

      {/* MENU LATERAL */}
      <aside className="funcionario-sidebar">

        <div className="funcionario-logo">
          <img
            src="/mariflex-simbolo-branco.png"
            alt=""
            className="funcionario-logo-simbolo"
          />

          <img
            src="/mariflex-texto-branco.png"
            alt="Mariflex Móveis"
            className="funcionario-logo-texto"
          />
        </div>

        <nav className="funcionario-menu">

          <a href="#inicio" className="menu-item ativo">
            <House size={18} />
            <span>Início</span>
          </a>

          <a href="#pedidos" className="menu-item">
            <ShoppingBag size={18} />
            <span>Pedidos</span>
          </a>

          <a href="#estoque" className="menu-item">
            <ChartNoAxesColumn size={18} />
            <span>Estoque</span>
          </a>

          <a href="#produtos" className="menu-item">
            <LayoutGrid size={18} />
            <span>Produtos</span>
          </a>

          <a href="#empresa" className="menu-item">
            <CircleHelp size={18} />
            <span>Sobre a Empresa</span>
          </a>

        </nav>

        <button
          className="funcionario-sair"
          onClick={sair}
          type="button"
        >
          <LogOut size={18} />
          <span>Sair da conta</span>
        </button>

      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="funcionario-conteudo" id="inicio">

        {/* CABEÇALHO */}
        <header className="funcionario-topbar">

          <span className="topbar-identificacao">
            <UserCircle size={20} />
            {nome}
          </span>

        </header>

        <div className="funcionario-pagina">

          {/* SAUDAÇÃO COM FOTO E DEGRADÊ CHAMPANHE */}
          <section className="funcionario-boas-vindas">

            <div className="boas-vindas-conteudo">

              <span className="funcionario-etiqueta">
                ÁREA DO FUNCIONÁRIO
              </span>

              <h1>Olá, {nome}!</h1>

              <p>
                Bem-vindo(a) à área de funcionários da Mariflex.
                Aqui você pode acompanhar as informações da empresa.
              </p>

            </div>

          </section>

          {/* INDICADORES */}
          <section className="funcionario-indicadores">

            <article className="indicador-card" id="pedidos">

              <ShoppingCart className="indicador-icone" size={36} />

              <div>
                <strong>0</strong>
                <span>Pedidos hoje</span>
              </div>

            </article>

            <article className="indicador-card" id="estoque">

              <Box className="indicador-icone" size={36} />

              <div>
                <strong>0</strong>
                <span>Produtos em estoque</span>
              </div>

            </article>

            <article className="indicador-card">

              <ChartColumnIncreasing
                className="indicador-icone"
                size={36}
              />

              <div>
                <strong>R$ 0,00</strong>
                <span>Vendas do dia</span>
              </div>

            </article>

          </section>

          {/* BANNER MARIFLEX COM FOTO E DEGRADÊ CHAMPANHE */}
          <section className="funcionario-banner" id="empresa">

            <div className="banner-conteudo">

              <span className="banner-linha"></span>

              <h2>Mariflex</h2>

              <p>
                Qualidade, conforto e estilo
                para o seu lar.
              </p>

            </div>

          </section>

          {/* ACESSOS */}
          <section className="funcionario-acessos" id="produtos">

            <h2>Acesso rápido</h2>

            <p>
              Utilize o menu lateral para acessar as áreas do sistema.
            </p>

          </section>

        </div>

      </section>

    </main>
  )
}

export default AreaFuncionario