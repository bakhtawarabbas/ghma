import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';

const ActivityLevelScreen = () => {
  // Dummy data for demonstration purposes
  const [activityData, setActivityData] = useState([
    { id: '1', date: '2022-01-01', activityLevel: 8 },
    { id: '2', date: '2022-01-02', activityLevel: 6 },
    // Add more activity data as needed
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newActivityData, setNewActivityData] = useState({ date: '', activityLevel: '' });

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <FontAwesome name="line-chart" size={20} color="#3E7D9D" />
      <View style={styles.activityInfo}>
        <Text style={styles.activityDate}>{item.date}</Text>
        <Text style={styles.activityLevel}>{`Activity Level: ${item.activityLevel}`}</Text>
      </View>
    </View>
  );

  const handleAddActivityData = () => {
    // Add the new activity data to the list
    setActivityData((prev) => [...prev, { ...newActivityData, id: String(prev.length + 1) }]);

    // Reset the state and close the modal
    setNewActivityData({ date: '', activityLevel: '' });
    setModalVisible(false);
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(62, 125, 157, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Behavioral Patterns</Text>
      <BarChart
        data={{
          labels: activityData.map((item) => item.date),
          datasets: [
            {
              data: activityData.map((item) => item.activityLevel),
            },
          ],
        }}
        width={300}
        height={200}
        chartConfig={chartConfig}
      />

      <Text style={styles.subtitle}>Activity Levels</Text>
      <FlatList
        data={activityData}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityItem}
        style={styles.activityList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Activity Data</Text>
      </TouchableOpacity>

      {/* Modal for adding new activity data */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Activity Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newActivityData.date}
              onChangeText={(text) => setNewActivityData({ ...newActivityData, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Activity Level (0-10)"
              value={newActivityData.activityLevel}
              onChangeText={(text) => setNewActivityData({ ...newActivityData, activityLevel: text })}
              keyboardType="numeric"
            />
            <Button title="Add Activity Data" onPress={handleAddActivityData} />
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityList: {
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activityInfo: {
    marginLeft: 10,
  },
  activityDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityLevel: {
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

export default ActivityLevelScreen;
