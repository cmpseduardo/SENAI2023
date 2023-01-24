const Pedido = require('../models/pedido.model')
const con = require('../DAO/restaurante.dao')

const readPedidos = (req, res) => {
    con.query(Pedido.readAll(), (err, result) => {
        if(err == null){
            res.status(200).json(result).end()
        } else {
            res.status(400).json(err).end()
        }
    })
}

const createPedido = (req, res) => {
    con.query(Pedido.toCreate(req.body), (err, result) => {
        if(err == null){
            res.status(201).json(req.body).end();
        } else {
            res.status(400).json(err).end()
        }
    })
}

module.exports = {
    readPedidos,
    createPedido
}