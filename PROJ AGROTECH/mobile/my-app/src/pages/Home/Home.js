import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AgroTech</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Veiculos')}>
                <Text style={styles.textButton}>VER VEÍCULOS DISPONÍVEIS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Manutencoes')}>
                <Text style={styles.textButton}>VER MANUTENÇÕES</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#288e00',
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#288e00',
        margin: 25,
        height: 50,
        width: 250,
        borderRadius: 10
    },
    textButton: {
        fontFamily: 'Poppins, sans-serif',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});