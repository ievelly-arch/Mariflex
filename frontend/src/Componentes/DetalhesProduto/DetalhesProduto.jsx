
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './DetalhesProduto.css'

const API_URL = 'http://localhost:3000/produtos'
const CHAVE_CARRINHO = 'mariflexCarrinho'

const imagemPadrao =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85'

const imagensPorCategoria = {
  Sala: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
  Quarto: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85',
  'Guarda-Roupas':
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=85',
  'Racks e Painéis':
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85',
  'Sala de jantar':
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85',
}

const formatarPreco = (preco) =>
  Number(preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function DetalhesProduto() {
  const { id } = useParams()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [variacoesSelecionadas, setVariacoesSelecionadas] = useState({})

  useEffect(() => {
    async function carregarProduto() {
      setCarregando(true)
      setErro('')
      setProduto(null)
      setVariacoesSelecionadas({})

      try {
        const resposta = await fetch(API_URL)

        if (!resposta.ok) {
          throw new Error('Não foi possível consultar os produtos.')
        }

        const dados = await resposta.json()

        const encontrado = dados.find(
          (item) => String(item.idprodutos) === String(id),
        )

        if (!encontrado) {
          setErro('Produto não encontrado.')
          return
        }

        const categoria = encontrado.categoria || 'Outros'
        const nome = encontrado.nome || encontrado.descricao || 'Produto'

        setProduto({
          id: encontrado.idprodutos,
          nome,
          categoria,
          preco: Number(encontrado.preco),
          descricao: encontrado.descricao || nome,
          imagem:
            encontrado.imagem ||
            imagensPorCategoria[categoria] ||
            imagemPadrao,
          variacoes: Array.isArray(encontrado.variacoes)
            ? encontrado.variacoes
            : [],
        })
      } catch {
        setErro(
          'Não foi possível carregar os detalhes. Verifique se o backend está funcionando.',
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarProduto()
  }, [id])

  function selecionarVariacao(tipo, valor) {
    setVariacoesSelecionadas((anterior) => ({
      ...anterior,
      [tipo]: valor,
    }))
  }

  function adicionarAoCarrinho() {
    if (!produto) return

    const tiposDisponiveis = [
      ...new Set(produto.variacoes.map((variacao) => variacao.tipo)),
    ]

    const tiposObrigatorios = tiposDisponiveis.filter((tipo) =>
      ['cor', 'material', 'acabamento'].includes(
        tipo.trim().toLowerCase(),
      ),
    )

    const variacaoFaltando = tiposObrigatorios.find(
      (tipo) => !variacoesSelecionadas[tipo],
    )

    if (variacaoFaltando) {
      alert(`Selecione uma opção de ${variacaoFaltando.toLowerCase()}.`)
      return
    }

    try {
      const dados = localStorage.getItem(CHAVE_CARRINHO)
      const itens = dados ? JSON.parse(dados) : []
      const carrinho = Array.isArray(itens) ? itens : []

      const variacoes = { ...variacoesSelecionadas }

      const chaveVariacoes = JSON.stringify(
        Object.entries(variacoes).sort(([a], [b]) => a.localeCompare(b)),
      )

      const existente = carrinho.find(
        (item) =>
          String(item.id) === String(produto.id) &&
          JSON.stringify(
            Object.entries(item.variacoes || {}).sort(([a], [b]) =>
              a.localeCompare(b),
            ),
          ) === chaveVariacoes,
      )

      const novosItens = existente
        ? carrinho.map((item) =>
            String(item.id) === String(produto.id) &&
            JSON.stringify(
              Object.entries(item.variacoes || {}).sort(([a], [b]) =>
                a.localeCompare(b),
              ),
            ) === chaveVariacoes
              ? {
                  ...item,
                  quantidade: (Number(item.quantidade) || 1) + 1,
                }
              : item,
          )
        : [
            ...carrinho,
            {
              id: produto.id,
              nome: produto.nome,
              categoria: produto.categoria,
              preco: produto.preco,
              imagem: produto.imagem,
              quantidade: 1,
              variacoes,
            },
          ]

      localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(novosItens))
      alert('Produto adicionado ao carrinho!')
    } catch {
      alert('Não foi possível adicionar o produto ao carrinho.')
    }
  }

  if (carregando) {
    return (
      <main className="detalhes-produto">
        <p>Carregando produto...</p>
      </main>
    )
  }

  if (erro || !produto) {
    return (
      <main className="detalhes-produto">
        <h1>{erro || 'Produto não encontrado.'}</h1>
        <Link to="/catalogo">Voltar ao catálogo</Link>
      </main>
    )
  }

  const tiposVariacao = [
    ...new Set(produto.variacoes.map((variacao) => variacao.tipo)),
  ]

  return (
    <main className="detalhes-produto">
      <header className="detalhes-cabecalho">
        <Link to="/" className="detalhes-logo">
          MARIFLEX
        </Link>
        <Link to="/carrinho">Ver carrinho</Link>
      </header>

      <nav className="detalhes-breadcrumb">
        <Link to="/">Início</Link>
        {' / '}
        <Link to="/catalogo">Catálogo</Link>
        {' / '}
        <span>{produto.nome}</span>
      </nav>

      <section className="detalhes-conteudo">
        <img
          src={produto.imagem}
          alt={produto.nome}
          onError={(evento) => {
            evento.currentTarget.onerror = null
            evento.currentTarget.src = imagemPadrao
          }}
        />

        <div className="detalhes-informacoes">
          <p className="detalhes-categoria">{produto.categoria}</p>
          <h1>{produto.nome}</h1>
          <p>{produto.descricao}</p>
          <strong>{formatarPreco(produto.preco)}</strong>

          {tiposVariacao.map((tipo) => {
            const opcoes = produto.variacoes.filter(
              (variacao) => variacao.tipo === tipo,
            )

            return (
              <div className="detalhes-variacao" key={tipo}>
                <label htmlFor={`variacao-${tipo}`}>{tipo}:</label>

                <select
                  id={`variacao-${tipo}`}
                  value={variacoesSelecionadas[tipo] || ''}
                  onChange={(evento) =>
                    selecionarVariacao(tipo, evento.target.value)
                  }
                >
                  <option value="">Selecione {tipo.toLowerCase()}</option>

                  {opcoes.map((opcao) => (
                    <option key={opcao.idvariacao} value={opcao.valor}>
                      {opcao.valor}
                    </option>
                  ))}
                </select>
              </div>
            )
          })}

          <button type="button" onClick={adicionarAoCarrinho}>
            Adicionar ao carrinho
          </button>

          <Link to="/catalogo" className="detalhes-voltar">
            Continuar comprando
          </Link>
        </div>
      </section>
    </main>
  )
}

export default DetalhesProduto
