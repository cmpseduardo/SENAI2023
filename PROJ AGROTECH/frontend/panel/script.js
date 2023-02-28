function carregarPainel() {
    document.querySelector(".main-home").classList.remove("hidden")

    document.querySelector(".main-alocacoes").classList.add("hidden")
    document.querySelector(".main-manutencoes").classList.add("hidden")
    document.querySelector(".main-motoristas").classList.add("hidden")

    document.querySelector(".option1").classList.add("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
}

function carregarAlocacoes() {
    document.querySelector(".main-home").classList.add("hidden")
    document.querySelector(".main-manutencoes").classList.add("hidden")
    document.querySelector(".main-motoristas").classList.add("hidden")

    document.querySelector(".main-alocacoes").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.add("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")

    let itemAlocacao = document.querySelector(".informacoes-alocacao")

    fetch("http://localhost:3000/alocacao")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach(alocacao => {

                let novoItem = itemAlocacao.cloneNode(true)
                novoItem.classList.remove("modelo")

                idAlocacao = novoItem.querySelector("#id-alocacao")
                motorista = novoItem.querySelector("#motorista")
                veiculo = novoItem.querySelector("#veiculo")
                dataSaida = novoItem.querySelector("#data-saida")
                dataRetorno = novoItem.querySelector("#data-retorno")
                descricao = novoItem.querySelector("#descricao-alocacao")
                console.log(novoItem)

                idAlocacao.innerHTML = alocacao.id_alocacao;
                motorista.innerHTML = alocacao.id_motorista;
                veiculo.innerHTML = alocacao.id_veiculo;
                dataSaida.innerHTML = alocacao.data_saida;
                dataRetorno.innerHTML = alocacao.data_retorno;
                descricao.innerHTML = alocacao.desc;


                document.querySelector(".tbody-alocacoes").appendChild(novoItem);
            })
        })
}


function carregarManutencoes() {
    document.querySelector(".main-home").classList.add("hidden")
    document.querySelector(".main-alocacoes").classList.add("hidden")
    document.querySelector(".main-motoristas").classList.add("hidden")

    document.querySelector(".main-manutencoes").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.add("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
}

function carregarMotoristas() {
    document.querySelector(".main-home").classList.add("hidden")
    document.querySelector(".main-alocacoes").classList.add("hidden")
    document.querySelector(".main-manutencoes").classList.add("hidden")

    document.querySelector(".main-motoristas").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.add("selected-option")
}
