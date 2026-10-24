const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  try {
    const {
      clienteCPF,
      pagamento,
      remetente,
      destinatario,
      itens,
    } = req.body

    if (
      !clienteCPF ||
      typeof remetente !== 'string' ||
      !remetente.trim() ||
      typeof destinatario !== 'string' ||
      !destinatario.trim() ||
      !pagamento
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os dados para finalizar o pedido.',
      })
    }

    if (
      remetente.trim().length > 100 ||
      destinatario.trim().length > 100
    ) {
      return res.status(400).json({
        mensagem: 'Remetente e destinatário devem ter até 100 caracteres.',
      })
    }

    if (!['Pix', 'Cartão', 'Boleto'].includes(pagamento)) {
      return res.status(400).json({
        mensagem: 'Forma de pagamento inválida.',
      })
    }

    if (
      !Array.isArray(itens) ||
      itens.length === 0 ||
      itens.some(
        (item) =>
          !Number.isInteger(Number(item.produto_idprodutos)) ||
          Number(item.produto_idprodutos) <= 0 ||
          !Number.isInteger(Number(item.quantidade)) ||
          Number(item.quantidade) <= 0
      )
    ) {
      return res.status(400).json({
        mensagem: 'O carrinho está vazio ou contém itens inválidos.',
      })
    }

    const cliente = await prisma.cliente.findUnique({
      where: {
        CPF_cliente: String(clienteCPF),
      },
      select: {
        CPF_cliente: true,
      },
    })

    if (!cliente) {
      return res.status(404).json({
        mensagem: 'Cliente não encontrado. Entre novamente na sua conta.',
      })
    }

    const quantidadesPorProduto = new Map()

    for (const item of itens) {
      const id = Number(item.produto_idprodutos)
      const quantidade = Number(item.quantidade)

      quantidadesPorProduto.set(
        id,
        (quantidadesPorProduto.get(id) || 0) + quantidade
      )
    }

    const idsProdutos = [...quantidadesPorProduto.keys()]

    const produtos = await prisma.produto.findMany({
      where: {
        idprodutos: {
          in: idsProdutos,
        },
      },
      select: {
        idprodutos: true,
        preco: true,
      },
    })

    if (produtos.length !== idsProdutos.length) {
      return res.status(400).json({
        mensagem: 'Um ou mais produtos não foram encontrados.',
      })
    }

    const produtosPorId = new Map(
      produtos.map((produto) => [
        produto.idprodutos,
        Number(produto.preco),
      ])
    )

    const itensValidados = idsProdutos.map((id) => ({
      produto_idprodutos: id,
      quantidade: quantidadesPorProduto.get(id),
      preco: produtosPorId.get(id),
    }))

    const total = itensValidados.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    )

    const pedido = await prisma.$transaction(async (tx) => {
      const novoPedido = await tx.pedido.create({
        data: {
          pagamento,
          valor_total: total.toFixed(2),
          data: new Date(),
          cliente_CPF_cliente: cliente.CPF_cliente,
          remetente: remetente.trim(),
          destinatario: destinatario.trim(),
        },
      })

      await tx.itempedido.createMany({
        data: itensValidados.map((item) => ({
          quantidade: item.quantidade,
          preco: item.preco.toFixed(2),
          pedido_idpedido: novoPedido.idpedido,
          produto_idprodutos: item.produto_idprodutos,
        })),
      })

      return novoPedido
    })

    return res.status(201).json({
      mensagem: 'Pedido registrado com sucesso.',
      pedido: {
        idpedido: pedido.idpedido,
        valor_total: Number(pedido.valor_total),
        pagamento: pedido.pagamento,
        data: pedido.data,
      },
    })
  } catch (error) {
    console.error('Erro ao registrar pedido:', error)

    return res.status(500).json({
      mensagem: 'Não foi possível registrar o pedido.',
    })
  }
})

module.exports = router