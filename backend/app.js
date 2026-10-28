
require('dotenv').config()

var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var produtosRouter = require('./routes/produtos')
var pedidosRouter = require('./routes/pedidos')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  const origensPermitidas = [
    'http://localhost:5173',
    'http://localhost:5175',
  ]

  const origem = req.headers.origin

  if (origensPermitidas.includes(origem)) {
    res.header('Access-Control-Allow-Origin', origem)
  }

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )

  res.header(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

app.set('view engine', 'pug')
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/produtos', produtosRouter)
app.use('/pedidos', pedidosRouter)

module.exports = app
