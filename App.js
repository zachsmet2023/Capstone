import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default function App() {

  // ------------- MARKUP -------------------
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ------------ STYLES ---------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
 
});