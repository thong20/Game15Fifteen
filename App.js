import React from 'react';
import { StyleSheet, View } from 'react-native';
import Puzzle from './components/puzzle'

import Constants from 'expo-constants';


export default function App() {
  console.log('Expo.manifest:', Constants.manifest.version)
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
    alignItems: 'center',
      
  },
});
