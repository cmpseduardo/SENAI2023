import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function Home({ navigation }) {
  return (
    
        <View style={styles.container}>
        <Text style={{fontSize: 30, marginBottom: 50, color: "thistle", fontWeight: "bold"}}>Lista de Tarefas</Text>
        <TouchableOpacity style={styles.listar} onPress={()=> {navigation.navigate("AdicionarTarefa")}}>
          <Text style={{color: "thistle"}}>Adicionar Tarefa</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.listar} onPress={()=> {navigation.navigate("ListarAbertos")}}>
          <Text style={{color: "thistle"}}>Listar tarefas abertas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listar} onPress={()=> {navigation.navigate("ListarFinalizados")}}>
          <Text style={{color: "thistle"}}>Listar tarefas finalizadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listar} onPress={()=> {navigation.navigate("ListarCancelados")}}>
          <Text style={{color: "thistle"}}>Listar tarefas canceladas</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listar: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
    backgroundColor: "white",
    gap: 10,
    width: '60%'
  }
});
