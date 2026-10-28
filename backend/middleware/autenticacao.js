const jwt = require('jsonwebtoken')

function autenticacao(req, res, next) {
  const cabecalho = req.headers.authorization

  if (!cabecalho || !cabecalho.startsWith('Bearer ')) {
    return res.status(401).json({
      mensagem: 'Autenticação necessária.'
    })
  }

  const token = cabecalho.split(' ')[1]

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não foi configurado.')

      return res.status(500).json({
        mensagem: 'Erro de configuração do servidor.'
      })
    }

    req.usuario = jwt.verify(token, process.env.JWT_SECRET)

    next()
  } catch (error) {
    return res.status(401).json({
      mensagem: 'Token inválido ou expirado. Faça login novamente.'
    })
  }
}

module.exports = autenticacao