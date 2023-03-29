import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import words from '../assets/words/Words.json';
import { auth, db } from '../firebase';
import { collection,doc, getDoc, setDoc } from 'firebase/firestore';




const catOneWords = words.catONE;
const catTwoWords = words.catTWO;

const WordScreen = ({navigation}) => {
  const [words, setWords] = useState([]);
  const spokenWords = ['apple', 'mango', 'pineapple'];
  let [storedSpokenWords, setStoredSpokenWords] = useState([]);
 
  useEffect(() => {
    fetchSpokenWords();

  }, []);

  const fetchSpokenWords = async () => {
    try {
      const wordsRef = doc(collection(db, "spokenWords"), auth.currentUser.uid);
      const docSnapshot = await getDoc(wordsRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const fetchedWords = data.words || [];
        setStoredSpokenWords(fetchedWords);
        console.log("Spoken words fetched.");
      } else {
        console.log("No spoken words data found.");
      }
    } catch (e) {
      console.error("Error fetching spoken words: ", e);
    }
  };



  return (
    <View style={styles.container}>
    <View style={styles.catContainer}>
      <Text>CatOne</Text>
    {catOneWords.map((word, index) => (
      <View key={index} style={styles.word}>
        <Text
          style={[
            styles.title,
            storedSpokenWords.includes(word) && styles.strikethrough
          ]}
        >
          {word}
        </Text>
      </View>
    ))}
</View>

<View  style={styles.catContainer}>
    <Text>CatTwo</Text>
        {catTwoWords.map((word, index) => (
          <View key={index} style={styles.word}>
            <Text
              style={[
                styles.title,
                storedSpokenWords.includes(word) && styles.strikethrough
              ]}
            >
              {word}
            </Text>
          </View>
        ))}
</View>

    <Button title='Home' onPress={() => navigation.pop()}/>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  catContainer:{
    
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginRight: 10
  },
  word: {
   
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
  },
});

export default WordScreen;
