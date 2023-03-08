import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen'


export default function App() {


  // ------------- MARKUP -------------------
  return (
    <View style={styles.container}>

    <HomeScreen/>
 
    </View>
  );
}

// ------------ STYLES ---------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
 
});