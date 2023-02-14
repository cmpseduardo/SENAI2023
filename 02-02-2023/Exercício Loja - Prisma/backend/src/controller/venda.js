const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const readVendas = async (req, res) => {
    let vendas = await prisma.venda.findMany({
        select: {
            data_venda: true,
            vendedor: {
                select: {
                    nome: true,
                    id_vendedor: true
                }
            },
            detalhe: {
                select: {
                    quantidade: true,
                    produto: true
                }
            }
        }
    })

    res.status(200).json(vendas).end()
}

const createVenda = async (req, res) => {
    let { id_vendedor } = req.body

    let venda = await prisma.venda.create({
        data: {
            id_vendedor,
            data_venda: new Date(),
            detalhe: {
                create: req.body.detalhe
            }
        }
    })
    res.status(200).json(venda).end()
}

module.exports = {
    readVendas,
    createVenda
}