import React from 'react';
import { StyleSheet, View } from 'react-native';
import Puzzle from './components/puzzle'

export default function App() {
  return (
    <View style={styles.container}>
      <Puzzle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      
  },
});
