const express = require('express')
const router = express.Router()

const Pedido = require("./../controllers/pedido.controller")

router.get("/read", Pedido.readPedidos)
router.post("/create", Pedido.createPedido)

module.exports = router