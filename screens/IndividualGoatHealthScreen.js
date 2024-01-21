import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const goatData = [
  { id: 1, tagId: 'GT001', breed: 'Saanen', sex: 'Female', dob: '2022-01-01', age: '2 years', status: 'Healthy', temperature: 101.5, heartRate: 80, respiratoryRate: 20 },
  { id: 2, tagId: 'GT002', breed: 'Nubian', sex: 'Male', dob: '2021-05-15', age: '2.5 years', status: 'Abnormal', temperature: 103.2, heartRate: 90, respiratoryRate: 25 },
  { id: 3, tagId: 'GT003', breed: 'Alpine', sex: 'Female', dob: '2020-12-10', age: '3 years', status: 'Critical', temperature: 105.0, heartRate: 110, respiratoryRate: 30 },
  // Add more goat data as needed
];

const IndividualGoatHealthScreen = ({ navigation }) => {
  const [selectedGoat, setSelectedGoat] = useState(null);

  const renderGoatItem = ({ item }) => {
    let healthColor = '#3E7D9D'; // Default color for healthy goats

    if (item.status === 'Abnormal') {
      healthColor = '#C4A77D'; // Orange color for abnormal goats
    } else if (item.status === 'Critical') {
      healthColor = '#FA6E89'; // Red color for critical goats
    }

    return (
      <TouchableOpacity
        style={[styles.goatItem, { borderColor: healthColor }]}
        onPress={() => setSelectedGoat(item)}
      >
        <Text style={styles.goatTag}>{item.tagId}</Text>
        <View style={[styles.healthDot, { backgroundColor: healthColor }]} />
      </TouchableOpacity>
    );
  };

  const renderDetailScreen = () => {
    if (!selectedGoat) {
      return (
        <View style={styles.emptyDetailContainer}>
          <Text style={styles.emptyDetailText}>Select a goat to view details</Text>
        </View>
      );
    }

    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Goat Details</Text>
        <Text>ID: {selectedGoat.tagId}</Text>
        <Text>Breed: {selectedGoat.breed}</Text>
        <Text>Sex: {selectedGoat.sex}</Text>
        <Text>Date of Birth: {selectedGoat.dob}</Text>
        <Text>Age: {selectedGoat.age}</Text>
        <Text>Status: {selectedGoat.status}</Text>
        <Text>Vital Signs:</Text>
        <Text>Temperature: {selectedGoat.temperature} °F</Text>
        <Text>Heart Rate: {selectedGoat.heartRate} BPM</Text>
        <Text>Respiratory Rate: {selectedGoat.respiratoryRate} BPM</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteGoat(selectedGoat.id)}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleDeleteGoat = (goatId) => {
    // Implement delete functionality here
    // You may want to update your state or perform an API call to delete the goat data
    setSelectedGoat(null); // Reset selectedGoat after deletion
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={goatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGoatItem}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
      <View style={styles.detailScreenContainer}>{renderDetailScreen()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  listContentContainer: {
    flexGrow: 1,
  },
  goatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  goatTag: {
    fontWeight: 'bold',
  },
  healthDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  detailScreenContainer: {
    flex: 1,
    padding: 10,
    borderLeftWidth: 1,
    borderColor: '#ccc',
  },
  emptyDetailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#3E7D9D',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FA6E89',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default IndividualGoatHealthScreen;
