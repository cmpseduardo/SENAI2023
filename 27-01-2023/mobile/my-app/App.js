import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login/Login'
import Home from './screens/Home/Home';
import AdicionarTarefa from './screens/AdicionarTarefa/AdicionarTarefa';
import ListarAbertos from './screens/ListarAbertos/ListarAbertos';
import ListarFinalizados from './screens/ListarFinalizados/ListarFinalizados';
import ListarCancelados from './screens/ListarCancelados/ListarCancelados';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AdicionarTarefa" component={AdicionarTarefa} />
        <Stack.Screen name="ListarAbertos" component={ListarAbertos} />
        <Stack.Screen name="ListarFinalizados" component={ListarFinalizados} />
        <Stack.Screen name="ListarCancelados" component={ListarCancelados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}