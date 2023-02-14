var itemProduto = document.querySelector(".produto")

function carregar(){
    fetch("http://localhost:3000/produto/read")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        data.forEach(produto => {
            console.log(itemProduto)
            let novoProduto = itemProduto.cloneNode(true)

            novoProduto.classList.remove("modelo")

            let id = novoProduto.querySelector("#id")
            let nome = novoProduto.querySelector("#nome")
            let valor = novoProduto.querySelector("#valor")
            let setor = novoProduto.querySelector("#setor")

            id.innerHTML += produto.id_produto
            nome.innerHTML += produto.nome
            valor.innerHTML += "R$" + produto.valor 
            setor.innerHTML += produto.id_setor

            document.querySelector("tbody").appendChild(novoProduto)
        })
    })
}

function enviar(){
    let nome = document.querySelector("#nome-cadastrar")
    let valor = document.querySelector("#valor-cadastrar")
    let setor = document.querySelector("#id-setor-cadastrar")

    const data = {
        "nome":nome.value,
        "valor":parseFloat(valor.value),
        "id_setor":parseInt(setor.value)
    }

    fetch("http://localhost:3000/produto/create", {
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