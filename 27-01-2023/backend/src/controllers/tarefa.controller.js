const Tarefa = require('../models/tarefa.model')
const con = require('../DAO/lista')

const readTarefas = (req, res) => {
    con.query(Tarefa.readAll(), (err, result) => {
        if(err == null){
            res.status(200).json(result).end()
        } else {
            res.status(400).json(err).end()
        }
    })
}

const readAbertas = (req, res) => {
    con.query(Tarefa.readTarefasAbertas(), (err, result) => {
        if(err == null){
            res.status(200).json(result).end()
        } else {
            res.status(400).json(err).end()
        }
    })
}

const readFinalizadas = (req, res) => {
    con.query(Tarefa.readTarefasFinalizadas(), (err, result) => {
        if(err == null){
            res.status(200).json(result).end()
        } else {
            res.status(400).json(err).end()
        }
    })
}

const readCanceladas = (req, res) => {
    con.query(Tarefa.readTarefasCanceladas(), (err, result) => {
        if(err == null){
            res.status(200).json(result).end()
        } else {
            res.status(400).json(err).end()
        }
    })
}

const createTarefa = (req, res) => {
    con.query(Tarefa.createTarefa(req.body), (err, result) => {
        if(err == null){
            res.status(201).json(req.body).end();
        } else {
            res.status(400).json(err).end()
        }
    })
}

const updateFinalizado = (req, res) => {
    con.query(Tarefa.toUpdateFinalizado(req.params), (err, result) => {
        if (err == null)
            if (result.affectedRows > 0)
                res.status(200).end();
            else
                res.status(404).end();
        else
            res.status(500).json(err).end();
    });
}

const updateCancelado = (req, res) => {
    con.query(Tarefa.toUpdateCancelado(req.params), (err, result) => {
        if (err == null)
            if (result.affectedRows > 0)
                res.status(200).end();
            else
                res.status(404).end();
        else
            res.status(500).json(err).end();
    });
}

const toLogin = (req, res) => {
    con.query(Tarefa.fazerLogin(req.body), (err, result) => {
        if(err == null){
            res.status(201).json(req.body).end();
        } else {
            res.status(400).json(err).end()
        }
    })

}

module.exports = {
    readTarefas,
    readAbertas,
    readFinalizadas,
    readCanceladas,
    createTarefa,
    updateFinalizado,
    updateCancelado,
    toLogin
}