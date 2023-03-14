const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body
    console.log(info)
    const manutencao = await prisma.manutencao.create({
        data: info
    })

    res.status(200).json(manutencao).end()
}

const read = async (req, res) => {
    const manutencao = await prisma.manutencao.findMany({
        select: {
            id_manutencao: true,
            data_inicio: true,
            data_fim: true,
            custo: true,
            desc: true,
            veiculo: true,
            finalizado: true
        }
    })

    res.status(200).json(manutencao).end()
}

const update = async (req, res) => {
    console.log(req.body)
    const manutencao = await prisma.manutencao.update({
        where: {
            id_manutencao: req.body.id_manutencao
        },
        data: req.body
    })

    res.status(200).json(manutencao).end()
}

const remove = async (req, res) => {
    const manutencao = await prisma.manutencao.delete({
        where: {
            id: Number(req.body.id)
        }
    })

    res.status(200).json(manutencao).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}