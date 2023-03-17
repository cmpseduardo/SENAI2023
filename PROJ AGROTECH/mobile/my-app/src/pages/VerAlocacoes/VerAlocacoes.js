import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

export default function VerAlocacoes() {
    const [alocacoes, setAlocacoes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/alocacao')
            .then(response => response.json())
            .then(data => setAlocacoes(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alocações</Text>
            {alocacoes.map(alocacao => (
                <View style={styles.box} key={alocacao.id_alocacao}>
                    <Text style={styles.text}>Placa: {alocacao.veiculo.placa}</Text>
                    <Text style={styles.text}>Sobre: {alocacao.veiculo.modelo} - {alocacao.veiculo.tipo} - {alocacao.veiculo.marca}</Text>
                    <Text style={styles.text}>Motorista: {alocacao.motorista.nome}</Text>
                    <Text style={styles.text}>Data Saída: {moment(alocacao.data_retorno).format('DD/MM/YYYY HH:mm')}</Text>
                    {alocacao.data_retorno ? (
                        <Text style={styles.textLabel}>Data Retorno: {moment(alocacao.data_retorno).format('DD/MM/YYYY HH:mm')}</Text>
                    ) : (
                        <Text style={styles.textLabel}>Data Retorno: <Text style={styles.textAlter}>AGUARDANDO RETORNO</Text></Text>
                    )}
                    <Text style={styles.text}>Descrição: {alocacao.tipo}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    title: {
        color: '#288e00',
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 30,
        margin: 35
    },
    box: {
        backgroundColor: '#fff',
        height: 300,
        margin: 15,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.84,

        elevation: 2,
        gap: 10,
    },
    text: {
        color: '#288e00',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#288e00',
        padding: 7,
        borderRadius: 10,
    },
    textLabel: {
        color: '#288e00',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#288e00',
        padding: 7,
        borderRadius: 10,
    },
    textAlter: {
        color: '#dea405',
        fontWeight: 'bold',
    }
});
