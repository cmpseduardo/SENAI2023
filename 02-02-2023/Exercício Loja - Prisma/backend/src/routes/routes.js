const express = require('express')

const router = express.Router()

const Setor = require('../controller/setor')
const Vendedor = require('../controller/vendedor')
const Produto = require('../controller/produto')
const Venda = require('../controller/venda')
const Detalhe = require('../controller/detalhe')

router.get('/setor/read', Setor.readSetores)
router.post('/setor/create', Setor.createSetor)

router.get('/vendedor/read', Vendedor.readVendedores)
router.post('/vendedor/create', Vendedor.createVendedor)

router.get('/produto/read', Produto.readProdutos)
router.post('/produto/create', Produto.createProduto)

router.get('/venda/read', Venda.readVendas)
router.post('/venda/create', Venda.createVenda)

router.get('/detalhe/read', Detalhe.readDetalhes)
router.post('/detalhe/create', Detalhe.createDetalhe)

module.exports = router;