import React from 'react';
import { View } from 'react-native';
import DiaryEntryForm from '../components/DiaryEntryForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewEntryScreen = ({ navigation }) => {

  const saveDiaryEntry = async (entry) => {
    try {
      // Fetch all the entries in local storage first
      const currentEntries = await AsyncStorage.getItem('diaryEntries');
      
      // Simple validation with conditional to ensure that the app doesn't crash if fetch fails or nothing exists
      // Consist also of parsing the fetched data
      const updatedEntries = currentEntries ? JSON.parse(currentEntries) : [];

      // Add a new entry to the array
      updatedEntries.push(entry);

      // Update the storage with the new entry
      await AsyncStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
      
      // For the sake of simplicity, return back to all diary entries
      navigation.navigate('DiaryList');
    } catch (error) {

      // Simple error handling
      console.error('Error saving diary entry:', error);
    }
  };

  return (
    <View>
      <DiaryEntryForm onSave={saveDiaryEntry} />
    </View>
  );
};

export default NewEntryScreen;
