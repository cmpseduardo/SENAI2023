const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async(req, res) => {
    const info = req.body

    const alocacao = await prisma.alocacao.create({
        data: info
    })


    res.status(200).json(alocacao).end()
}


const read = async(req, res) => {
    const alocacao = await prisma.alocacao.findMany()

    res.status(200).json(alocacao).end()
}


const update = async(req, res) => {
    const alocacao = await prisma.alocacao.update({
        where: {
            id_alocacao: Number(req.body.id_alocacao)
        },
        data: req.body
    })

    res.status(200).json(alocacao).end()
}


const remove = async(req, res) => {
    const alocacao = await prisma.alocacao.delete({
        where: {
            id: Number(req.body.id)
        }
    })

    res.status(200).json(alocacao).end()
}


module.exports = {
    create,
    read,
    update,
    remove
}