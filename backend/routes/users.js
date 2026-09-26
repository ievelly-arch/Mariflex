var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /users/login
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

// POST /users
router.post('/', async function(req, res) {
  try {
    const {
      cpf,
      nome,
      email,
      telefone,
      endereco,
      senha
    } = req.body;

    if (!cpf || !nome || !email || !telefone || !endereco || !senha) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios.'
      });
    }

    // A senha NÃO será salva em texto puro.
    const senhaHash = await bcrypt.hash(senha, 10);

    const cliente = await prisma.cliente.create({
      data: {
        CPF_cliente: cpf,
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        senha: senhaHash
      }
    });

    return res.status(201).json({
      mensagem: 'Cliente cadastrado com sucesso.',
      cliente: {
        nome: cliente.nome,
        email: cliente.email
      }
    });

  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        mensagem: 'CPF ou e-mail já cadastrado.'
      });
    }

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar cliente.'
    });
  }
});

module.exports = router;