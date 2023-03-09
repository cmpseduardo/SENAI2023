const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const alocacao = await prisma.alocacao.create({
        data: info
    })

    const motorista = await prisma.motorista.update({
        where: {
            id_motorista: info.id_motorista
        },
        data: {
            disponivel: false
        }
    })

    const veiculo = await prisma.veiculo.update({
        where: {
            id_veiculo: info.id_veiculo
        },
        data: {
            disponivel: false
        }
    })

    const transaction = await prisma.$transaction([alocacao, motorista, veiculo])

    res.status(200).json(transaction).end()
}


const read = async (req, res) => {
    const alocacao = await prisma.alocacao.findMany({
        select: {
            veiculo: true,
            motorista: true,
            id_alocacao: true,
            data_saida: true,
            data_retorno: true,
            desc: true
        },
    }
    )
    res.status(200).json(alocacao).end()
}


const update = async (req, res) => {
    const info = req.body

    const alocacao = prisma.alocacao.update({
        where: {
            id_alocacao: Number(req.body.id_alocacao)
        },
        data: {
            data_retorno: req.body.data_retorno
        }
    })

    if (info.id_motorista !== undefined) {
        const motorista = prisma.motorista.update({
            where: {
                id_motorista: Number(req.body.id_motorista)
            },
            data: {
                disponivel: true
            }
        })

        const veiculo = prisma.veiculo.update({
            where: {
                id_veiculo: info.id_veiculo
            },
            data: {
                disponivel: true
            }
        })

        const transaction = await prisma.$transaction([alocacao, motorista, veiculo])

        res.status(200).json(transaction).end()
    } else {

        const transaction = await prisma.$transaction([alocacao])

        res.status(200).json(transaction).end()
    }
}


const remove = async (req, res) => {
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