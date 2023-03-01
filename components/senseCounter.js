import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const constantList = ['apple', 'banana'];

const SenseCounter = ({ wordList }) => {

//--------VARIBLE-------------
  const [count, setCount] = useState(0);

//------LISTENER--------------
  useEffect(() => {
    const words = wordList[0].split(' ');
    const newCount = countWordsInList(words);
    setCount(newCount);
  }, [wordList]);


  //------METHOD-----------
  const countWordsInList = (list) => {
    console.log(list);
    let count = 0;
    list.forEach((word) => {
      if (constantList.includes(word.toLowerCase())) {
        count++;
      }
    });
    console.log('count:', count);
    return count;
  };

//-------MARKUP-----------------
  return (
    <View>
      <Text>{`Count: ${count}`}</Text>
    </View>
  );
};

export default SenseCounter;