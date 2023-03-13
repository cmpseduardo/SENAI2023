import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AgroTech</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>VER VEÍCULOS DISPONÍVEIS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>VER MANUTENÇÕES</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
    fontSize: '50px',
    marginBottom: '30px',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#288e00',
    margin: '25px',
    height: '50px',
    width: '250px'
  },
  textButton: {
    fontFamily: 'Poppins, sans-serif',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 'bold',
  }
});
