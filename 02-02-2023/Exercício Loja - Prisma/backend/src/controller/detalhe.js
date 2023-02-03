const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const readDetalhes = async (req, res) => {
    let detalhes = await prisma.detalhe.findMany()

    res.status(200).json(detalhes).end()
}

const createDetalhe = async (req, res) => {
    let detalhe = await prisma.detalhe.createMany({
        data: req.body
    })

    res.status(200).json(detalhe).end()
}

module.exports = {
    readDetalhes,
    createDetalhe
}