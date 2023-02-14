var itemSetor = document.querySelector(".setor")

function carregar(){
    fetch("http://localhost:3000/setor/read")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        data.forEach(setor => {
            let novoSetor = itemSetor.cloneNode(true)

            novoSetor.classList.remove("modelo")

            let id = novoSetor.querySelector("#id")
            let nome = novoSetor.querySelector("#nome")
            let comissao = novoSetor.querySelector("#comissao")

            id.innerHTML += setor.id_setor
            nome.innerHTML += setor.nome
            comissao.innerHTML += setor.comissao + "%"

            document.querySelector("tbody").appendChild(novoSetor)
        })
    })
}

function enviar(){
    let nome = document.querySelector("#nome-cadastrar")
    let comissao = document.querySelector("#comissao-cadastrar")

    const data = {
        "nome": nome.value,
        "comissao": Number(comissao.value)
    }

    fetch("http://localhost:3000/setor/create", {
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