import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import SenseCounter from '../components/senseCounter';
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase';
import { collection,doc, getDoc, setDoc } from 'firebase/firestore';



const HomeScreen = ({navigation}) => {


  //---------Varibles-------------
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState(['Empty']);
  let [count, setCount] = useState(0);
  

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
    sendSenseToServer();
    
  };

  // Will set the results of the speech to text to results varible array
  const onSpeechResults = (result) => {
    setResults(result.value);

  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  let logOut = () =>{
    signOut(auth).then(() => {
      navigation.popToTop();
    }).catch((error) => {
      // An error happened.
    });
  }

  let sendSenseToServer = async () => {
    try {
      const senseRef = doc(collection(db, "sense"), auth.currentUser.uid);
      const docSnapshot = await getDoc(senseRef);
      const currentDate = new Date();
      const currentWeek = getWeekNumber(currentDate);
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
  
      let currentSense = 0;
      let sensePerWeek = {};
      let sensePerMonth = {};
      let sensePerYear = {};
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        currentSense = data.totalSense || 0;
        sensePerWeek = data.sensePerWeek || {};
        sensePerMonth = data.sensePerMonth || {};
        sensePerYear = data.sensePerYear || {};
      }
  
      const newSense = count;
      const totalSense = currentSense + newSense;
      sensePerWeek[currentWeek] = (sensePerWeek[currentWeek] || 0) + newSense;
      sensePerMonth[currentMonth] = (sensePerMonth[currentMonth] || 0) + newSense;
      sensePerYear[currentYear] = (sensePerYear[currentYear] || 0) + newSense;
  
      await setDoc(senseRef, { totalSense, sensePerWeek, sensePerMonth, sensePerYear }, { merge: true });
      console.log("Sense value updated.");
    } catch (e) {
      console.error("Error updating sense value: ", e);
    }
  };
  
  //Found Online 
  const getWeekNumber = (date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
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


      <View>
       <SenseCounter  wordList={results} onCountChange={handleCountChange} resetCount={started}/>
      
      </View>

      <View>
        <Button title='Words Page' onPress={() => navigation.push("Words")}/>
        <Button title='Logout' onPress={logOut}/>
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
    fontSize: 30

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


  counter: {
    color: '#fff',
    fontSize: 20,
  },

 
});

export default HomeScreen;