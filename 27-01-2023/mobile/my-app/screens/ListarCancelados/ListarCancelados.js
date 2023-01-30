import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListarCanceladas({ navigation }) {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        listarTarefas();
    }, [])

    const listarTarefas = () => {
        fetch("http://localhost:3000/readCanceladas")
        .then(response => {return response.json();})
        .then(data => {
            setTarefas(data);
        })
    }

    return(
        <View>
            {
                tarefas.map((tarefa, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text>Descrição: {tarefa.descricao}</Text>
                            <Text>Horário Início: {tarefa.horario_inicio}</Text>
                            <Text>Horário Finalizada: {tarefa.horario_encerramento}</Text>
                            <Text>Status: <Text style={{color: "red", fontWeight: "bold"}}>{tarefa.status_tarefa}</Text></Text>
                            </View>
                       
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 10,
        backgroundColor: "white",
        gap: 10
    }
  });
  