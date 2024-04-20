import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image }
  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Screens/Home';
import { CalculatorProvider } from './Calculator';
import { CalendarTimeProvider } from './RandomtCalendarTime';
import { CalendarProvider } from './Calendar';
import { Alert } from 'react-native';
import { IncomeScreen, ExpenseScreen, CalculatorScreen, CalendarScreen } from './Screens';

function Calculator() {
  const Tab = createBottomTabNavigator();
  return (
    <CalendarProvider>
      <CalendarTimeProvider>
        <CalculatorProvider>
          <NavigationContainer>
            <Tab.Navigator backBehavior="history">
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Expense" component={ExpenseScreen}  options={{ tabBarButton: () => null }}/>
              <Tab.Screen name="Income" component={IncomeScreen} options={{ tabBarButton: () => null }} />
              <Tab.Screen name="Calculator" component={CalculatorScreen} options={{ tabBarButton: () => null }} />
              <Tab.Screen name="Calendar" component={CalendarScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </CalculatorProvider>
      </CalendarTimeProvider>
    </CalendarProvider>

  );
}

export default function App() {
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
      <Calculator/>
    
    );
  
}



