const express = require('express')
const router = express.Router()

const Tarefa = require("./../controllers/tarefa.controller")

router.get("/read", Tarefa.readTarefas)
router.get("/readAbertas", Tarefa.readAbertas)
router.get("/readFinalizadas", Tarefa.readFinalizadas)
router.get("/readCanceladas", Tarefa.readCanceladas)
router.post("/create", Tarefa.createTarefa)
router.put("/updateFinalizado/:id_tarefa", Tarefa.updateFinalizado)
router.put("/updateCancelado/:id_tarefa", Tarefa.updateCancelado)
router.post("/login", Tarefa.toLogin)

module.exports = router