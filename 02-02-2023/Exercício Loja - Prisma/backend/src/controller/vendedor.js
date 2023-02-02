const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const readVendedores = async (req, res) => {
    let vendedores = await prisma.vendedor.findMany()

    res.status(200).json(vendedores).end()
}

const createVendedor = async (req, res) => {
    let vendedor = await prisma.vendedor.create({
        data: req.body
    })

    res.status(200).json(vendedor)
}

module.exports = {
    readVendedores,
    createVendedor
}