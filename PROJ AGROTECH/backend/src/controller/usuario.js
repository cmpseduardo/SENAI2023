const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const usuario = await prisma.usuario.create({
        data:info
    })

    res.status(200).json(usuario).end()
}

const remove = async (req, res) => {
    const user = await prisma.usuario.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json({msg:"Usuário Deletado"}).end()
}

module.exports = {
    create,
    remove
}