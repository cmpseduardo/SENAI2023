import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AdicionarTarefa({ navigation }) {
    const [descricao, setDescricao] = useState("");

    const adicionar = () => {
        fetch("http://10.87.207.25:3000/create", {
            "method":"POST",
            "headers":{
                "Content-Type": "application/json"
            },
            "body":JSON.stringify({
                "descricao":descricao,
            })
        })
        .then(response => {return response.json(); })
        .then(data => {
            if(data.length > 0) {
                console.log("")
            }else {
                navigation.navigate("Home")
            }
        })

    }

    return(
        <View style={styles.container}>
            <Text style={{color: "thistle", fontSize: 40}}>Adicionar Tarefa</Text>
            <TextInput style={styles.input} value={descricao} onChangeText={(val) => { setDescricao(val); }} />
            <TouchableOpacity style={styles.adicionar} onPress={() => { adicionar(); }}>
                <Text style={{color: "white", fontSize: 20}}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    },
    input: {
        backgroundColor: "white", 
        borderWidth: 1, 
        height: 30, 
        width: 200,
        borderColor: "thistle"
    },
    adicionar: {
        backgroundColor: "thistle",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 100,
    }
})