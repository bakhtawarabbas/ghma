import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const WeatherConditionsScreen = () => {
  // Dummy data for demonstration purposes
  const [weatherData, setWeatherData] = useState({
    temperature: 25, // in Celsius
    humidity: 60, // in percentage
    windSpeed: 10, // in km/h
    precipitation: 'No', // 'Yes' or 'No'
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newWeather, setNewWeather] = useState({ temperature: '', humidity: '', windSpeed: '', precipitation: '' });

  const handleUpdateWeather = () => {
    // Update the weather data
    setWeatherData({
      temperature: parseFloat(newWeather.temperature),
      humidity: parseFloat(newWeather.humidity),
      windSpeed: parseFloat(newWeather.windSpeed),
      precipitation: newWeather.precipitation,
    });

    // Reset the state and close the modal
    setNewWeather({ temperature: '', humidity: '', windSpeed: '', precipitation: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Weather Updates</Text>

      <View style={styles.weatherInfo}>
        <View style={styles.weatherItem}>
          <FontAwesome name="thermometer-half" size={30} color="#3E7D9D" />
          <Text style={styles.weatherText}>{`Temperature: ${weatherData.temperature}°C`}</Text>
        </View>

        <View style={styles.weatherItem}>
          <FontAwesome name="tint" size={30} color="#3E7D9D" />
          <Text style={styles.weatherText}>{`Humidity: ${weatherData.humidity}%`}</Text>
        </View>

        <View style={styles.weatherItem}>
          <FontAwesome name="wind" size={30} color="#3E7D9D" />
          <Text style={styles.weatherText}>{`Wind Speed: ${weatherData.windSpeed} km/h`}</Text>
        </View>

        <View style={styles.weatherItem}>
          <FontAwesome name="tint" size={30} color="#3E7D9D" />
          <Text style={styles.weatherText}>{`Precipitation: ${weatherData.precipitation}`}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.updateButtonText}>Update Weather</Text>
      </TouchableOpacity>

      {/* Modal for updating weather conditions */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Weather Conditions</Text>
            <TextInput
              style={styles.input}
              placeholder="Temperature (°C)"
              value={newWeather.temperature}
              onChangeText={(text) => setNewWeather({ ...newWeather, temperature: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Humidity (%)"
              value={newWeather.humidity}
              onChangeText={(text) => setNewWeather({ ...newWeather, humidity: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Wind Speed (km/h)"
              value={newWeather.windSpeed}
              onChangeText={(text) => setNewWeather({ ...newWeather, windSpeed: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Precipitation (Yes/No)"
              value={newWeather.precipitation}
              onChangeText={(text) => setNewWeather({ ...newWeather, precipitation: text })}
            />
            <Button title="Update Weather" onPress={handleUpdateWeather} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weatherInfo: {
    marginBottom: 20,
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#3E7D9D',
  },
  updateButton: {
    backgroundColor: '#3E7D9D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default WeatherConditionsScreen;
