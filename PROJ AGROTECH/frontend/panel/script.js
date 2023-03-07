// PAINEL
function contar() {
    function veiculos() {
        let cont = 0
        fetch("http://localhost:3000/veiculo")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach(veiculo => {
                    cont++
                    if (veiculo != undefined) {
                        document.querySelector("#n-veic").innerHTML = cont
                    }
                })
            })
    }
    function veiculosManutencao() {
        let cont = 0
        fetch("http://localhost:3000/manutencao")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach(manutencao => {
                    cont++
                    if (manutencao != undefined) {
                        document.querySelector("#n-veic-manutencoes").innerHTML = cont
                    }
                })
            })
    }
    function veiculosEmUso() {
        let cont = 0
        fetch("http://localhost:3000/veiculo")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach(veiculo => {
                    if (veiculo != undefined && veiculo.disponivel == false) {
                        cont++
                        document.querySelector("#veic-uso").innerHTML = cont
                    }
                })
            })
    }
    function motoristas() {
        let cont = 0
        fetch("http://localhost:3000/motorista")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach(motorista => {
                    cont++
                    if (motorista != undefined) {
                        document.querySelector("#n-motoristas").innerHTML = cont
                    }
                })
            })
    }

    veiculos()
    veiculosManutencao()
    veiculosEmUso()
    motoristas()
}

function alocacoesRecentes() {
    let itemAlocacao = document.querySelector(".informacoes-alocacao-painel")
    fetch("http://localhost:3000/alocacao")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.sort((a, b) => b.id_alocacao - a.id_alocacao);
            document.querySelector(".tbody-alocacoes-painel").innerHTML = ""

            for (let i = 0; i < 3; i++) {
                const item = data[i]

                let novoItem = itemAlocacao.cloneNode(true)
                novoItem.classList.remove("modelo")

                idAlocacao = novoItem.querySelector("#id-alocacao-painel")
                motorista = novoItem.querySelector("#id-motorista-painel")
                veiculo = novoItem.querySelector("#id-veiculo-painel")
                dataSaida = novoItem.querySelector("#data-saida-painel")
                dataRetorno = novoItem.querySelector("#data-retorno-painel")
                descricao = novoItem.querySelector("#descricao-painel")
                console.log(novoItem)

                idAlocacao.innerHTML = item.id_alocacao;
                motorista.innerHTML = item.id_motorista;
                veiculo.innerHTML = item.id_veiculo;
                dataSaida.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(item.data_saida));
                if (item.data_retorno == null) {
                    dataRetorno.innerHTML = ""
                } else {
                    dataRetorno.innerHTML = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(item.data_retorno));
                }
                descricao.innerHTML = item.desc;


                document.querySelector(".tbody-alocacoes-painel").appendChild(novoItem);
            }
        })

}

// FETCH GET
function carregarPainel() {
    document.querySelector(".main-alocacoes").classList.add("modelo")
    document.querySelector(".main-manutencoes").classList.add("modelo")
    document.querySelector(".main-motoristas").classList.add("modelo")
    document.querySelector(".main-veiculos").classList.add("modelo")

    document.querySelector(".main-home").classList.remove("modelo")

    document.querySelector(".option1").classList.add("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
    document.querySelector(".option5").classList.remove("selected-option")
}

function carregarAlocacoes() {
    document.querySelector(".main-home").classList.add("modelo")
    document.querySelector(".main-manutencoes").classList.add("modelo")
    document.querySelector(".main-motoristas").classList.add("modelo")
    document.querySelector(".main-veiculos").classList.add("modelo")

    document.querySelector(".main-alocacoes").classList.remove("modelo")

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
                dataReentorno = novoItem.querySelector("#data-retorno")
                descricao = novoItem.querySelector("#descricao-alocacao")
                console.log(novoItem)

                idAlocacao.innerHTML = alocacao.id_alocacao;
                motorista.innerHTML = alocacao.id_motorista;
                veiculo.innerHTML = alocacao.id_veiculo;
                dataSaida.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(alocacao.data_saida));
                if (alocacao.data_retorno == null) {
                    dataRetorno.innerHTML = ""
                } else {
                    dataRetorno.innerHTML = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(alocacao.data_retorno));
                }
                descricao.innerHTML = alocacao.desc;


                document.querySelector(".tbody-alocacoes").appendChild(novoItem);
            })
        })
}

function carregarManutencoes() {
    document.querySelector(".main-home").classList.add("modelo")
    document.querySelector(".main-alocacoes").classList.add("modelo")
    document.querySelector(".main-motoristas").classList.add("modelo")
    document.querySelector(".main-veiculos").classList.add("modelo")

    document.querySelector(".main-manutencoes").classList.remove("modelo")

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
                dataInicio.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(manutencao.data_inicio))
                if (manutencao.data_fim == null) {
                    dataFim.innerHTML = ""
                } else {
                    dataFim.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(manutencao.data_fim))
                }
                custoManutencao.innerHTML = "R$" + manutencao.custo + ",00"
                descricao.innerHTML = manutencao.desc


                document.querySelector(".tbody-manutencoes").appendChild(novoItem);
            })
        })
}

function carregarMotoristas() {
    document.querySelector(".main-home").classList.add("modelo")
    document.querySelector(".main-alocacoes").classList.add("modelo")
    document.querySelector(".main-manutencoes").classList.add("modelo")
    document.querySelector(".main-veiculos").classList.add("modelo")

    document.querySelector(".main-motoristas").classList.remove("modelo")

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
    document.querySelector(".main-home").classList.add("modelo")
    document.querySelector(".main-alocacoes").classList.add("modelo")
    document.querySelector(".main-manutencoes").classList.add("modelo")
    document.querySelector(".main-motoristas").classList.add("modelo")

    document.querySelector(".main-veiculos").classList.remove("modelo")

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

                if (veiculo.disponivel == true) {
                    disponivelVeiculo.innerHTML = "DISPONÍVEL"
                } else {
                    disponivelVeiculo.innerHTML = "INDISPONÍVEL"
                }

                console.log(novoItem)

                document.querySelector(".tbody-veiculos").appendChild(novoItem);
            })
        })
}



// FETCH POST
function cadastrarManutencoes() {
    let data = JSON.stringify({
        id_veiculo: Number(document.querySelector("#id-veiculo-manutencao-input").value),
        custo: Number(document.querySelector("#custo-manutencao-input").value),
        desc: document.querySelector("#descricao-manutencao-input").value
    });


    fetch("http://localhost:3000/manutencao", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": data
    })
        .then(resp => { return resp.json() })
        .then(data => {
            console.log(data)
            if (data.id_manutencao != undefined) {
                alert("Cadastrado com sucesso!")
            } else {
                alert("Ocorreu um erro");
            }
        })
}


function cadastrarMotorista() {
    let data = JSON.stringify({
        nome: document.querySelector("#nome-motorista-input").value,
        cpf: document.querySelector("#cpf-motorista-input").value,
        cnh: document.querySelector("#cnh-motorista-input").value,
    });


    fetch("http://localhost:3000/motorista", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": data
    })
        .then(resp => { return resp.json() })
        .then(data => {
            console.log(data)
            if (data.id_motorista != undefined) {
                alert("Cadastrado com sucesso!")
            } else {
                alert("Ocorreu um erro");
            }
        })
}


function cadastrarVeiculo() {
    let data = JSON.stringify({
        placa: document.querySelector("#placa-veiculo-input").value,
        modelo: document.querySelector("#modelo-veiculo-input").value,
        marca: document.querySelector("#marca-veiculo-input").value,
        tipo: document.querySelector("#tipo-veiculo-input").value
    });


    fetch("http://localhost:3000/veiculo", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": data
    })
        .then(resp => { return resp.json() })
        .then(data => {
            console.log(data)
            if (data.id_veiculo != undefined) {
                alert("Cadastrado com sucesso!")
            } else {
                alert("Ocorreu algum erro");
            }
        })
}


function cadastrarAlocacao() {
    let data = JSON.stringify({
        id_motorista: Number(document.querySelector("#id-motorista-alocacao").value),
        id_veiculo: Number(document.querySelector("#id-veiculo-alocacao").value),
        desc: document.querySelector("#desc-alocacao").value
    });


    fetch("http://localhost:3000/alocacao", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": data
    })
        .then(resp => { return resp.json() })
        .then(data => {
            console.log(data)
            if (data.id_alocacao != undefined) {
                alert("Cadastrado com sucesso!")
            } else {
                alert("Ocorreu algum erro");
            }
        })
}