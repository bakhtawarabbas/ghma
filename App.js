// App.js

import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from './screens/DashboardScreen';
import IndividualGoatHealthScreen from './screens/IndividualGoatHealthScreen';
import MedicalRecordsScreen from './screens/MedicalRecordsScreen';
import ReproductionStatusScreen from './screens/ReproductionStatusScreen';
import FeedAndNutritionScreen from './screens/FeedAndNutritionScreen';
import ActivityLevelScreen from './screens/ActivityLevelScreen';
import TemperatureAndEnvironmentScreen from './screens/TemperatureAndEnvironmentScreen';
import DiseaseAndInfectionTrackingScreen from './screens/DiseaseAndInfectionTrackingScreen';
import FertilityAndBreedingScreen from './screens/FertilityAndBreedingScreen';
import FinancialMetricsScreen from './screens/FinancialMetricsScreen';
import WeatherConditionsScreen from './screens/WeatherConditionsScreen';
import EmergencyContactsScreen from './screens/EmergencyContactsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const screenPaths = [
    DashboardScreen,
    IndividualGoatHealthScreen,
    MedicalRecordsScreen,
    ReproductionStatusScreen,
    FeedAndNutritionScreen,
    ActivityLevelScreen,
    TemperatureAndEnvironmentScreen,
    DiseaseAndInfectionTrackingScreen,
    FertilityAndBreedingScreen,
    FinancialMetricsScreen,
    WeatherConditionsScreen,
    EmergencyContactsScreen,
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Expo App</Text>
      <View style={styles.cardContainer}>
        {screenPaths.map((ScreenComponent, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: getRandomColor() }]}
            onPress={() => navigation.navigate(`Screen${index + 1}`)}
          >
            <Text style={styles.cardText}>Dummy Text</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const DetailsScreen = ({ route }) => {
  const { screenIndex } = route.params;
  const screenComponents = [
    DashboardScreen,
    IndividualGoatHealthScreen,
    MedicalRecordsScreen,
    ReproductionStatusScreen,
    FeedAndNutritionScreen,
    ActivityLevelScreen,
    TemperatureAndEnvironmentScreen,
    DiseaseAndInfectionTrackingScreen,
    FertilityAndBreedingScreen,
    FinancialMetricsScreen,
    WeatherConditionsScreen,
    EmergencyContactsScreen,
  ];

  const ScreenComponent = screenComponents[screenIndex - 1];

  return (
    <View style={styles.container}>
      <ScreenComponent />
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={() => <Text>Settings</Text>} />
      <Tab.Screen name="Profile" component={() => <Text>Profile</Text>} />
      <Tab.Screen name="AboutUs" component={() => <Text>About Us</Text>} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
        {Array.from({ length: 12 }).map((_, index) => (
          <Stack.Screen
            key={index}
            name={`Screen${index + 1}`}
            component={DetailsScreen}
            initialParams={{ screenIndex: index + 1 }}
            options={{ title: `Screen ${index + 1}` }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: 90, // 3 inches
    height: 120, // 1.5 inches
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    color: 'white',
  },
});

export default App;
