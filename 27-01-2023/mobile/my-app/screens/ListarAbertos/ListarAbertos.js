import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default function ListarAbertos({ navigation }) {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        listarTarefas();
    }, [])

    const listarTarefas = () => {
        fetch("http://10.87.207.25:3000/readAbertas")
        .then(response => {return response.json();})
        .then(data => {
            setTarefas(data);
        })
    }

    const finalizarTarefa = (id) => {
        fetch("http://10.87.207.25:3000/updateFinalizado/" + id, {
            "method":"PUT"
        })
        .then(response => {
            if(response.status === 200) {
                console.log("TAREFA FINALIZADO");
                listarTarefas();
            }else {
                console.log(response.status);
            }
        })
    }

    const cancelarTarefa = (id) => {
        fetch("http://10.87.207.25:3000/updateCancelado/" + id, {
            "method":"PUT"
        })
        .then(response => {
            if(response.status === 200) {
                console.log("TAREFA FINALIZADO");
                listarTarefas();
            }else {
                console.log(response.status);
            }
        })
    }

    return(
        <View>
            {
                tarefas.map((tarefa, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text>Descrição:</Text> {tarefa.descricao}
                            <Text>Horário Início: {tarefa.horario_inicio}</Text>
                            <Text>Status: {tarefa.status_tarefa}</Text>
                                <TouchableOpacity onPress={() => {
                                    finalizarTarefa(tarefa.id_tarefa);
                                }}>
                                    <Text style={styles.finalizarTarefa}>Finalizar Tarefa</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    cancelarTarefa(tarefa.id_tarefa);
                                }}>
                                    <Text style={styles.cancelarTarefa}>Cancelar Tarefa</Text>
                                </TouchableOpacity>
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
    },
    finalizarTarefa: {
        backgroundColor: "green",
        color: "white",
        width: "50%",
        fontSize: "20px",
    },
    cancelarTarefa: {
        backgroundColor: "red",
        color: "white",
        width: "50%",
        fontSize: "20px"
    }
  });
  