import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth();

export default function SignUpScreen({ navigation, route }) {
  
    //VARIBLES
let [ Email, setEmail] = useState("");
let [ password, setPassword] = useState("");
let [ conPassword, setConPassword] = useState("");
let [ errorMessage, setErrorMessage] = useState("");

    //METHODS

let confirmAndSet = (value, conVal, setValue) => {
    if(value != conVal)
        setErrorMessage("Passwords Don't Match");
    
    else
        setErrorMessage("");
    setValue(value);
    
}

let signUp = () => {
    if (password ===conPassword){
        createUserWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
          })
          .catch((error) => {
            
            setErrorMessage(error.message);
          });
        
    }
}




    // MARKUP
  return (
    <View style={styles.container}>

        <View style={styles.menu}>
            <Text style={styles.menuheader}>Sign Up</Text>
            <Text style={styles.errormessage}>{errorMessage}</Text>
            <TextInput style={styles.textinput} placeholder='Email' 
            placeholderTextColor='#BEBEBE'
             
            value={Email} 
            onChangeText={setEmail}/>

            <TextInput style={styles.textinput} placeholder='Password'
             placeholderTextColor='#BEBEBE' 
             secureTextEntry={true} 
             value={password} 
             onChangeText={(value)=>confirmAndSet(value,conPassword,setPassword )}/>

            <TextInput style={styles.textinput} placeholder='Confirm Password'
             placeholderTextColor='#BEBEBE' 
             secureTextEntry={true} 
             value={conPassword} 
             onChangeText={(value)=>confirmAndSet(value,password,setConPassword )}/>

            <Button title='Continue' color='#fff' onPress={signUp}/>
        </View>
        <Button title='Login Here' onPress={() => navigation.pop()}/>
    </View>
  );
}


//STYLES
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#061024',
        alignItems: 'center',
        justifyContent: 'center',
      },
    menu: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundcolor: '#fff',
        padding: 40,
        

        },
    menuheader: {
        color: '#fff',
        fontSize: 40,

  },
  textinput: {
        color: '#BEBEBE',
        alignSelf: 'stretch',
        padding: 10,
        borderBottomColor: '#55C89F',
        borderBottomWidth: 1
  },

  errormessage: {
    color: 'red',
    fontSize: 20
  },
});