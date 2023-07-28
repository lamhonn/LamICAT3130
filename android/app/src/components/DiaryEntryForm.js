import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  PermissionsAndroid 
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';

const API_KEY = ''; // Replace with your API key

const DiaryEntryForm = ({ onSave }) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    // Get the current date and time
    const currentDate = new Date();
    setDate(currentDate.toISOString().slice(0, 10));

    const fetchWeatherData = async (latitude, longitude) => {
      // Function for fetching data from OpenWeatherAPI
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        );

        // Get weather data as one word i.e. "rainy" or "cloudy"
        const weatherDescription = response.data.weather[0].description;
        
        // Get the location name from the same API
        const city = response.data.name;

        // Set the data to states
        setWeather(weatherDescription);
        setLocation(city);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const getLocation = async () => {
      // Function for getting location data from the device
      try {
        // Ask for permission from device user
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        // If permission is granted, get location coordinates and fetch weather data using them
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission is granted, get the current location and fetch weather data
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchWeatherData(latitude, longitude);
            },
            (error) => {
              console.error('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };
    getLocation();
  }, []);

  const handleSelectImage = async () => {
    // Function for getting images
    try {
      // Ask for permission for image media
      const storagePermissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );        
      // If permission is granted, opens a prompt for file selection using ImagePicker
      if (storagePermissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
      const response = await ImageCropPicker.openPicker({
          cropping: false,
        });

        if (!response.didCancel && !response.error) {
          setPhotoUri(response.path);
        }
      } else {
        console.log('Image picker permission denied');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleSave = () => {
    // Validate the form fields before saving
    if (!photoUri || !location || !date || !content) {
      alert('Please fill in all fields.');
      return;
    }

    // Create a new diary entry object
    const newEntry = {
      id: Date.now(), // You can use any unique identifier here
      photoUri,
      location,
      date,
      weather,
      content,
    };

    // Save the new entry using the onSave function
    onSave(newEntry);

    // Clear the form fields after saving
    setPhotoUri(null);
    setContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{date}, {location}</Text>
      <Text style={styles.weatherText}>{weather}</Text>
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.imagePreview} />
      ) : (
        <TouchableOpacity style={styles.imagePlaceholder} onPress={handleSelectImage}>
          <Text style={styles.imagePlaceholderText}>Select Photo</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 18,
    color: 'black'
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DiaryEntryForm;
