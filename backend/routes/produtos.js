const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /produtos
router.get('/', async (req, res) => {
try {
const produtos = await prisma.produto.findMany({
orderBy: {
idprodutos: 'asc',
},
select: {
idprodutos: true,
nome: true,
descricao: true,
categoria: true,
preco: true,
imagem: true,
empresa_idempresa: true,
variacaoproduto: {
select: {
idvariacao: true,
tipo: true,
valor: true,
},
},
},
});

return res.status(200).json(produtos);

} catch (error) {
console.error('Erro ao buscar produtos:', error);

return res.status(500).json({
  mensagem: 'Erro ao carregar os produtos.',
});

}
});

module.exports = router;