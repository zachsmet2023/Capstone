import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import WordsScreen from './screens/WordsScreen'
import { Header } from 'react-native/Libraries/NewAppScreen';


const Stack = createNativeStackNavigator();



export default function App() {

  // ------------- MARKUP -------------------
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
        
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Words" component={WordsScreen} options={{headerShown:false}}/>
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