const express = require('express')

const router = express.Router()

const Setor = require('../controller/setor')
const Vendedor = require('../controller/vendedor')
const Produto = require('../controller/produto')

router.get('/setor/read', Setor.readSetores)
router.post('/setor/create', Setor.createSetor)

router.get('/vendedor/read', Vendedor.readVendedores)
router.post('/vendedor/create', Vendedor.createVendedor)

router.get('/produto/read', Produto.readProdutos)
router.post('/produto/create', Produto.createProduto)

module.exports = router;