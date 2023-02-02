const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const readProdutos = async (req, res) => {
    let produtos = await prisma.produto.findMany()

    res.status(200).json(produtos).end()
}

const createProduto = async (req, res) => {
    let produto = await prisma.produto.create({
        data: req.body
    })

    res.status(200).json(produto).end()
}

module.exports = {
    readProdutos,
    createProduto
}