import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TemperatureAndEnvironmentScreen = () => {
  // Dummy data for demonstration purposes
  const [ambientConditions, setAmbientConditions] = useState({
    temperature: 25, // in Celsius
    humidity: 60, // in percentage
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newConditions, setNewConditions] = useState({ temperature: '', humidity: '' });

  const handleUpdateConditions = () => {
    // Update the ambient conditions
    setAmbientConditions({
      temperature: parseFloat(newConditions.temperature),
      humidity: parseFloat(newConditions.humidity),
    });

    // Reset the state and close the modal
    setNewConditions({ temperature: '', humidity: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ambient Conditions</Text>

      <View style={styles.conditionsContainer}>
        <View style={styles.conditionItem}>
          <FontAwesome name="thermometer-half" size={30} color="#3E7D9D" />
          <Text style={styles.conditionText}>{`Temperature: ${ambientConditions.temperature}°C`}</Text>
        </View>

        <View style={styles.conditionItem}>
          <FontAwesome name="tint" size={30} color="#3E7D9D" />
          <Text style={styles.conditionText}>{`Humidity: ${ambientConditions.humidity}%`}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.updateButtonText}>Update Conditions</Text>
      </TouchableOpacity>

      {/* Modal for updating ambient conditions */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Ambient Conditions</Text>
            <TextInput
              style={styles.input}
              placeholder="Temperature (°C)"
              value={newConditions.temperature}
              onChangeText={(text) => setNewConditions({ ...newConditions, temperature: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Humidity (%)"
              value={newConditions.humidity}
              onChangeText={(text) => setNewConditions({ ...newConditions, humidity: text })}
              keyboardType="numeric"
            />
            <Button title="Update Conditions" onPress={handleUpdateConditions} />
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
  conditionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  conditionText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3E7D9D',
  },
  updateButton: {
    backgroundColor: '#3E7D9D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
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

export default TemperatureAndEnvironmentScreen;
