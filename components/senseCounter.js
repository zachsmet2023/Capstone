import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import words from '../assets/words/Words.json';



const catOneWords = words.catONE;
const catTwoWords = words.catTWO;

const SenseCounter = React.memo(({ wordList, onCountChange, resetCount }) => {

  //---------Varibles-------------
  const [count, setCount] = useState(0);


  //---------LISTENERS-------------
  useEffect(() => {
    const words = wordList[0].split(' ');
    const newCount = countWordsInList(words);
    setCount((prevCount) => prevCount + newCount);
    onCountChange(count);
    if (resetCount === false) {
      setCount(0);
    }
  }, [wordList, countWordsInList, onCountChange, count, resetCount]);

  //---------METHODS-------------
  const countWordsInList = useCallback((list) => {
    let count = 0;
    list.forEach((word) => {
      if (catOneWords.includes(word.toLowerCase())) {
        removeFoundWord(word, catOneWords);
        count++;
      }
      if (catTwoWords.includes(word.toLowerCase())) {
        removeFoundWord(word, catTwoWords);
        count += 2;
      }
    });
    return count;
  }, []);

  const removeFoundWord = useCallback((word, category) => {
    const index = category.indexOf(word.toLowerCase());
    category.splice(index, 1);
  }, []);

  
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
