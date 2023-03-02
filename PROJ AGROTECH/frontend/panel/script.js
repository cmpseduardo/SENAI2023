// CARREGAR
function carregarPainel() {
    document.querySelector(".main-alocacoes").classList.add("hidden")
    document.querySelector(".main-manutencoes").classList.add("hidden")
    document.querySelector(".main-motoristas").classList.add("hidden")
    document.querySelector(".main-veiculos").classList.add("hidden")

    document.querySelector(".main-home").classList.remove("hidden")

    document.querySelector(".option1").classList.add("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
    document.querySelector(".option5").classList.remove("selected-option")
}

function carregarAlocacoes() {
    document.querySelector(".main-home").classList.add("hidden")
    document.querySelector(".main-manutencoes").classList.add("hidden")
    document.querySelector(".main-motoristas").classList.add("hidden")
    document.querySelector(".main-veiculos").classList.add("hidden")

    document.querySelector(".main-alocacoes").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.add("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
    document.querySelector(".option5").classList.remove("selected-option")

    let itemAlocacao = document.querySelector(".informacoes-alocacao")

    fetch("http://localhost:3000/alocacao")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.querySelector(".tbody-alocacoes").innerHTML = ""
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
                dataSaida.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short'}).format(new Date(alocacao.data_saida));
                dataRetorno.innerHTML = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short'}).format(new Date(alocacao.data_retorno));
                descricao.innerHTML = alocacao.desc;


                document.querySelector(".tbody-alocacoes").appendChild(novoItem);
            })
        })
}

function carregarManutencoes() {
    document.querySelector(".main-home").classList.add("hidden")
    document.querySelector(".main-alocacoes").classList.add("hidden")
    document.querySelector(".main-motoristas").classList.add("hidden")
    document.querySelector(".main-veiculos").classList.add("hidden")

    document.querySelector(".main-manutencoes").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.add("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
    document.querySelector(".option5").classList.remove("selected-option")

    let itemManutencao = document.querySelector(".informacoes-manutencao")

    fetch("http://localhost:3000/manutencao")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.querySelector(".tbody-manutencoes").innerHTML = ""
        data.forEach(manutencao => {
            console.log(document.querySelector(".tbody-manutencoes"))
            let novoItem = itemManutencao.cloneNode(true)
            novoItem.classList.remove("modelo")

            idManutencao = novoItem.querySelector("#id-manutencao")
            idVeiculo = novoItem.querySelector("#id-veiculo")
            dataInicio = novoItem.querySelector("#data-inicio-manutencao")
            dataFim = novoItem.querySelector("#data-fim-manutencao")
            custoManutencao = novoItem.querySelector("#custo-manutencao")
            descricao = novoItem.querySelector("#descricao-manutencao")

            console.log(novoItem)

            idManutencao.innerHTML = manutencao.id_manutencao
            idVeiculo.innerHTML = manutencao.id_veiculo
            dataInicio.innerHTML = manutencao.data_inicio
            dataFim.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short'}).format(new Date(manutencao.data_fim))
            custoManutencao.innerHTML = manutencao.custo
            descricao.innerHTML = manutencao.desc


            document.querySelector(".tbody-manutencoes").appendChild(novoItem);
        })
    })
}

function carregarMotoristas() {
    document.querySelector(".main-home").classList.add("hidden")
    document.querySelector(".main-alocacoes").classList.add("hidden")
    document.querySelector(".main-manutencoes").classList.add("hidden")
    document.querySelector(".main-veiculos").classList.add("hidden")

    document.querySelector(".main-motoristas").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.add("selected-option")
    document.querySelector(".option5").classList.remove("selected-option")

    let itemMotorista = document.querySelector(".informacoes-motorista")

    fetch("http://localhost:3000/motorista")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.querySelector(".tbody-motoristas").innerHTML = ""
        data.forEach(motorista => {
            console.log(document.querySelector(".tbody-motoristas"))
            let novoItem = itemMotorista.cloneNode(true)
            novoItem.classList.remove("modelo")

            idMotorista = novoItem.querySelector("#id-motorista")
            nomeMotorista = novoItem.querySelector("#nome-motorista")
            cpfMotorista = novoItem.querySelector("#cpf-motorista")
            cnhMotorista = novoItem.querySelector("#cnh-motorista")

            console.log(novoItem)

            idMotorista.innerHTML = motorista.id_motorista;
            nomeMotorista.innerHTML = motorista.nome;
            cpfMotorista.innerHTML = motorista.cpf;
            cnhMotorista.innerHTML = motorista.cnh;
            
            document.querySelector(".tbody-motoristas").appendChild(novoItem);
        })
    })
}

function carregarVeiculos() {
    document.querySelector(".main-home").classList.add("hidden")
    document.querySelector(".main-alocacoes").classList.add("hidden")
    document.querySelector(".main-manutencoes").classList.add("hidden")
    document.querySelector(".main-motoristas").classList.add("hidden")

    document.querySelector(".main-veiculos").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
    document.querySelector(".option5").classList.add("selected-option")

    let itemVeiculo = document.querySelector(".informacoes-veiculo")

    fetch("http://localhost:3000/veiculo")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.querySelector(".tbody-veiculos").innerHTML = ""
        data.forEach(veiculo => {
            console.log(document.querySelector(".tbody-veiculos"))
            let novoItem = itemVeiculo.cloneNode(true)
            novoItem.classList.remove("modelo")

            idVeiculo = novoItem.querySelector("#id-veiculo")
            placaVeiculo = novoItem.querySelector("#placa-veiculo")
            modeloVeiculo = novoItem.querySelector("#modelo-veiculo")
            marcaVeiculo = novoItem.querySelector("#marca-veiculo")
            tipoVeiculo = novoItem.querySelector("#tipo-veiculo")
            disponivelVeiculo = novoItem.querySelector("#disponivel-veiculo")

            console.log(novoItem)

            idVeiculo.innerHTML = veiculo.id_veiculo;
            placaVeiculo.innerHTML = veiculo.placa;
            modeloVeiculo.innerHTML = veiculo.modelo;
            marcaVeiculo.innerHTML = veiculo.marca;
            tipoVeiculo.innerHTML = veiculo.tipo;

            if(veiculo.disponivel == true){
                disponivelVeiculo.innerHTML = "DISPONÍVEL"
            } else {
                disponivelVeiculo.innerHTML = "INDISPONÍVEL"
            }

            console.log(novoItem)
            
            document.querySelector(".tbody-veiculos").appendChild(novoItem);
        })
    })
}



// CRIAR
