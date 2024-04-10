import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image  }
    from 'react-native';

    import { NavigationContainer } from '@react-navigation/native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

    import {DeviceEventEmitter} from "react-native"
    import { useCalculator } from './Calculator'; 
    import { CalculatorProvider,CATEGORY } from './Calculator'; // Import CalculatorProvider
function CategoryScreen({ route, navigation }){
  const {
    displayValue,
       date,
       setDisplayValue,
       setDate,
       handleNumberInput,
       handleOperatorInput,
       handleCategoryInput,
       handleEqual,
       handleClear,
} = useCalculator(); // Use useCalculator hook to access state and functions
return (<View style={styles.container}>
  <View style={styles.displayDate}>
    <Text style={styles.displayText}>{date}</Text>
  </View>
  <Display value={displayValue} />
  <TouchableOpacity style={styles.buttonCategory}>
    <Text style={styles.clearButtonText}  onPress={() => navigation.navigate('Calculator')} >Calculation</Text>
  </TouchableOpacity>
  <View style={styles.buttonContainer}>

    <View style={styles.row}>
      <CategoryButton onPress={() => handleCategoryInput(CATEGORY.iceCream)} image={CATEGORY.iceCream }/>
      {/* <CategoryButton onPress={() => handleNumberInput(8)} text="Category2" />
      <CategoryButton onPress={() => handleNumberInput(9)} text="Category3" /> */}
    </View>
    {/* <View style={styles.row}>
      <CategoryButton onPress={() => handleNumberInput(4)} text="Category4" />
     <CategoryButton onPress={() => handleNumberInput(5)} text="Category5" />
      <CategoryButton onPress={() => handleNumberInput(6)} text="Category6" />
    </View>
    <View style={styles.row}>
      <CategoryButton onPress={() => handleNumberInput(4)} text="Category4" />
     <CategoryButton onPress={() => handleNumberInput(5)} text="Category5" />
      <CategoryButton onPress={() => handleNumberInput(6)} text="Category6" />
    </View> */}
    
  </View>
</View>)
} 
function HomeScreen({ route, navigation }) {
  const {
      displayValue,
         date,
         setDisplayValue,
         setDate,
         handleNumberInput,
         handleOperatorInput,
         handleEqual,
         handleClear,
  } = useCalculator(); // Use useCalculator hook to access state and functions
  console.log("diplay" + displayValue);
  return (
       <View style={styles.container}>
            <View style={styles.displayDate}>
              <Text style={styles.displayText}>{date}</Text>
            </View>
            <Display value={displayValue} />
            <TouchableOpacity style={styles.buttonCategory}>
              <Text style={styles.clearButtonText}  onPress={() => navigation.navigate('Category')} >Pick Category</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>

              <View style={styles.row}>
                <Button onPress={() => handleNumberInput(7)} text="7" />
                <Button onPress={() => handleNumberInput(8)} text="8" />
                <Button onPress={() => handleNumberInput(9)} text="9" />
                <OperatorButton onPress={() => handleOperatorInput('/')} text="÷" />
              </View>
              <View style={styles.row}>
                <Button onPress={() => handleNumberInput(4)} text="4" />
               <Button onPress={() => handleNumberInput(5)} text="5" />
                <Button onPress={() => handleNumberInput(6)} text="6" />
                <OperatorButton onPress={() => handleOperatorInput('*')} text="*" />
              </View>
              <View style={styles.row}>
                <Button onPress={() => handleNumberInput(1)} text="1" />
                <Button onPress={() => handleNumberInput(2)} text="2" />
                <Button onPress={() => handleNumberInput(3)} text="3" />
                <OperatorButton onPress={() => handleOperatorInput('-')} text="-" />
              </View>
              <View style={styles.row}>
              <Button onPress={() => handleNumberInput(0)} text="0" />
              <OperatorButton onPress={() => handleOperatorInput('+')} text="+" />
              <OperatorButton onPress={() => handleEqual()} text="=" />
              </View>
              <ClearButton onPress={() => handleClear()} text="C" />
            </View>
          </View>
  );
}

    const Button = ({ onPress, text }) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      );
      const CategoryButton = ({ onPress,image }) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image source={image.uri} style={styles.image} />
          <Text style={{ fontSize: 20 }}>{image.text}</Text>
        </TouchableOpacity>
      );
      const OperatorButton = ({ onPress, text }) => (
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={onPress}>
          <Text style={[styles.buttonText, styles.operatorButtonText]}>{text}</Text>
        </TouchableOpacity>
      );
      
      const Display = ({ value }) => (
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{value}</Text>
        </View>
      );
      
      const ClearButton = ({ onPress, text }) => (
        <TouchableOpacity
            style={styles.clearButton}
            onPress={onPress}>
            <Text style={styles.clearButtonText}>{text}</Text>
        </TouchableOpacity>
      );
function Calculator() {
 const Tab = createBottomTabNavigator();
      

   
  
        return (
          <CalculatorProvider>

          <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name="Calculator" component={HomeScreen} />
               <Tab.Screen name="Category" component={CategoryScreen}/> 
          </Tab.Navigator>
          </NavigationContainer>
          </CalculatorProvider>

       
        );
      }
      
export default function App() {

  return (
      <Calculator
      />
  );

}
// Styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor : 'red',
      borderWidth : 2
  },
  displayContainer: {
      flex: 1,
      //justifyContent: 'flex-end',
      //alignItems: 'flex-end',
      padding: 10,
      borderColor : 'red',
      borderWidth : 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
     // gap: 10,
  },
  c: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    },
  displayText: {
      fontSize: 48,
      color: '#333',
  },

  displayDate: {
    fontSize: 28,
    color: '#333',
    borderColor : 'red',
    borderWidth : 2,
},
  buttonContainer: {
      flex: 3,
      width: '80%',
      borderColor : 'red',
      borderWidth : 2,
  },
  row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      borderColor : 'blue',
      borderWidth : 2,
  },
  button: {
      flex: 1,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 3,
      margin: 1,
      padding: 2,
  },
  buttonCategory:
  {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    elevation: 3,
    width: '80%',
  },
  buttonText: {
      fontSize: 34,
      color: '#333',
  },
  zeroButton: {
      flex: 2,
      paddingLeft: 35,
      paddingRight: 35,
  },
  zeroButtonText: {
      marginLeft: 10,
  },
  operatorButton: {
      backgroundColor: '#f0f0f0',
  },
  operatorButtonText: {
      color: '#ff9500',
  },
  equalButton: {
      flex: 1,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff9500',
      elevation: 3,
  },
  equalButtonText: {
      fontSize: 32,
      color: '#fff',
  },
  image: {
    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
    resizeMode: 'contain', // Adjust resize mode as needed
    marginBottom: 5, // Adjust margin as needed
  },
  clearButton: {
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      marginTop: 2,
      elevation: 3,
      padding: 10,
      borderColor : 'red',
      borderWidth : 2,
  },
  clearButtonText: {
      fontSize: 24,
      color: '#333',
  },
});
