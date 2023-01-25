function gerarPedido(){
    let cliente = document.querySelector("#cliente")
    let endereco = document.querySelector("#endereco")
    let produto = document.querySelector("#produto")
    let dataPedido = new Date().toLocaleDateString()
    let horaPedido = new Date().toLocaleTimeString()
    let idEntregador = Math.floor(Math.random() * 4 + 1)

    let info = {
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
            window.location.reload(false)
        } else {
            alert("Algo deu errado")
        }
    })
}

function carregarPedidos(){
    fetch("http://localhost:3000/read")
    .then((response) => {
        return response.json()
    })
    .then((data)=> {
        data.forEach(pedido => {
            // IF - In execution
            if(pedido.hora_entrega == "00:00:00"){
                let itemPedido = document.querySelector(".item-pedido-em-ex")
                let novoItem = itemPedido.cloneNode(true)
                novoItem.classList.remove("modelo")

                let id = novoItem.querySelector("#label-id")
                let cliente = novoItem.querySelector("#label-cliente")
                let produto = novoItem.querySelector("#label-produto")
                let endereco = novoItem.querySelector("#label-endereco")
                let data = novoItem.querySelector("#label-data")
                let horario = novoItem.querySelector("#label-horario")
                let botao = novoItem.querySelector("button")

                id.innerHTML += pedido.id_pedido
                cliente.innerHTML += pedido.cliente
                produto.innerHTML += pedido.produto
                endereco.innerHTML += pedido.endereco
                data.innerHTML += pedido.data_pedido.slice(0, 10)
                horario.innerHTML += pedido.hora_pedido
                botao.id = pedido.id_pedido

                document.querySelector(".em-execucao").appendChild(novoItem)

            // ELSE - On the way
            } else if(pedido.hora_entrega != "00:00:00" && pedido.hora_fim == "00:00:00") {
                    let itemPedido = document.querySelector(".item-pedido-a-cam")
                    let novoItem = itemPedido.cloneNode(true)
                    novoItem.classList.remove("modelo")
    
                    let id = novoItem.querySelector("#label-id")
                    let cliente = novoItem.querySelector("#label-cliente")
                    let produto = novoItem.querySelector("#label-produto")
                    let endereco = novoItem.querySelector("#label-endereco")
                    let data = novoItem.querySelector("#label-data")
                    let horario = novoItem.querySelector("#label-horario")
                    let entrega = novoItem.querySelector("#label-horario-entrega")
                    let entregador = novoItem.querySelector("#label-entregador")
                    let botao = novoItem.querySelector("button")
    
                    id.innerHTML = `Id: ${pedido.id_pedido}`
                    cliente.innerHTML = `Cliente: ${pedido.cliente}`
                    produto.innerHTML = `Produto: ${pedido.produto}`
                    endereco.innerHTML = `Endereço: ${pedido.endereco}`
                    data.innerHTML = `Data: ${pedido.data_pedido.slice(0, 10)}`
                    horario.innerHTML = `Horário: ${pedido.hora_pedido}`
                    entrega.innerHTML = `Entrega: ${pedido.hora_entrega}`
                    entregador.innerHTML = `Entregador: ${pedido.id_entregador}`

                    botao.id = pedido.id_pedido

                    document.querySelector(".a-caminho").appendChild(novoItem)
            }
        })

    })
}


function enviarEntrega(e){

    let info = {
        "hora_entrega": new Date().toLocaleTimeString(),
        "id_pedido": e.id
    }


    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(info)
      };
      
      fetch('http://localhost:3000/updateEntrega', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        window.location.reload(false)
}


function enviarPedidoFim(e){
    let info = {
        "hora_fim": new Date().toLocaleTimeString(),
        "id_pedido": e.id
    }


    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(info)
      };
      
      fetch('http://localhost:3000/updateFim', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        alert(`Pedido entregue ${info.hora_fim}`)
        window.location.reload(false)
}

