var itemVenda = document.querySelector(".venda")

function carregar(){
    fetch("http://localhost:3000/venda/read")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        data.forEach(venda => {
            let novaVenda = itemVenda.cloneNode(true)

            novaVenda.classList.remove("modelo")

            let dataVenda = document.querySelector("#data-venda")
            let nomeVendedor = document.querySelector("#nome-read")
            let idVendedor = document.querySelector("#id-vendedor-read")
            let quantidadeProduto = document.querySelector("#quantidade-read")
            let idProduto = document.querySelector("#id-produto-read")
            let nomeProduto = document.querySelector("#nome-produto-read")
            let valorProduto = document.querySelector("#valor-produto-read")
            let idSetor = document.querySelector("#id-setor-read")

            dataVenda.innerHTML = venda.data_venda.slice(0, 10)
            nomeVendedor.innerHTML = venda.vendedor.nome
            idVendedor.innerHTML = venda.vendedor.id_vendedor
            quantidadeProduto.innerHTML = venda.detalhe[0].quantidade
            console.log(quantidadeProduto)
            idProduto.innerHTML = venda.detalhe[0].produto.id_produto
            nomeProduto.innerHTML = venda.detalhe[0].produto.nome
            valorProduto.innerHTML = "R$" + venda.detalhe[0].produto.valor
            idSetor.innerHTML = venda.detalhe[0].produto.id_setor

            console.log(novaVenda)

            document.querySelector("tbody").appendChild(novaVenda)
        })
    })
}

function enviar(){
    let idVendedor = document.querySelector("#id-cadastrar")
    let idProduto = document.querySelector("#id-produto")
    let quantidade = document.querySelector("#quantidade")

    const data = {
        "id_vendedor":Number(idVendedor.value),
        "detalhe":[
            {
                "id_produto":Number(idProduto.value),
                "quantidade":Number(quantidade.value)
            }
        ]
    }

    fetch("http://localhost:3000/venda/create", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
    .then(response => {
        if(response !== undefined) {
            window.location.reload()
        }
    })
}