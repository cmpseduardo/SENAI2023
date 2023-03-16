import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

export default function Manutencoes() {
    const [manutencoes, setManutencoes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/manutencao')
            .then(response => response.json())
            .then(data => setManutencoes(data))
            .catch(error => console.error(error));
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manutenção</Text>
            {manutencoes.map(manutencoes => (
                <View style={styles.box} key={manutencoes.id_manutencao}>
                    <Text style={styles.textLabel}>ID: {manutencoes.id_manutencao}</Text>
                    <Text style={styles.textLabel}>Data Início: {moment(manutencoes.data_inicio).format('DD/MM/YYYY HH:mm')}</Text>
                    {manutencoes.data_fim ? (
                        <Text style={styles.textLabel}>Data Fim: {moment(manutencoes.data_fim).format('DD/MM/YYYY HH:mm')}</Text>
                    ) : (
                        <Text style={styles.textLabel}>Data Fim: <Text style={styles.textAlter}>AGUARDANDO FIM</Text></Text>
                    )}
                    <Text style={styles.textLabel}>Custo: {manutencoes.custo}</Text>
                    <Text style={styles.textLabel}>Descrição: {manutencoes.desc}</Text>
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
