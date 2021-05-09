import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import DeviceStore from 'react-native-simple-store';
import { v4 as uuidv4 } from 'uuid';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';


// Screens
import MainScreen from './src/screens/MainScreen';
import HistoryScreen from "./src/screens/HistoryScreen";
import NewResultScreen from "./src/screens/NewResultScreen";

// Check and/or create a UUID for this device
const deviceID = DeviceStore.get('FYP_DeviceID');
if (deviceID.length != 36){
    console.log("New Device ID")
    DeviceStore.save('FYP_DeviceID', uuidv4());
}

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NewResult"
                    component={NewResultScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const App = () => {
  return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <MyStack/>
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
