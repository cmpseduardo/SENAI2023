var itemVendedor = document.querySelector(".vendedor")

function carregar(){
    fetch("http://localhost:3000/vendedor/read")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        data.forEach(vendedor => {
            console.log(itemVendedor)
            let novoVendedor = itemVendedor.cloneNode(true)

            novoVendedor.classList.remove("modelo")

            let id = novoVendedor.querySelector("#id")
            let nome = novoVendedor.querySelector("#nome")
            let salario = novoVendedor.querySelector("#salario")
            let setor = novoVendedor.querySelector("#setor")

            id.innerHTML += vendedor.id_vendedor
            nome.innerHTML += vendedor.nome
            salario.innerHTML += "R$" + vendedor.salario 
            setor.innerHTML += vendedor.id_setor

            document.querySelector("tbody").appendChild(novoVendedor)
        })
    })
}

function enviar(){
    let nome = document.querySelector("#nome-cadastrar")
    let salario = document.querySelector("#salario-cadastrar")
    let setor = document.querySelector("#id-setor-cadastrar")

    const data = {
        "nome":nome.value,
        "salario":parseFloat(salario.value),
        "id_setor":parseInt(setor.value)
    }

    fetch("http://localhost:3000/vendedor/create", {
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