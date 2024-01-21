import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FertilityAndBreedingScreen = () => {
  // Dummy data for demonstration purposes
  const [matingSchedules, setMatingSchedules] = useState([
    { id: '1', goatId: 'G001', date: '2022-01-15' },
    { id: '2', goatId: 'G002', date: '2022-02-05' },
    // Add more mating schedules as needed
  ]);

  const [pregnancyData, setPregnancyData] = useState({
    successfulPregnancies: 10,
    totalMatings: 15,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newMating, setNewMating] = useState({ goatId: '', date: '' });

  const renderMatingItem = ({ item }) => (
    <View style={styles.matingItem}>
      <FontAwesome name="calendar" size={20} color="#3E7D9D" />
      <View style={styles.matingInfo}>
        <Text style={styles.matingGoatId}>{`Goat ID: ${item.goatId}`}</Text>
        <Text style={styles.matingDate}>{`Date: ${item.date}`}</Text>
      </View>
    </View>
  );

  const handleAddMating = () => {
    // Add the new mating schedule to the list
    setMatingSchedules((prev) => [...prev, { ...newMating, id: String(prev.length + 1) }]);

    // Increment total matings and update successful pregnancies if the mating is successful
    setPregnancyData((prev) => ({
      successfulPregnancies: newMating.successful ? prev.successfulPregnancies + 1 : prev.successfulPregnancies,
      totalMatings: prev.totalMatings + 1,
    }));

    // Reset the state and close the modal
    setNewMating({ goatId: '', date: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mating Schedules</Text>

      <FlatList
        data={matingSchedules}
        keyExtractor={(item) => item.id}
        renderItem={renderMatingItem}
        style={styles.matingList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Mating Schedule</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Pregnancy Success Rates</Text>
      <View style={styles.pregnancyStats}>
        <Text style={styles.stat}>{`Successful Pregnancies: ${pregnancyData.successfulPregnancies}`}</Text>
        <Text style={styles.stat}>{`Total Matings: ${pregnancyData.totalMatings}`}</Text>
        <Text style={styles.stat}>{`Success Rate: ${(pregnancyData.successfulPregnancies / pregnancyData.totalMatings) * 100}%`}</Text>
      </View>

      {/* Modal for adding new mating schedule */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Mating Schedule</Text>
            <TextInput
              style={styles.input}
              placeholder="Goat ID"
              value={newMating.goatId}
              onChangeText={(text) => setNewMating({ ...newMating, goatId: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newMating.date}
              onChangeText={(text) => setNewMating({ ...newMating, date: text })}
            />
            <Button title="Add Mating Schedule" onPress={handleAddMating} />
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
  matingList: {
    marginBottom: 20,
  },
  matingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  matingInfo: {
    marginLeft: 10,
  },
  matingGoatId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matingDate: {
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
  pregnancyStats: {
    marginBottom: 20,
  },
  stat: {
    fontSize: 16,
    marginBottom: 5,
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

export default FertilityAndBreedingScreen;
