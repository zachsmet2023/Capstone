import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import words from '../assets/words/Words.json';

const catOneWords = words.catONE;
const catTwoWords = words.catTWO;


const SenseCounter = ({ wordList }) => {

//--------VARIBLE-------------
  const [count, setCount] = useState(0);

//------LISTENER--------------
  useEffect(() => {
    const words = wordList[0].split(' ');
    const newCount = countWordsInList(words);
    setCount(count+newCount);
  }, [wordList]);


  //------METHOD-----------

  /*
    @Param: list of spoken words 
    @Return: # of spoken words in constantList
      if word in spoken list is in constant it will remove 
      the word from constantList so it will not count that word again
      and also check it off for the day
  */
  const countWordsInList = (list) => {
    
    let count = 0;
    list.forEach((word) => {

      if (catOneWords.includes(word.toLowerCase())) {
        removeFoundWord(word, catOneWords);
        count++;
      }
      if (catTwoWords.includes(word.toLowerCase())) {
        removeFoundWord(word, catTwoWords);
        count+=2;
      }

    });
    return count;
  };

  /*
    @Param: word spoken 
    @Return: catagory of word
      removes spoken word from WORDS
  */
  const removeFoundWord = (word,catagory) =>{
    let index = catagory.indexOf(word.toLowerCase());
    catagory.splice(index,1);
  }

//-------MARKUP-----------------
  return (
    <View>
      <Text style={styles.counter}>{`Count: ${count}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    color: '#fff'
  },
});

export default SenseCounter;