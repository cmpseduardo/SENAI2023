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
            salario.innerHTML += vendedor.salario 
            setor.innerHTML += vendedor.id_setor

            document.querySelector("main").appendChild(novoVendedor)
        })
    })
}