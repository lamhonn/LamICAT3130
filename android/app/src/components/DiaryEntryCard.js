import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const DiaryEntryCard = ({ entry, onPress}) => {
  // Component for the single entry in entry list
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: entry.photoUri }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.dateText}>{entry.date}</Text>
        <Text style={styles.locationText}>{entry.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DiaryEntryCard;
