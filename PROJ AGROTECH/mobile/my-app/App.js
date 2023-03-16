import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home/Home'
import Manutencoes from './src/pages/Manutencoes/Manutencoes'
import Veiculos from './src/pages/Veiculos/Veiculos'
import Alocacoes from './src/pages/Alocacoes/Alocacoes'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Manutencoes" component={Manutencoes} />
      <Stack.Screen name="Veiculos" component={Veiculos} />
      <Stack.Screen name="Alocacoes" component={Alocacoes} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}