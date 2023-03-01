import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import SenseCounter from './components/senseCounter';



export default function App() {


  //---------Varibles-------------
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState(['Empty']);
  

  //----------Listeners------------ 
  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
  

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);


//-----------METHODS----------------

// Func will start speech to text listening for US english and then set started to true 
  const startSpeechToText = async () => {
    await Voice.start("en-US");
    setStarted(true);
  };

  // Func will stop speech to text set started to false 
  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  // Will set the results of the speech to text to results varible array
  const onSpeechResults = (result) => {
    setResults(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };


  


  // ------------- MARKUP -------------------
  return (
    <View style={styles.container}>

    <SafeAreaView style={styles.headerContainer}> 
      <Text>SpeakSence</Text>
    </SafeAreaView>

    
    
      {!started ? <Button title='Start' onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Stop' onPress={stopSpeechToText} /> : undefined}
      {results.map((result, index) => <Text key={index}>{result}</Text>)} 

      <View>
       <SenseCounter wordList={results} />
      </View>



      <StatusBar style="auto" />
    </View>
  );
}

// ------------ STYLES ---------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {


  }
});