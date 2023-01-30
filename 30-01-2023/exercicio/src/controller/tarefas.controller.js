const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const read = async (req, res) => {
    const tarefas = await prisma.tarefas.findMany()

    res.status(200).json(tarefas).end()
}

module.exports = {
    read
}