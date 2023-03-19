import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import WordsScreen from './screens/WordsScreen'
import { Header } from 'react-native/Libraries/NewAppScreen';
import { initializeApp } from "firebase/app";

const Stack = createNativeStackNavigator();

// FIREBASE PROVIDED CODE
const firebaseConfig = {
  apiKey: "AIzaSyB3Bylp6K5V_KNy0X9Hkz6nQ0fZ6X9nqBE",
  authDomain: "capstone-2874f.firebaseapp.com",
  projectId: "capstone-2874f",
  storageBucket: "capstone-2874f.appspot.com",
  messagingSenderId: "318331784812",
  appId: "1:318331784812:web:ea1bcc1503c32118c9d249",
  measurementId: "G-D2C6KX47G6"
};
const app = initializeApp(firebaseConfig);
//-----------------------

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