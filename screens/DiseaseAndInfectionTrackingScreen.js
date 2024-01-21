import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DiseaseAndInfectionTrackingScreen = () => {
  // Dummy data for demonstration purposes
  const [incidenceReports, setIncidenceReports] = useState([
    { id: '1', disease: 'Fever', date: '2022-01-05' },
    { id: '2', disease: 'Cough', date: '2022-01-10' },
    // Add more incidence reports as needed
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newIncidence, setNewIncidence] = useState({ disease: '', date: '' });

  const renderIncidenceItem = ({ item }) => (
    <View style={styles.incidenceItem}>
      <FontAwesome name="hospital" size={20} color="#3E7D9D" />
      <View style={styles.incidenceInfo}>
        <Text style={styles.incidenceDisease}>{`Disease: ${item.disease}`}</Text>
        <Text style={styles.incidenceDate}>{`Date: ${item.date}`}</Text>
      </View>
    </View>
  );

  const handleAddIncidence = () => {
    // Add the new incidence report to the list
    setIncidenceReports((prev) => [...prev, { ...newIncidence, id: String(prev.length + 1) }]);

    // Reset the state and close the modal
    setNewIncidence({ disease: '', date: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incidence Reports</Text>

      <FlatList
        data={incidenceReports}
        keyExtractor={(item) => item.id}
        renderItem={renderIncidenceItem}
        style={styles.incidenceList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Incidence Report</Text>
      </TouchableOpacity>

      {/* Modal for adding new incidence report */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Incidence Report</Text>
            <TextInput
              style={styles.input}
              placeholder="Disease"
              value={newIncidence.disease}
              onChangeText={(text) => setNewIncidence({ ...newIncidence, disease: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newIncidence.date}
              onChangeText={(text) => setNewIncidence({ ...newIncidence, date: text })}
            />
            <Button title="Add Incidence Report" onPress={handleAddIncidence} />
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
  incidenceList: {
    marginBottom: 20,
  },
  incidenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  incidenceInfo: {
    marginLeft: 10,
  },
  incidenceDisease: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incidenceDate: {
    color: '#3E7D9D',
  },
  addButton: {
    backgroundColor: '#3E7D9D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
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

export default DiseaseAndInfectionTrackingScreen;
