const readAll = () => {
    return `SELECT * FROM pedidos`
}

const toCreate = (model) => {
    return `INSERT INTO pedidos VALUES(DEFAULT, '${model.cliente}', '${model.endereco}', '${model.produto}', CURDATE(), CURTIME(), '${model.hora_entrega}', '${model.hora_fim}', ${model.id_entregador})`
}

module.exports = {
    readAll,
    toCreate
}