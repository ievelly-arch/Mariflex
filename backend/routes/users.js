var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/login', async function(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'E-mail e senha são obrigatórios.'
      });
    }
    let usuario = await prisma.cliente.findFirst({
      where: {
        email: email
      }
    });
    let tipo = 'cliente';
    if (!usuario) {
      usuario = await prisma.funcionario.findFirst({
        where: {
          email: email
        }
      });
      tipo = 'funcionario';
    }
    if (!usuario) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha inválidos.'
      });
    }
    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );
    if (!senhaValida) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha inválidos.'
      });
    }
    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      tipo: tipo,
      usuario: {
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    });
  }
});

module.exports = router;