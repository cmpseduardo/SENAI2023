const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const readVendas = async (req, res) => {
    let vendas = await prisma.venda.findMany()

    res.status(200).json(vendas).end()
}

const createVenda = async (req, res) => {
    let venda = await prisma.venda.createMany({
        data: req.body
    })

    res.status(200).json(venda).end()
}

module.exports = {
    readVendas,
    createVenda
}