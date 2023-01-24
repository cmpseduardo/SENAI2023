function gerarPedido(){
    let cliente = document.querySelector("#cliente")
    let endereco = document.querySelector("#endereco")
    let produto = document.querySelector("#produto")
    let dataPedido = new Date().toLocaleDateString();
    let horaPedido = new Date().toLocaleTimeString()
    let idEntregador = Math.floor(Math.random() * 4 + 1)

    const info = {
        "cliente":cliente.value,
        "endereco":endereco.value,
        "produto":produto.value,
        "data_pedido":dataPedido,
        "hora_pedido":horaPedido,
        "hora_entrega":"00:00:00",
        "hora_fim":"00:00:00",
        "id_entregador":idEntregador
    }

    fetch("http://localhost:3000/create", {
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify(info)
    })
    .then(res => {return res.json()})
    .then(data => {
        if(data.erro === undefined){
            alert("Pedido Enviado!")
        } else {
            alert("Algo deu errado")
        }
    })
}