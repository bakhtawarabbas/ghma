import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const EmergencyContactsScreen = () => {
  // Dummy data for demonstration purposes
  const emergencyContacts = [
    { id: '1', type: 'Veterinary', name: 'Dr. Smith', phone: '123-456-7890' },
    { id: '2', type: 'Veterinary', name: 'Dr. Johnson', phone: '987-654-3210' },
    { id: '3', type: 'Farm Manager', name: 'John Doe', phone: '555-123-4567' },
    // Add more emergency contacts as needed
  ];

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      {item.type === 'Veterinary' ? (
        <FontAwesome name="medkit" size={30} color="#FA6E89" />
      ) : (
        <FontAwesome name="user" size={30} color="#C4A77D" />
      )}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactType}>{item.type}</Text>
        <Text style={styles.contactPhone}>{`Phone: ${item.phone}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      <FlatList
        data={emergencyContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        style={styles.contactList}
      />
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
  contactList: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contactInfo: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactType: {
    color: '#3E7D9D',
  },
  contactPhone: {
    color: '#3E7D9D',
  },
});

export default EmergencyContactsScreen;
