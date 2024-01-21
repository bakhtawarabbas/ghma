import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DashboardScreen = () => {
  // Dummy data for demonstration purposes
  const overallHealthScore = 75; // You can replace this with actual health data

  const getHealthColor = () => {
    if (overallHealthScore >= 80) {
      return '#3E7D9D'; // Greenish color
    } else if (overallHealthScore >= 60) {
      return '#C4A77D'; // Yellowish color
    } else {
      return '#FA6E89'; // Reddish color
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Health Status</Text>
      <View style={[styles.healthIndicator, { backgroundColor: getHealthColor() }]}>
        <Text style={styles.healthScore}>{overallHealthScore}</Text>
        <FontAwesome name="heartbeat" size={40} color="white" />
      </View>
      {overallHealthScore < 60 && (
        <TouchableOpacity style={styles.alertButton}>
          <Text style={styles.alertText}>Critical Alert! Check Details</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  healthIndicator: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  healthScore: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  alertButton: {
    backgroundColor: '#FA6E89',
    padding: 10,
    borderRadius: 5,
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
