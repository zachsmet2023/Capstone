import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import SenseCounter from '../components/senseCounter';



const HomeScreen = ({navigation}) => {


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
      <Text style={styles.header}>SpeakSence</Text>
    </SafeAreaView>

    
    {!started ? 
    <View style={styles.startBtnContainer}>
      <Button title='Start' color={'#fff'} onPress={startSpeechToText} /> 
    </View>
    : undefined}

    {started ? 
      <View style={styles.stopBtnContainer}>
        <Button title='Stop' color={'#fff'} onPress={stopSpeechToText} /> 
      </View>
    : undefined}


      {results.map((result, index) => <Text style={styles.spokenWords} key={index}>{result}</Text>)} 

      <View>
       <SenseCounter  wordList={results} />
      </View>

      <View>
        <Button title='WORDS' color={'#fff'}/>
      </View>

        

      <StatusBar style="auto" />
    </View>
  );
}

// ------------ STYLES ---------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061024',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    

  },
  header: {
    color: '#fff',

  },
  startBtnContainer: {
    backgroundColor: '#55C89F',
    width: 80,
    height: 80,
    borderRadius: 80/2,
    alignItems: 'center',
    justifyContent: 'center',

  },
  stopBtnContainer: {
    backgroundColor: '#FF0000',
    width: 80,
    height: 80,
    borderRadius: 80/2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  spokenWords: {
    color: '#fff',
    


  },

 
});

export default HomeScreen;