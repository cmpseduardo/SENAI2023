const buttonOrdemDesc = document.querySelector("#alterar-ordem-desc")
const buttonOrdemCresc = document.querySelector("#alterar-ordem-cresc")

let userData = {}

try {
    userData = JSON.parse(localStorage.getItem("data"));

    if (userData.token == undefined) {
        window.location.href = "../login/"
    }
} catch (err) {
    window.location.href = "../login/"
}
// PAINEL
async function contar() {

    var contVeic = 0
    var contVeicDisp = 0
    var contVeicUso = 0
    var contMoto = 0

    async function veiculos() {
        const response = await fetch("http://localhost:3000/veiculo")
        const data = await response.json()
        data.forEach(veiculo => {
            contVeic++
            if (veiculo != undefined) {
                document.querySelector("#n-veic").innerHTML = contVeic
            }
        })
    }

    async function veiculosDisp() {
        const response = await fetch("http://localhost:3000/veiculo")
        const data = await response.json()
        data.forEach(veiculo => {
            if (veiculo != undefined && veiculo.disponivel == true) {
                contVeicDisp++
                document.querySelector("#n-veic").innerHTML = contVeicDisp
            }
        })
    }

    async function veiculosEmUso() {
        const response = await fetch("http://localhost:3000/veiculo")
        const data = await response.json()
        data.forEach(veiculo => {
            if (veiculo != undefined && veiculo.disponivel == false) {
                contVeicUso++
                document.querySelector("#veic-uso").innerHTML = contVeicUso
            }
        })
    }

    var motoristasDisp = 0
    var motoristasIndisp = 0
    async function motoristas() {
        const response = await fetch("http://localhost:3000/motorista")
        const data = await response.json()
        data.forEach(motorista => {
            contMoto++
            if (motorista != undefined) {
                document.querySelector("#n-motoristas").innerHTML = contMoto
            }

            if (motorista.disponivel == true) {
                motoristasDisp++
            } else if (motorista.disponivel == false) {
                motoristasIndisp++
            }
        })
    }

    await veiculosDisp()
    await veiculosEmUso()
    await motoristas()
    await veiculos()

    var ctx = document.getElementById('grafico-veiculos').getContext('2d')

    function criarGrafico() {
        console.log(contVeic, contVeicDisp, contVeicUso, contMoto)
        var meuGrafico = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Veículos Indisponíveis', 'Veículos Disponíveis'],
                datasets: [{
                    label: 'Veículos',
                    data: [contVeicUso, contVeicDisp],
                    backgroundColor: [
                        '#ff0000f9',
                        '#12be0c'
                    ],
                    borderColor: 'rgba(255,255,255,1)',
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                    labels: {
                        fontColor: 'white'
                    }
                }
            }

        })
    }

    criarGrafico()

    var ctz = document.getElementById('grafico-motoristas').getContext('2d')

    function criarGraficoMotoristas() {
        var graficoMotoristas = new Chart(ctz, {
            type: 'pie',
            data: {
                labels: ['Motoristas Indisponíveis', 'Motoristas Disponíveis'],
                datasets: [{
                    label: 'Motoristas',
                    data: [motoristasIndisp, motoristasDisp],
                    backgroundColor: [
                        '#dea405',
                        '#239700'
                    ],
                    borderColor: 'rgba(255,255,255,1)',
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                    labels: {
                        fontColor: 'white'
                    }
                }
            }

        })
    }

    criarGraficoMotoristas()
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
                // console.log(novoItem)

                idAlocacao.innerHTML = item.id_alocacao;
                motorista.innerHTML = item.motorista.nome;
                veiculo.innerHTML = item.veiculo.placa;
                dataSaida.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(item.data_saida));
                if (item.data_retorno == null) {
                    dataRetorno.innerHTML = "AGUARDANDO RETORNO"
                    dataRetorno.style.color = "#dea405"
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

function carregarOptionsAlocacao() {
    let itemOptionMotorista = document.querySelector("#option-motorista-modelo")

    fetch("http://localhost:3000/motorista")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach(motorista => {

                let novoItem = itemOptionMotorista.cloneNode(true)
                novoItem.classList.remove("modelo")

                // console.log(novoItem)


                novoItem.value = motorista.id_motorista
                novoItem.innerHTML = `${motorista.id_motorista} - ${motorista.nome}`
                // novoItem.id = "o" + motorista.id_motorista


                document.querySelector("#select-motorista").appendChild(novoItem)
                // console.log(novoItem)
                if (motorista.disponivel) {
                    novoItem.disabled = false
                } else {
                    novoItem.disabled = true
                }
            })
        })

    let itemOptionVeiculo = document.querySelector("#option-veiculo-modelo")

    fetch("http://localhost:3000/veiculo")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach(veiculo => {

                let novoItem = itemOptionVeiculo.cloneNode(true)
                novoItem.classList.remove("modelo")

                // console.log(novoItem)


                novoItem.value = veiculo.id_veiculo
                novoItem.innerHTML = `${veiculo.placa} - ${veiculo.modelo} - ${veiculo.tipo} - ${veiculo.marca}`
                // novoItem.id = "o" + motorista.id_motorista


                document.querySelector("#select-veiculo").appendChild(novoItem)
                // console.log(novoItem)
                if (veiculo.disponivel) {
                    novoItem.disabled = false
                } else {
                    novoItem.disabled = true
                }

            })
        })
}

function carregarOptionsManutencoes() {
    let itemOptionVeiculo = document.querySelector("#option-veiculo-manutencao-modelo")

    fetch("http://localhost:3000/veiculo")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach(motorista => {

                let novoItem = itemOptionVeiculo.cloneNode(true)
                novoItem.classList.remove("modelo")

                // console.log(novoItem)


                novoItem.value = motorista.id_veiculo
                novoItem.innerHTML = `${motorista.id_veiculo} - ${motorista.placa} - ${motorista.tipo}`
                // novoItem.id = "o" + motorista.id_motorista


                document.querySelector("#select-placa-manutencao").appendChild(novoItem)
                // console.log(novoItem)
                if (motorista.disponivel) {
                    novoItem.disabled = false
                } else {
                    novoItem.disabled = true
                }
            })
        })
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

                novoItem.id = alocacao.id_alocacao


                idAlocacao = novoItem.querySelector("#id-alocacao")
                motorista = novoItem.querySelector("#motorista")
                idMotorista = novoItem.querySelector("#id-motorista")
                idVeiculo = novoItem.querySelector("#id-veiculo")
                veiculo = novoItem.querySelector("#veiculo")
                dataSaida = novoItem.querySelector("#data-saida")
                dataRetorno = novoItem.querySelector("#data-retorno")
                descricao = novoItem.querySelector("#descricao-alocacao")
                // console.log(novoItem)

                idAlocacao.innerHTML = alocacao.id_alocacao;
                motorista.innerHTML = alocacao.motorista.nome;
                idMotorista.innerHTML = alocacao.motorista.id_motorista;
                idVeiculo.innerHTML = alocacao.veiculo.id_veiculo;
                // console.log(motorista)
                veiculo.innerHTML = `${alocacao.veiculo.placa} - ${alocacao.veiculo.modelo} - ${alocacao.veiculo.tipo} - ${alocacao.veiculo.marca}`;

                dataSaida.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(alocacao.data_saida));
                if (alocacao.data_retorno == null) {
                    dataRetorno.innerHTML = "AGUARDANDO RETORNO"
                    dataRetorno.style.color = "#dea405"
                } else {
                    dataRetorno.innerHTML = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(alocacao.data_retorno));
                    novoItem.querySelector("#editar").remove()
                    novoItem.querySelector("#finalizar").remove()
                }
                descricao.value = alocacao.desc;

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
                // console.log(document.querySelector(".tbody-manutencoes"))
                let novoItem = itemManutencao.cloneNode(true)
                novoItem.classList.remove("modelo")

                idManutencao = novoItem.querySelector("#id-manutencao")
                idVeiculo = novoItem.querySelector("#id-veiculo")
                placa = novoItem.querySelector("#placa-veiculo")
                dataInicio = novoItem.querySelector("#data-inicio-manutencao")
                dataFim = novoItem.querySelector("#data-fim-manutencao")
                custoManutencao = novoItem.querySelector("#custo-manutencao")
                descricao = novoItem.querySelector("#descricao-manutencao")

                // console.log(novoItem)

                idManutencao.innerHTML = manutencao.id_manutencao
                idVeiculo.innerHTML = manutencao.veiculo.id_veiculo
                placa.innerHTML = manutencao.veiculo.placa
                dataInicio.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(manutencao.data_inicio))
                if (manutencao.data_fim == null) {
                    dataFim.innerHTML = ""
                } else {
                    dataFim.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(manutencao.data_fim))

                }
                custoManutencao.value = manutencao.custo
                descricao.value = manutencao.desc


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
                // console.log(document.querySelector(".tbody-motoristas"))
                let novoItem = itemMotorista.cloneNode(true)
                novoItem.classList.remove("modelo")

                idMotorista = novoItem.querySelector("#id-motorista")
                nomeMotorista = novoItem.querySelector("#nome-motorista")
                cpfMotorista = novoItem.querySelector("#cpf-motorista")
                cnhMotorista = novoItem.querySelector("#cnh-motorista")

                // console.log(novoItem)

                idMotorista.innerHTML = motorista.id_motorista;
                nomeMotorista.value = motorista.nome;
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
                // console.log(document.querySelector(".tbody-veiculos"))
                let novoItem = itemVeiculo.cloneNode(true)
                novoItem.classList.remove("modelo")

                idVeiculo = novoItem.querySelector("#id-veiculo")
                placaVeiculo = novoItem.querySelector("#placa-veiculo")
                modeloVeiculo = novoItem.querySelector("#modelo-veiculo")
                marcaVeiculo = novoItem.querySelector("#marca-veiculo")
                tipoVeiculo = novoItem.querySelector("#tipo-veiculo")
                disponivelVeiculo = novoItem.querySelector("#disponivel-veiculo")

                // console.log(novoItem)

                idVeiculo.innerHTML = veiculo.id_veiculo;
                placaVeiculo.innerHTML = veiculo.placa;
                modeloVeiculo.value = veiculo.modelo;
                marcaVeiculo.value = veiculo.marca;
                tipoVeiculo.value = veiculo.tipo;

                if (veiculo.disponivel == true) {
                    disponivelVeiculo.innerHTML = "DISPONÍVEL"
                } else {
                    disponivelVeiculo.innerHTML = "INDISPONÍVEL"
                }

                // console.log(novoItem)

                document.querySelector(".tbody-veiculos").appendChild(novoItem);
            })

        })
}



// FETCH POST
function cadastrarManutencoes() {
    const data = JSON.stringify({
        "id_veiculo": Number(document.querySelector("#select-placa-manutencao").value),
        "custo": Number(document.querySelector("#custo-manutencao-input").value),
        "desc": document.querySelector("#descricao-manutencao-input").value
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
            // console.log(data)
            if (data.id_manutencao != undefined) {
                alert("Cadastrado com sucesso!")
            } else {
                alert("Ocorreu um erro");
            }
        })

    const alteracao = {
        "id_veiculo": Number(document.querySelector("#select-placa-manutencao").value),
        "disponivel": false
    }


    fetch(`http://localhost:3000/veiculo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alteracao),
    })
        .then(response => response.json())
        .then(updatedUser => {
            alert('Manutenção cadastrada com sucesso!', updatedUser)
        }
        )
        .catch(error => console.error('Erro ao atualizar alocação.', error))
}


function cadastrarMotorista() {
    const data = JSON.stringify({
        nome: document.querySelector("#nome-motorista-input").value,
        cpf: document.querySelector("#cpf-motorista-input").value,
        cnh: document.querySelector("#cnh-motorista-input").value,
    });
    console.log(userData.token);
    //VOLTA AQUI
    fetch("http://localhost:3000/motorista", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json",
            "Authorization": userData.token
        },
        "body": data
    })
        .then(resp => { return resp.json() })
        .then(data => {
            // console.log(data)
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
            // console.log(data)
            if (data.id_veiculo != undefined) {
                alert("Cadastrado com sucesso!")
            } else {
                alert("Ocorreu algum erro");
            }
        })
}


function cadastrarAlocacao() {
    const data = JSON.stringify({
        "id_motorista": Number(document.querySelector("#select-motorista").value),
        "id_veiculo": Number(document.querySelector("#select-veiculo").value),
        "desc": document.querySelector("#desc-alocacao").value
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
            // console.log(data)
            if (data.id_alocacao != undefined) {
                alert("Cadastrado com sucesso!")
            } else {
                alert("Ocorreu algum erro");
            }
        })

    const alterarDisp = JSON.stringify({
        "id_motorista": Number(document.querySelector("#select-motorista").value),
        "disponivel": false
    })

    fetch("http://localhost:3000/motorista", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": alterarDisp
    })
        .then(resp => { return resp.json() })
        .then(data => {
            // console.log(data)
            if (data.id_motorista != undefined) {
                alert("Cadastrado com sucesso!")
                carregarAlocacoes()
            } else {
                alert("Ocorreu algum erro");
            }
        })
}

function finalizarAlocacao(e) {
    const dataAtual = new Date()
    const dataFormatada = dataAtual.toISOString()


    const data = {
        "id_motorista": Number(e.querySelector("#id-motorista").innerHTML),
        "id_veiculo": Number(e.querySelector("#id-veiculo").innerHTML),
        "id_alocacao": Number(e.id),
        "data_retorno": dataFormatada
    }

    fetch(`http://localhost:3000/alocacao`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(updatedUser => {
            window.location.reload()
            alert('Alocação atualizada com sucesso!', updatedUser)
        }
        )
        .catch(error => console.error('Erro ao atualizar alocação.', error))

}


// OPÇÕES
function editarAlocacao(e) {
    e.querySelector("#descricao-alocacao").disabled = false
    e.querySelector("#editar").classList.add("modelo")
    e.querySelector("#salvar").classList.remove("modelo")
    e.querySelector("#finalizar").classList.add("modelo")
}


function salvarAlocacao(e) {
    const data = {
        "id_alocacao": Number(e.querySelector("#id-alocacao").innerHTML),
        "desc": e.querySelector("#descricao-alocacao").value
    }

    console.log(data)
    // console.log(document.querySelector("#descricao-alocacao").value)
    e.querySelector("#descricao-alocacao").disabled = true

    fetch(`http://localhost:3000/alocacao/desc`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(updatedUser => {

            carregarAlocacoes()
            alert('Alocação atualizada com sucesso!', updatedUser)
        }
        )
        .catch(error => console.error('Erro ao atualizar alocação.', error))
}

buttonOrdemDesc.addEventListener('click', (e) => {
    e.preventDefault()
    alterarOrdem()
    buttonOrdemDesc.classList.add("modelo")
    buttonOrdemCresc.style.visibility = "visible"
})

buttonOrdemCresc.addEventListener('click', (e) => {
    e.preventDefault()
    carregarAlocacoes()
    buttonOrdemDesc.classList.remove("modelo")
    buttonOrdemCresc.style.visibility = "hidden"
})

function alterarOrdem() {
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
            data.sort((a, b) => b.id_alocacao - a.id_alocacao)
            document.querySelector(".tbody-alocacoes").innerHTML = ""
            data.forEach(alocacao => {

                let novoItem = itemAlocacao.cloneNode(true)
                novoItem.classList.remove("modelo")

                novoItem.id = alocacao.id_alocacao


                idAlocacao = novoItem.querySelector("#id-alocacao")
                motorista = novoItem.querySelector("#motorista")
                veiculo = novoItem.querySelector("#veiculo")
                dataSaida = novoItem.querySelector("#data-saida")
                dataRetorno = novoItem.querySelector("#data-retorno")
                descricao = novoItem.querySelector("#descricao-alocacao")
                // console.log(novoItem)

                idAlocacao.innerHTML = alocacao.id_alocacao;
                motorista.innerHTML = alocacao.motorista.nome;
                veiculo.innerHTML = `${alocacao.veiculo.placa} - ${alocacao.veiculo.modelo} - ${alocacao.veiculo.tipo} - ${alocacao.veiculo.marca}`;
                dataSaida.innerHTML = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(alocacao.data_saida));
                if (alocacao.data_retorno == null) {
                    dataRetorno.innerHTML = ""
                } else {
                    dataRetorno.innerHTML = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(alocacao.data_retorno));
                    novoItem.querySelector("#editar").remove()
                    novoItem.querySelector("#finalizar").remove()
                }
                descricao.value = alocacao.desc;

                document.querySelector(".tbody-alocacoes").appendChild(novoItem);
            })
        })
}

function editarManutencao(e) {
    e.querySelector("#descricao-manutencao").disabled = false
    e.querySelector("#custo-manutencao").disabled = false
    e.querySelector("#editar").classList.add("modelo")
    e.querySelector("#salvar").classList.remove("modelo")
    e.querySelector("#finalizar").classList.add("modelo")
}

function salvarManutencao(e) {
    const data = {
        "id_manutencao": Number(e.querySelector("#id-manutencao").innerHTML),
        "custo": e.querySelector("#custo-manutencao").value,
        "desc": e.querySelector("#descricao-manutencao").value
    }

    console.log(data)
    // console.log(document.querySelector("#descricao-alocacao").value)

    e.querySelector("#editar").classList.remove("modelo")
    e.querySelector("#salvar").classList.add("modelo")
    e.querySelector("#finalizar").classList.remove("modelo")

    e.querySelector("#descricao-manutencao").disabled = true
    e.querySelector("#custo-manutencao").disabled = true

    fetch(`http://localhost:3000/manutencao`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(updatedUser => {

            carregarManutencoes()
            alert('Manutenção atualizada com sucesso!', updatedUser)
        }
        )
        .catch(error => console.error('Erro ao atualizar manutenção.', error))
}


function finalizarManutencao(e) {
    const dataAtual = new Date()
    const dataFormatada = dataAtual.toISOString()


    const data = {
        "id_manutencao": Number(e.querySelector("#id-manutencao").innerHTML),
        "data_fim": dataFormatada,
        "finalizado": true
    }

    fetch(`http://localhost:3000/manutencao`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(updatedUser => {
            alert('Manutenção atualizada com sucesso!', updatedUser)
            carregarPainel()
        }
        )
        .catch(error => console.error('Erro ao atualizar manutenção.', error))


    const alteracao = {
        "id_veiculo": Number(e.querySelector("#id-veiculo").innerHTML),
        "disponivel": true
    }

    fetch(`http://localhost:3000/veiculo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alteracao),
    })
        .then(response => response.json())
        .then(updatedUser => {
            alert('Veículo disponível!', updatedUser)
            window.location.reload()

        }
        )
        .catch(error => console.error('Erro ao atualizar manutenção.', error))


}



function editarMotorista(e) {
    e.querySelector("#nome-motorista").disabled = false
    e.querySelector("#cpf-motorista").disabled = false
    e.querySelector("#cnh-motorista").disabled = false
    e.querySelector("#editar").classList.add("modelo")
    e.querySelector("#salvar").classList.remove("modelo")
}

function salvarMotorista(e) {
    const data = {
        "id_motorista": Number(e.querySelector("#id-motorista").innerHTML),
        "nome": e.querySelector("#nome-motorista").value,
        "cpf": e.querySelector("#cpf-motorista").value,
        "cnh": e.querySelector("#cnh-motorista").value
    }

    console.log(data)

    fetch(`http://localhost:3000/motorista`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(updatedUser => {

            carregarMotoristas()
            alert('Motorista atualizado com sucesso!', updatedUser)
        }
        )
        .catch(error => console.error('Erro ao atualizar motorista.', error))
}

function editarVeiculo(e) {
    e.querySelector("#modelo-veiculo").disabled = false
    e.querySelector("#marca-veiculo").disabled = false
    e.querySelector("#tipo-veiculo").disabled = false
    e.querySelector("#editar").classList.add("modelo")
    e.querySelector("#salvar").classList.remove("modelo")
}

function salvarVeiculo(e) {
    const data = {
        "id_veiculo": Number(e.querySelector("#id-veiculo").innerHTML),
        "modelo": e.querySelector("#modelo-veiculo").value,
        "marca": e.querySelector("#marca-veiculo").value,
        "tipo": e.querySelector("#tipo-veiculo").value
    }

    console.log(data)

    fetch(`http://localhost:3000/veiculo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(updatedUser => {

            carregarVeiculos()
            alert('Veiculo atualizado com sucesso!', updatedUser)
        }
        )
        .catch(error => console.error('Erro ao atualizar veiculo.', error))
}