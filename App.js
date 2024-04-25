import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image }
  from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Screens/Home';
import { HomeScreenProvider } from './Screens/Home';
import { CalculatorProvider } from './Calculator';
import { CalendarTimeProvider } from './RandomtCalendarTime';
import { CalendarProvider } from './Calendar';
import { Alert } from 'react-native';
import { IncomeScreen, ExpenseScreen, CalculatorScreen, CalendarScreen, ApiScreen } from './Screens';


export default function App() {
  const Tab = createBottomTabNavigator();

  // useEffect(() => {
  //   // Display the warning message when the component mounts
  //   Alert.alert(
  //     'Warning',
  //     'To initialize application click clear AsyncStorage',
  //     [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') }
  //     ],
  //     { cancelable: false }
  //   );
  // }, []); // Empty dependency array ensures the effect runs only once


  return (
    <HomeScreenProvider>
      <CalendarProvider>
        <CalendarTimeProvider>
          <CalculatorProvider>
            <NavigationContainer >
              <Tab.Navigator backBehavior="history">
                <Tab.Screen name="Home" component={Home} options={{
                  tabBarIcon: () => (
                    <Image
                      source={require('./assets/house.png')}
                      style={{ width: 24, height: 24 }}
                    />
                  ),
                }} />
                <Tab.Screen name="Expense" component={ExpenseScreen} options={{ tabBarButton: () => null }} />
                <Tab.Screen name="Income" component={IncomeScreen} options={{ tabBarButton: () => null }} />
                <Tab.Screen name="Calculator" component={CalculatorScreen} options={{ tabBarButton: () => null }} />
                <Tab.Screen name="Calendar" component={CalendarScreen} options={{
                  tabBarIcon: () => (
                    <Image
                      source={require('./assets/date.png')}
                      style={{ width: 24, height: 24 }}
                    />
                  ),
                }} />
                <Tab.Screen name="Exchange" component={ApiScreen} options={{
                  tabBarIcon: () => (
                    <Image
                      source={require('./assets/exchange-rate.png')}
                      style={{ width: 24, height: 24 }}
                    />
                  ),
                }} />
              </Tab.Navigator>
            </NavigationContainer>
          </CalculatorProvider>
        </CalendarTimeProvider>
      </CalendarProvider>
    </HomeScreenProvider>
  );
}



