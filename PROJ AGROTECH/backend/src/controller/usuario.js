const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const read = async(req, res) => {
    const usuario = await prisma.usuario.findMany()

    res.status(200).json(usuario).end()
}

const create = async (req, res) => {
    const info = req.body

    const usuario = await prisma.usuario.create({
        data:info
    })

    res.status(200).json(usuario).end()
}

const update = async (req, res) => {
    const usuario = await prisma.usuario.update({
        where: {
            id_usuario: Number(req.body.id)
        },
        data: req.body
    })

    res.status(200).json(usuario).end()
}

const remove = async (req, res) => {
    const usuario = await prisma.usuario.delete({
        where: {
            id_usuario: Number(req.body.id)
        }
    })
    res.status(200).json({msg:"Usuário Deletado"}).end()
}

module.exports = {
    read,
    create,
    remove,
    update
}