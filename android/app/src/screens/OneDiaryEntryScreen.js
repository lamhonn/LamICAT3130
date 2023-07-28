import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const OneDiaryEntryScreen = ({ navigation, route }) => {
  const { entry } = route.params;

  // Simple conditional, when there aren't any entries it shows a message
  if (!entry) {
    return (
      <View style={styles.container}>
        <Text>No diary entry found.</Text>
      </View>
    );
  }
  
  // There's no back button here, user can return by using phone's back button
  // or by double tapping the bottom of navbar
  // This is intentional as it became too complicated to implement in this case
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{entry.date}, {entry.location}</Text>
      <Text style={styles.subtitleText}>{entry.weather} </Text>
      <Text style={styles.contentText}>{entry.content}</Text>
      <Image source={{ uri: entry.photoUri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'left',
    justifyContent: 'top',
  },
  image: {
    width: "100%",
    height: "30%",
    borderRadius: 8,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 2,
    fontWeight: "bold",
    color: "black"
  },
  subtitleText: {
    fontSize: 18,
    color: "black",
    marginBottom: 8
  },
  contentText: {
    fontSize: 20,
    marginBottom: 16
  },
});

export default OneDiaryEntryScreen;
