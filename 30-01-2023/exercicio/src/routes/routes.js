const express = require('express')
const router = express.Router()
const Tarefas = require('./../controller/tarefas.controller')

router.get('/lista', Tarefas.read)

module.exports = router;