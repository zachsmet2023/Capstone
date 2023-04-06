import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import words from '../assets/words/Words.json';



const catOneWords = words.catONE;
const catTwoWords = words.catTWO;

const SenseCounter = React.memo(({ wordList, onCountChange, resetCount,onSpokenWord,storedSpoken }) => {

  //---------Varibles-------------
  const [count, setCount] = useState(0);
  let [currentSpoken,setCurrentSpoken] = useState(['Empty']);

  


  //---------LISTENERS-------------
  useEffect(() => {
    
    const words = wordList[0].split(' ');
    const newCount = countWordsInList(words);
    setCount((prevCount) => prevCount + newCount);
    onCountChange(prevCount => prevCount + newCount);
    
   
  }, [wordList, onCountChange, count, resetCount]);

  useEffect(() => {
    
    setCount(0);
      
    
  }, [resetCount]);

  //---------METHODS-------------
  const countWordsInList = useCallback((list) => {
    let count = 0;
    list.forEach((word) => {
      if (catOneWords.includes(word.toLowerCase()) && !storedSpoken.includes(word.toLowerCase()) && !currentSpoken.includes(word.toLowerCase())) {
        onSpokenWord(word.toLowerCase()); // adds to list to be sent to server
        setCurrentSpoken(prevSpokenWords => [...prevSpokenWords, word.toLowerCase()]); // adds to local list to check against
        count++;
      }
      if (catTwoWords.includes(word.toLowerCase()) && !storedSpoken.includes(word.toLowerCase())&& !currentSpoken.includes(word.toLowerCase())) {
        onSpokenWord(word.toLowerCase());
        setCurrentSpoken(prevSpokenWords => [...prevSpokenWords, word.toLowerCase()]);
        count += 2;
      }
    });

    
    return count;
  }, [onSpokenWord, storedSpoken, onCountChange]);
  




  
 //---------MARKUP-------------
  return (
    <View>
      <Text style={styles.counter}>{`Current Sense: ${count}`}</Text>
    </View>
  );
});
 //---------STYLES-------------
const styles = StyleSheet.create({
  counter: {
    color: '#fff',
    fontSize: 20,
  },
});

export default SenseCounter;
