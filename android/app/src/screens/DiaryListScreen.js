import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiaryEntryCard from '../components/DiaryEntryCard';

const DiaryListScreen = ({ navigation }) => {
  const [diaryEntries, setDiaryEntries] = useState([]);

  useFocusEffect(
    // When diary list is opened, fetch diary entries
    React.useCallback(() => {
      fetchDiaryEntries();
    }, [])
  );

  const fetchDiaryEntries = async () => {
    // Fetch all the entries saved in local storage
    try {
      const entriesJson = await AsyncStorage.getItem('diaryEntries');
      if (entriesJson) {
        const entries = JSON.parse(entriesJson);
        setDiaryEntries(entries);
      }
    } catch (error) {
      console.error('Error fetching diary entries:', error);
    }
  };

  const handleEntryPress = (entry) => {
    // Navigate to the detailed view of the selected diary entry
    navigation.navigate('OneDiaryEntry', { entry });
  };

  return (
    <View>
      <FlatList
        data={diaryEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DiaryEntryCard entry={item} onPress={() => handleEntryPress(item)} />
        )}
      />
    </View>
  );
};

export default DiaryListScreen;
