const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const readSetores = async (req, res) => {
    let setor = await prisma.setor.findMany({
        select: {
            nome: true,
            comissao: true,
            vendedor: true,
            produto: true
        }
    })

    res.status(200).json(setor).end()
}

const createSetor = async (req, res) => {
    let setor = await prisma.setor.create({
        data: req.body
    })

    res.status(200).json(setor).end()
}

module.exports = {
    readSetores,
    createSetor
}