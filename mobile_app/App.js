import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';


// Screens
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainScreen/>
      </ApplicationProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
