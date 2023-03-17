import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function Alocacoes() {
    const [motoristas, setMotoristas] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [selectedMotorista, setSelectedMotorista] = useState('');
    const [selectedVeiculo, setSelectedVeiculo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [alocacoes, setAlocacoes] = useState([]);

    useEffect(() => {
        carregarMotoristas();
        carregarVeiculos();
    }, []);


    const enviarAlocacaoParaBancoDeDados = (alocacao) => {
        return fetch('http://10.87.207.25:3000/alocacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': userData.token
            },
            body: JSON.stringify(alocacao)
        });
    }

    const carregarMotoristas = async () => {
        try {
            const response = await fetch('http://10.87.207.25:3000/motorista');
            const data = await response.json();
            setMotoristas(data.filter((motorista) => motorista.disponivel));
        } catch (error) {
            console.error(error);
        }
    };

    const carregarVeiculos = async () => {
        try {
            const response = await fetch('http://10.87.207.25:3000/veiculo');
            const data = await response.json();
            setVeiculos(data.filter((veiculo) => veiculo.disponivel));
        } catch (error) {
            console.error(error);
        }
    };

    const cadastrarAlocacao = () => {
        if (!selectedMotorista || !selectedVeiculo || !descricao) {
            alert('Preencha todos os campos!');
            return;
        }

        const novaAlocacao = {
            id_motorista: selectedMotorista,
            id_veiculo: selectedVeiculo,
            desc: descricao,
        };

        enviarAlocacaoParaBancoDeDados(novaAlocacao)
            .then(response => {
                setAlocacoes([...alocacoes, novaAlocacao]);
                setSelectedMotorista('');
                setSelectedVeiculo('');
                setDescricao('');
            })
            .catch(error => {
                console.error(error);
            });

        { alert("ALOCAÇÃO CADASTRADA COM SUCESSO") }
    };


    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Motorista</Text>
                    <View style={styles.selectContainer}>
                        <TouchableOpacity style={styles.select}>
                            <Text>{selectedMotorista ? `ID ${selectedMotorista}` : 'Selecione um motorista:'}</Text>
                        </TouchableOpacity>
                        <View style={styles.optionsContainer}>
                            {motoristas.map((motorista) => (
                                <TouchableOpacity
                                    key={motorista.id_motorista}
                                    style={styles.option}
                                    onPress={() => setSelectedMotorista(motorista.id_motorista)}
                                >
                                    <Text>{motorista.id_motorista} - {motorista.nome}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Veículo</Text>
                    <View style={styles.selectContainer}>
                        <TouchableOpacity style={styles.select}>
                            <Text>{selectedVeiculo ? `ID ${selectedVeiculo}` : 'Selecione um veículo:'}</Text>
                        </TouchableOpacity>
                        <View style={styles.optionsContainer}>
                            {veiculos.map((veiculo) => (
                                <TouchableOpacity
                                    key={veiculo.id_veiculo}
                                    style={styles.option}
                                    onPress={() => setSelectedVeiculo(veiculo.id_veiculo)}
                                >
                                    <Text>Placa {veiculo.placa} - {veiculo.modelo}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Descrição:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a descrição da alocação"
                        value={descricao}
                        onChangeText={(text) => setDescricao(text)}
                    />
                </View>
                <TouchableOpacity onPress={cadastrarAlocacao} style={styles.button}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    form: {
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#288e00'
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionsContainer: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        maxHeight: 120,
        overflow: 'scroll',
    },
    option: {
        paddingHorizontal: 8,
        paddingVertical: 7,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    button: {
        backgroundColor: '#288e00',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginRight: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
});