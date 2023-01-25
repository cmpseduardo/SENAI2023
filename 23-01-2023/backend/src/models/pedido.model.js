const readAll = () => {
    return `SELECT * FROM pedidos`
}

const toCreate = (model) => {
    return `INSERT INTO pedidos VALUES(DEFAULT, '${model.cliente}', '${model.endereco}', '${model.produto}', CURDATE(), CURTIME(), '${model.hora_entrega}', '${model.hora_fim}', ${model.id_entregador})`
}

const toUpdateEntrega = (model) => {
    return `UPDATE pedidos SET
    hora_entrega = '${model.hora_entrega}'
    WHERE id_pedido = '${model.id_pedido}'`
}

const toUpdateFim = (model) => {
    return `UPDATE pedidos SET
    hora_fim = '${model.hora_fim}'
    WHERE id_pedido = '${model.id_pedido}'`
}

module.exports = {
    readAll,
    toCreate,
    toUpdateEntrega,
    toUpdateFim
}