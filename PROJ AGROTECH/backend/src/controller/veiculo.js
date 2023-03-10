const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body
    console.log(info)
    const veiculo = await prisma.veiculo.create({
        data: info
    })

    res.status(200).json(veiculo).end()
}

const read = async (req, res) => {
    const veiculo = await prisma.veiculo.findMany()

    res.status(200).json(veiculo).end()
}

const update = async (req, res) => {
    const veiculo = await prisma.veiculo.update({
        where: {
            id_veiculo: Number(req.body.id_veiculo)
        },
        data: req.body
    })

    res.status(200).json(veiculo).end()
}

const remove = async (req, res) => {
    const veiculo = await prisma.veiculo.delete({
        where: {
            id: Number(req.body.id)
        }
    })

    res.status(200).json(veiculo).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}