import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const FeedAndNutritionScreen = () => {
  // Dummy data for demonstration purposes
  const [dailyFeedIntake, setDailyFeedIntake] = useState([
    { id: '1', date: '2022-01-01', amount: 5 },
    { id: '2', date: '2022-01-02', amount: 6 },
    // Add more daily feed intake data as needed
  ]);

  const [nutritionalData, setNutritionalData] = useState({
    protein: 18,
    carbohydrates: 25,
    fats: 8,
    vitamins: {
      vitaminA: 5000,
      vitaminD: 800,
      // Add more vitamins as needed
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newFeedData, setNewFeedData] = useState({ date: '', amount: '' });

  const renderFeedItem = ({ item }) => (
    <View style={styles.feedItem}>
      <FontAwesome name="cutlery" size={20} color="#3E7D9D" />
      <View style={styles.feedInfo}>
        <Text style={styles.feedDate}>{item.date}</Text>
        <Text style={styles.feedAmount}>{`Amount: ${item.amount} kg`}</Text>
      </View>
    </View>
  );

  const handleAddFeedData = () => {
    // Add the new feed data to the list
    setDailyFeedIntake((prev) => [...prev, { ...newFeedData, id: String(prev.length + 1) }]);

    // Reset the state and close the modal
    setNewFeedData({ date: '', amount: '' });
    setModalVisible(false);
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(62, 125, 157, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  const nutritionalInfoKeys = Object.keys(nutritionalData.vitamins);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed Consumption</Text>
      <LineChart
        data={{
          labels: dailyFeedIntake.map((item) => item.date),
          datasets: [
            {
              data: dailyFeedIntake.map((item) => item.amount),
            },
          ],
        }}
        width={300}
        height={200}
        chartConfig={chartConfig}
      />

      <Text style={styles.title}>Nutritional Information</Text>
      <View style={styles.nutritionalInfo}>
        <Text style={styles.nutrient}>Protein: {nutritionalData.protein}%</Text>
        <Text style={styles.nutrient}>Carbohydrates: {nutritionalData.carbohydrates}%</Text>
        <Text style={styles.nutrient}>Fats: {nutritionalData.fats}%</Text>

        {nutritionalInfoKeys.map((vitamin) => (
          <Text key={vitamin} style={styles.nutrient}>
            {`${vitamin}: ${nutritionalData.vitamins[vitamin]} IU`}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Feed Data</Text>
      </TouchableOpacity>

      {/* Modal for adding new feed data */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Feed Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newFeedData.date}
              onChangeText={(text) => setNewFeedData({ ...newFeedData, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount (kg)"
              value={newFeedData.amount}
              onChangeText={(text) => setNewFeedData({ ...newFeedData, amount: text })}
              keyboardType="numeric"
            />
            <Button title="Add Feed Data" onPress={handleAddFeedData} />
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
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  feedInfo: {
    marginLeft: 10,
  },
  feedDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedAmount: {
    color: '#3E7D9D',
  },
  nutritionalInfo: {
    marginBottom: 20,
  },
  nutrient: {
    fontSize: 16,
    marginBottom: 5,
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

export default FeedAndNutritionScreen;
