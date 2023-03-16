const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const login = async (req, res) => {
    const { email, senha } = req.body

    console.log(email, senha)

    const usuario = await prisma.usuario.findMany({
        where: {
            AND: [
                { email: email },
                { senha: senha }
            ]
        }
    })
    if (usuario.length == 0) {
        res.status(401).end()
    } else {
        let user = usuario[0]
        delete user.senha
        delete user.email

        jwt.sign(user, process.env.KEY, { expiresIn: '1m' }, function (err, token) {
            if (err == null) {
                user.token = token;
                res.status(200).json(user).end();
            } else {
                res.status(404).json(err).end();
            }
        });
    }
}

module.exports = login
