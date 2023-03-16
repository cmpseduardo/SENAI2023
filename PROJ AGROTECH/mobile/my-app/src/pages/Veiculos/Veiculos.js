import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Veiculos() {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/veiculo')
            .then(response => response.json())
            .then(data => setVeiculos(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Veículos</Text>
            {veiculos.map(veiculo => (
                <View style={styles.box} key={veiculo.id_veiculo}>
                    <Text style={styles.text}>ID: {veiculo.id_veiculo}</Text>
                    <Text style={styles.text}>Placa: {veiculo.placa}</Text>
                    <Text style={styles.text}>Modelo: {veiculo.modelo}</Text>
                    <Text style={styles.text}>Marca: {veiculo.marca}</Text>
                    <Text style={styles.text}>Tipo: {veiculo.tipo}</Text>
                    <Text style={styles.text}>Disponível: {veiculo.disponivel ? 'Sim' : 'Não'}</Text>
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
    }
});
