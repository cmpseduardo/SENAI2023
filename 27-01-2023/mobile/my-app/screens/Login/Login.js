import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("andre@gmail.com");
    const [senha, setSenha] = useState("1234");

    const autenticar = () => {
        fetch("http://10.87.207.25:3000/login", {
            "method":"POST",
            "headers":{
                "Content-Type": "application/json"
            },
            "body":JSON.stringify({
                "email":email,
                "senha":senha
            })
        })
        .then(response => {return response.json(); })
        .then(data => {
            if(data.length != 0) {
                navigation.navigate("Home")
            }else {
                console.log("LOGIN INVALIDO")
            }
        })

    }

    return(
        <View style={styles.container}>
            <Text style={{color: "thistle", fontSize: 50}}>LOGIN</Text>
            <TextInput style={{backgroundColor: "white", borderWidth: 1, borderColor: "thistle", height: 30, width: 200, padding: 5}} value={email} onChangeText={(val) => { setEmail(val); }} />
            <TextInput style={{backgroundColor: "white", borderWidth: 1, borderColor: "thistle", height: 30, width: 200, padding: 5}} value={senha} onChangeText={(val) => { setSenha(val); }} />
            <TouchableOpacity style={{backgroundColor: "thistle", height: 50, width: 150, alignItems: "center", justifyContent: "center"}} onPress={() => { autenticar(); }}>
                <Text style={{color: "white", fontSize: 20}}>Entrar</Text>
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
    }
  });
  