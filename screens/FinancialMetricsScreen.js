import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';

const FinancialMetricsScreen = () => {
  // Dummy data for demonstration purposes
  const [expenseData, setExpenseData] = useState({
    veterinaryCare: 2000,
    feed: 1500,
    otherExpenses: 500,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });

  const handleAddExpense = () => {
    // Update the expense data
    setExpenseData((prev) => ({
      ...prev,
      [newExpense.category.toLowerCase()]: parseFloat(newExpense.amount),
    }));

    // Reset the state and close the modal
    setNewExpense({ category: '', amount: '' });
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
      <Text style={styles.title}>Cost Analysis</Text>

      <BarChart
        data={{
          labels: Object.keys(expenseData),
          datasets: [
            {
              data: Object.values(expenseData),
            },
          ],
        }}
        width={300}
        height={200}
        chartConfig={chartConfig}
      />

      <View style={styles.expenseDetails}>
        {Object.entries(expenseData).map(([category, amount]) => (
          <View key={category} style={styles.expenseItem}>
            <FontAwesome name="dollar" size={20} color="#3E7D9D" />
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseCategory}>{category}</Text>
              <Text style={styles.expenseAmount}>{`Amount: $${amount}`}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>

      {/* Modal for adding new expense */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Expense</Text>
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newExpense.category}
              onChangeText={(text) => setNewExpense({ ...newExpense, category: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={newExpense.amount}
              onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
              keyboardType="numeric"
            />
            <Button title="Add Expense" onPress={handleAddExpense} />
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
  expenseDetails: {
    marginTop: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  expenseInfo: {
    marginLeft: 10,
  },
  expenseCategory: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseAmount: {
    color: '#3E7D9D',
  },
  addButton: {
    backgroundColor: '#3E7D9D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
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

export default FinancialMetricsScreen;
