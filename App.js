import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './Screens/Home';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image }
  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CalculatorProvider } from './Calculator';
import { CalendarTimeProvider } from './RandomtCalendarTime';
import { CalendarProvider } from './Calendar';
import { Alert } from 'react-native';
import { IncomeScreen, ExpenseScreen, HomeScreen, CalendarScreen } from './Screens';

function Calculator() {
  const Tab = createBottomTabNavigator();
  return (
    <CalendarProvider>
      <CalendarTimeProvider>
        <CalculatorProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Calculator" component={HomeScreen} />
              {/* those tabs are shown only for debug purposes */}
              <Tab.Screen name="Expense" component={ExpenseScreen} />
              <Tab.Screen name="Income" component={IncomeScreen} />

              <Tab.Screen name="Calendar" component={CalendarScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </CalculatorProvider>
      </CalendarTimeProvider>
    </CalendarProvider>

  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}

useEffect(() => {
  // Display the warning message when the component mounts
  Alert.alert(
    'Warning',
    'To initialize application click clear AsyncStorage',
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ],
    { cancelable: false }
  );
}, []); // Empty dependency array ensures the effect runs only once
return (
  <Calculator
  />

);


