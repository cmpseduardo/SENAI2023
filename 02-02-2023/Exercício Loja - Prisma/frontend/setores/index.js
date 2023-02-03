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
            comissao.innerHTML += setor.comissao

            document.querySelector("main").appendChild(novoSetor)
        })
    })
}