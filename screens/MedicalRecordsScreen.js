import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MedicalRecordsScreen = () => {
  // Dummy data for demonstration purposes
  const [vaccinationHistory, setVaccinationHistory] = useState([
    { id: '1', goatId: '1', name: 'Vaccination 1', date: '2022-01-01' },
    { id: '2', goatId: '2', name: 'Vaccination 2', date: '2022-02-15' },
    // Add more vaccination data as needed
  ]);

  const [medicationLog, setMedicationLog] = useState([
    { id: '1', goatId: '1', name: 'Medication 1', date: '2022-03-10' },
    { id: '2', goatId: '2', name: 'Medication 2', date: '2022-04-05' },
    // Add more medication data as needed
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newRecord, setNewRecord] = useState({ name: '', date: '' });

  const renderRecordItem = ({ item }) => (
    <View style={styles.recordItem}>
      <FontAwesome name="file-text-o" size={20} color="#3E7D9D" />
      <View style={styles.recordInfo}>
        <Text style={styles.recordName}>{item.name}</Text>
        <Text style={styles.recordDate}>{item.date}</Text>
      </View>
    </View>
  );

  const handleAddRecord = () => {
    // Add the new record to the appropriate log based on the modal type
    if (modalVisible) {
      setVaccinationHistory((prev) => [...prev, { ...newRecord, id: String(prev.length + 1) }]);
    } else {
      setMedicationLog((prev) => [...prev, { ...newRecord, id: String(prev.length + 1) }]);
    }

    // Reset the state and close the modal
    setNewRecord({ name: '', date: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vaccination History</Text>
      <FlatList
        data={vaccinationHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderRecordItem}
        style={styles.recordList}
      />

      <Text style={styles.title}>Medication Log</Text>
      <FlatList
        data={medicationLog}
        keyExtractor={(item) => item.id}
        renderItem={renderRecordItem}
        style={styles.recordList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Record</Text>
      </TouchableOpacity>

      {/* Modal for adding a new record */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Record</Text>
            <TextInput
              style={styles.input}
              placeholder="Record Name"
              value={newRecord.name}
              onChangeText={(text) => setNewRecord({ ...newRecord, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newRecord.date}
              onChangeText={(text) => setNewRecord({ ...newRecord, date: text })}
            />
            <Button title="Add Record" onPress={handleAddRecord} />
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
    marginBottom: 10,
  },
  recordList: {
    marginBottom: 20,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recordInfo: {
    marginLeft: 10,
  },
  recordName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordDate: {
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

export default MedicalRecordsScreen;
