import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import DiaryListScreen from './android/app/src/screens/DiaryListScreen';
import OneDiaryEntryScreen from './android/app/src/screens/OneDiaryEntryScreen';
import NewEntryScreen from './android/app/src/screens/NewEntryScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DiaryStack = () => (
  <Stack.Navigator
    initialRouteName="DiaryList"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007BFF',
        height:"0%"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="DiaryList"
      component={DiaryListScreen}
      options={{ title: 'Diary' }}
    />
    <Stack.Screen
      name="OneDiaryEntry"
      component={OneDiaryEntryScreen}
      options={{ title: 'Diary Entry' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <Drawer.Navigator initialRouteName="DiaryStack">
        <Drawer.Screen
          name="DiaryStack"
          component={DiaryStack}
          options={{ title: 'Diary List' }}
        />
        <Drawer.Screen
          name="NewEntry"
          component={NewEntryScreen}
          options={{ title: 'New Entry' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;