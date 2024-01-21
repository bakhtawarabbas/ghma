import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ReproductionStatusScreen = () => {
  // Dummy data for demonstration purposes
  const [breedingCycles, setBreedingCycles] = useState([
    { id: '1', goatId: '1', cycleNumber: 1, startDate: '2022-01-01', endDate: '2022-01-15' },
    { id: '2', goatId: '2', cycleNumber: 2, startDate: '2022-02-15', endDate: '2022-03-01' },
    // Add more breeding cycle data as needed
  ]);

  const [pregnancyStatus, setPregnancyStatus] = useState([
    { id: '1', goatId: '1', isPregnant: true },
    { id: '2', goatId: '2', isPregnant: false },
    // Add more pregnancy status data as needed
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCycle, setNewCycle] = useState({ goatId: '', startDate: '', endDate: '' });
  const [newPregnancyStatus, setNewPregnancyStatus] = useState({ goatId: '', isPregnant: false });

  const renderCycleItem = ({ item }) => (
    <View style={styles.cycleItem}>
      <FontAwesome name="calendar" size={20} color="#3E7D9D" />
      <View style={styles.cycleInfo}>
        <Text style={styles.cycleNumber}>Cycle #{item.cycleNumber}</Text>
        <Text style={styles.cycleDate}>{`${item.startDate} - ${item.endDate}`}</Text>
      </View>
    </View>
  );

  const renderPregnancyStatusItem = ({ item }) => (
    <View style={styles.pregnancyStatusItem}>
      <FontAwesome name={item.isPregnant ? 'heart' : 'times-circle'} size={20} color="#3E7D9D" />
      <View style={styles.pregnancyStatusInfo}>
        <Text style={styles.pregnancyStatus}>Pregnant: {item.isPregnant ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );

  const handleAddCycle = () => {
    // Add the new breeding cycle to the list
    setBreedingCycles((prev) => [
      ...prev,
      { ...newCycle, id: String(prev.length + 1), cycleNumber: prev.length + 1 },
    ]);

    // Reset the state and close the modal
    setNewCycle({ goatId: '', startDate: '', endDate: '' });
    setModalVisible(false);
  };

  const handleAddPregnancyStatus = () => {
    // Add the new pregnancy status to the list
    setPregnancyStatus((prev) => [...prev, { ...newPregnancyStatus, id: String(prev.length + 1) }]);

    // Reset the state and close the modal
    setNewPregnancyStatus({ goatId: '', isPregnant: false });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breeding Cycles</Text>
      <FlatList
        data={breedingCycles}
        keyExtractor={(item) => item.id}
        renderItem={renderCycleItem}
        style={styles.cycleList}
      />

      <Text style={styles.title}>Pregnancy Status</Text>
      <FlatList
        data={pregnancyStatus}
        keyExtractor={(item) => item.id}
        renderItem={renderPregnancyStatusItem}
        style={styles.pregnancyStatusList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Record</Text>
      </TouchableOpacity>

      {/* Modal for adding a new breeding cycle or pregnancy status */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Record</Text>

            {/* Breeding Cycle Form */}
            <TextInput
              style={styles.input}
              placeholder="Goat ID"
              value={newCycle.goatId}
              onChangeText={(text) => setNewCycle({ ...newCycle, goatId: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Date (YYYY-MM-DD)"
              value={newCycle.startDate}
              onChangeText={(text) => setNewCycle({ ...newCycle, startDate: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="End Date (YYYY-MM-DD)"
              value={newCycle.endDate}
              onChangeText={(text) => setNewCycle({ ...newCycle, endDate: text })}
            />
            <Button title="Add Breeding Cycle" onPress={handleAddCycle} />

            {/* Pregnancy Status Form */}
            <TextInput
              style={styles.input}
              placeholder="Goat ID"
              value={newPregnancyStatus.goatId}
              onChangeText={(text) => setNewPregnancyStatus({ ...newPregnancyStatus, goatId: text })}
            />
            <Button
              title={`Set as ${newPregnancyStatus.isPregnant ? 'Not Pregnant' : 'Pregnant'}`}
              onPress={() =>
                setNewPregnancyStatus({ ...newPregnancyStatus, isPregnant: !newPregnancyStatus.isPregnant })
              }
            />
            <Button title="Add Pregnancy Status" onPress={handleAddPregnancyStatus} />

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
  cycleList: {
    marginBottom: 20,
  },
  pregnancyStatusList: {
    marginBottom: 20,
  },
  cycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cycleInfo: {
    marginLeft: 10,
  },
  cycleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cycleDate: {
    color: '#3E7D9D',
  },
  pregnancyStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pregnancyStatusInfo: {
    marginLeft: 10,
  },
  pregnancyStatus: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default ReproductionStatusScreen;
