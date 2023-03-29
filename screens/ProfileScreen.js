import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { collection,doc, getDoc} from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { auth,db } from '../firebase';



const ProfileScreen = ({navigation}) => {
   const [data, setData] = useState(null);
   const [total, setTotal] = useState();




   useEffect(() => {
    fetchTotal();
  });




    const fetchTotal = async () => {
      try{
        const senseRef = doc(collection(db, "sense"), auth.currentUser.uid);
        const docSnapshot = await getDoc(senseRef);
        if (docSnapshot.exists()) {
            const fetchedTotal = docSnapshot.data()['totalSense']||0;

            setTotal(fetchedTotal);
        }
        else{
            setTotal(0);
        }
      }catch(e){
        console.error("Error fetching data: ", e);
      }
    }


   const fetchData = async (period) => {
     try {
       const senseRef = doc(collection(db, "sense"), auth.currentUser.uid);
       const docSnapshot = await getDoc(senseRef);
       const currentDate = new Date();
       const currentWeek = getWeekNumber(currentDate);
       const currentMonth = currentDate.getMonth() + 1;
       const currentYear = currentDate.getFullYear();

        if (docSnapshot.exists()) {
         let periodKey;
         if (period === 'Week') {
           periodKey = currentWeek;
         } else if (period === 'Month') {
           periodKey = currentMonth;
         } else {
           periodKey = currentYear;
         }
         const fetchedData = docSnapshot.data()[`sensePer${period}`][periodKey] || 0;
         const minMaxData = docSnapshot.data()[`minMaxSensePer${period}`][periodKey] || { min: 0, max: 0 };
         setData({ sense: fetchedData, minMax: minMaxData });
         
       } else {
         setData(null);
       }
     } catch (e) {
       console.error("Error fetching data: ", e);
     }
   };


   const getWeekNumber = (date) => {
       const onejan = new Date(date.getFullYear(), 0, 1);
       return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
     };

     let logOut = () =>{
      signOut(auth).then(() => {
        navigation.popToTop();
      }).catch((error) => {
        // An error happened.
      });
    }
    
    return (
     <View style={styles.container}>

        <Button title='Logout' onPress={logOut}/>

        <Text style={styles.dataText}>Total Sense: {total}</Text>

        <View style={styles.dataContainer}>
            {data && (
              <View style={styles.dataContainer}>
                <Text style={styles.dataText} >Sense: {data.sense}</Text>
                <Text style={styles.dataText}>Min: {data.minMax.min}</Text>
                <Text style={styles.dataText}>Max: {data.minMax.max}</Text>
              </View>
            )}
        </View>


        <View style={styles.buttonContainer}>
            <Button title="Week" onPress={() => fetchData('Week')} />
            <Button title="Month" onPress={() => fetchData('Month')} />
            <Button title="Year" onPress={() => fetchData('Year')} />
       </View>

        <Button title='HOME' onPress={() => navigation.pop()}/>
     </View>
   );
 };
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#061024',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      backgroundColor: '#007AFF',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      margin: 5,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
    dataContainer: {
      marginTop: 20,
    },
    dataText: {
      fontSize: 18,
      marginBottom: 5,
      color: '#fff'
    },
  });
 


export default ProfileScreen;



