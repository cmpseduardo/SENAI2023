// const bcrypt = require('bcrypt')
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// const jwt = require('jsonwebtoken')

// const toLogin = async(req, res) => {
//     const usuario = await prisma.usuario.findFirstOrThrow({
//         where: {
//             email: req.body.email
//         }
//     }).then((value) => { return (value) })
//     .catch((err) => { return { "erro": "Usuário Incorreto", "validacao": false }})

//     if(usuario.erro == null){
//         bcrypt.compare(req.body.senha, usuario.senha).then((value) => {
//             if(value){
//                 let data = { "userid": usuario.id, "tipo": usuario.tipo }
//             }
//         })
//     }
// }