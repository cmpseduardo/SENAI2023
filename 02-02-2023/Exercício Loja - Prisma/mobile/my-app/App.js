import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Ver Vendas</Text>
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
    gap: '30px',
  },
  text: {
    fontSize: '25px',
    color: 'white',
    padding: '10px'
  },
  button: {
    backgroundColor: 'royalblue',
    height: '50px',
    width: '200px'
  }
});
