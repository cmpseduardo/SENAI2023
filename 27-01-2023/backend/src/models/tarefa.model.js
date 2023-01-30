const readAll = () => {
    return `SELECT * FROM tarefas`
}

const readTarefasAbertas = () => {
    return `SELECT * FROM tarefas WHERE status_tarefa = "1- ABERTA"`
}

const readTarefasFinalizadas = () => {
    return `SELECT * FROM tarefas WHERE status_tarefa = "2- FINALIZADA"`
}

const readTarefasCanceladas = () => {
    return `SELECT * FROM tarefas WHERE status_tarefa = "3- CANCELADA"`
}

const fazerLogin = (model) => {
    return `SELECT * FROM usuarios WHERE email = '${model.email}' AND senha = '${model.senha}'`
}

const createTarefa = (model) => {
    return `INSERT INTO tarefas VALUES(DEFAULT, '${model.descricao}', CURTIME(), NULL, "1- ABERTA")`
}

const toUpdateFinalizado = (model) => {
    return `UPDATE tarefas SET
    horario_encerramento = CURTIME(), status_tarefa = "2- FINALIZADA"
    WHERE id_tarefa = ${model.id_tarefa}`
}

const toUpdateCancelado = (model) => {
    return `UPDATE tarefas SET
    horario_encerramento = CURTIME(), status_tarefa = "3- CANCELADA"
    WHERE id_tarefa = '${model.id_tarefa}'`
}

module.exports = {
    readAll,
    readTarefasAbertas,
    readTarefasFinalizadas,
    readTarefasCanceladas,
    createTarefa,
    toUpdateFinalizado,
    toUpdateCancelado,
    fazerLogin
}