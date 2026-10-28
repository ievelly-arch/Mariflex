
const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const autenticacao = require('../middleware/autenticacao')

const prisma = new PrismaClient()

router.get('/teste', (req, res) => {
  res.json({ mensagem: 'A rota users está funcionando!' })
})

// LOGIN DE CLIENTE OU FUNCIONÁRIO
router.post('/login', async function (req, res) {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'E-mail e senha são obrigatórios.'
      })
    }

    let usuario = await prisma.cliente.findFirst({
      where: { email: email }
    })

    let tipo = 'cliente'

    if (!usuario) {
      usuario = await prisma.funcionario.findFirst({
        where: { email: email }
      })

      tipo = 'funcionario'
    }

    if (!usuario) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha inválidos.'
      })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha inválidos.'
      })
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não foi configurado.')

      return res.status(500).json({
        mensagem: 'Erro de configuração do servidor.'
      })
    }

    const cpfUsuario =
      tipo === 'cliente'
        ? usuario.CPF_cliente
        : usuario.CPF_funcionario

    const token = jwt.sign(
      {
        tipo: tipo,
        cpf: cpfUsuario
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h'
      }
    )

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      tipo: tipo,
      token: token,
      usuario: {
        nome: usuario.nome,
        email: usuario.email,
        cpf: tipo === 'cliente' ? usuario.CPF_cliente : null
      }
    })
  } catch (error) {
    console.error('Erro ao fazer login:', error)

    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    })
  }
})

// CADASTRO DE CLIENTE
router.post('/', async function (req, res) {
  try {
    const { cpf, nome, email, telefone, endereco, senha } = req.body

    if (!cpf || !nome || !email || !telefone || !endereco || !senha) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios.'
      })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const cliente = await prisma.cliente.create({
      data: {
        CPF_cliente: cpf,
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        senha: senhaHash
      }
    })

    return res.status(201).json({
      mensagem: 'Cliente cadastrado com sucesso.',
      cliente: {
        nome: cliente.nome,
        email: cliente.email
      }
    })
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error)

    if (error.code === 'P2002') {
      return res.status(409).json({
        mensagem: 'CPF ou e-mail já cadastrado.'
      })
    }

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar cliente.'
    })
  }
})

// CONSULTAR PERFIL E HISTÓRICO DE PEDIDOS DO CLIENTE
router.get('/perfil/:cpf', autenticacao, async function (req, res) {
  try {
    if (req.usuario.tipo !== 'cliente') {
      return res.status(403).json({
        mensagem: 'Apenas clientes podem acessar este perfil.'
      })
    }

    if (req.usuario.cpf !== req.params.cpf) {
      return res.status(403).json({
        mensagem: 'Você não tem permissão para acessar este perfil.'
      })
    }

    const cpf = req.params.cpf

    const cliente = await prisma.cliente.findUnique({
      where: {
        CPF_cliente: cpf
      },
      select: {
        CPF_cliente: true,
        nome: true,
        email: true,
        telefone: true,
        endereco: true
      }
    })

    if (!cliente) {
      return res.status(404).json({
        mensagem: 'Cliente não encontrado.'
      })
    }

    const pedidos = await prisma.pedido.findMany({
      where: {
        cliente_CPF_cliente: cliente.CPF_cliente
      },
      orderBy: {
        data: 'desc'
      }
    })

    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await prisma.itempedido.findMany({
          where: {
            pedido_idpedido: pedido.idpedido
          }
        })

        const idsProdutos = [
          ...new Set(
            itens.map(item => item.produto_idprodutos)
          )
        ]

        const produtos = await prisma.produto.findMany({
          where: {
            idprodutos: {
              in: idsProdutos
            }
          },
          select: {
            idprodutos: true,
            nome: true,
            descricao: true,
            imagem: true,
            categoria: true
          }
        })

        const produtosPorId = new Map(
          produtos.map(produto => [
            produto.idprodutos,
            produto
          ])
        )

        return {
          idpedido: pedido.idpedido,
          data: pedido.data,
          pagamento: pedido.pagamento,
          valor_total: Number(pedido.valor_total),
          itens: itens.map(item => ({
            quantidade: item.quantidade,
            preco: Number(item.preco),
            produto:
              produtosPorId.get(item.produto_idprodutos) || null
          }))
        }
      })
    )

    return res.status(200).json({
      cliente,
      pedidos: pedidosComItens
    })
  } catch (error) {
    console.error('Erro ao consultar perfil:', error)

    return res.status(500).json({
      mensagem: 'Não foi possível carregar o perfil do cliente.'
    })
  }
})

module.exports = router
