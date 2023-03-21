import { StyleSheet, Text, View, Button } from 'react-native';


export default function WordsScreen({ navigation, route }) {
  
  return (
    <View style={styles.container}>
   <Text>Words</Text>

   <Button title='TO HOME' onPress={() => navigation.pop()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});