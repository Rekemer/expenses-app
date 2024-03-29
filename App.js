import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity }
    from 'react-native';

    import { NavigationContainer } from '@react-navigation/native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function CategoryScreen({ route, navigation }){
  const { displayValue, date, onNumberInput, onOperatorInput, onEqual, onClear } = route.params;
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
      <CategoryButton onPress={() => onNumberInput(7)} text="Category1" />
      <CategoryButton onPress={() => onNumberInput(8)} text="Category2" />
      <CategoryButton onPress={() => onNumberInput(9)} text="Category3" />
    </View>
    <View style={styles.row}>
      <CategoryButton onPress={() => onNumberInput(4)} text="Category4" />
     <CategoryButton onPress={() => onNumberInput(5)} text="Category5" />
      <CategoryButton onPress={() => onNumberInput(6)} text="Category6" />
    </View>
    <View style={styles.row}>
      <CategoryButton onPress={() => onNumberInput(4)} text="Category4" />
     <CategoryButton onPress={() => onNumberInput(5)} text="Category5" />
      <CategoryButton onPress={() => onNumberInput(6)} text="Category6" />
    </View>
    
  </View>
</View>)
} 
function HomeScreen({ route, navigation }) {
  const { displayValue, date, onNumberInput, onOperatorInput, onEqual, onClear } = route.params;
  console.log(onNumberInput);
  return (
       <View style={styles.container}>
            <View style={styles.displayDate}>
              <Text style={styles.displayText}>{date}</Text>
            </View>
            <Display value={displayValue} />
            <TouchableOpacity style={styles.buttonCategory}>
              <Text style={styles.clearButtonText}  onPress={() => navigation.navigate('Category')} >PickCategory</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>

              <View style={styles.row}>
                <Button onPress={() => {console.log("232");onNumberInput(7);}} text="7" />
                <Button onPress={() => onNumberInput(8)} text="8" />
                <Button onPress={() => onNumberInput(9)} text="9" />
                <OperatorButton onPress={() => onOperatorInput('/')} text="÷" />
              </View>
              <View style={styles.row}>
                <Button onPress={() => onNumberInput(4)} text="4" />
               <Button onPress={() => onNumberInput(5)} text="5" />
                <Button onPress={() => onNumberInput(6)} text="6" />
                <OperatorButton onPress={() => onOperatorInput('*')} text="*" />
              </View>
              <View style={styles.row}>
                <Button onPress={() => onNumberInput(1)} text="1" />
                <Button onPress={() => onNumberInput(2)} text="2" />
                <Button onPress={() => onNumberInput(3)} text="3" />
                <OperatorButton onPress={() => onOperatorInput('-')} text="-" />
              </View>
              <View style={styles.row}>
              <Button onPress={() => onNumberInput(0)} text="0" />
              <OperatorButton onPress={() => onOperatorInput('+')} text="+" />
              <OperatorButton onPress={() => onEqual()} text="=" />
              </View>
              <ClearButton onPress={() => onClear()} text="C" />
            </View>
          </View>
  );
}

    const Button = ({ onPress, text }) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      );
      const CategoryButton = ({ onPress, text }) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{ fontSize: 20 }}>{text}</Text>
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
    function Calculator({ displayValue, date, onNumberInput, onOperatorInput, onEqual, onClear }) {
      const Tab = createBottomTabNavigator();
        return (
       
          <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name="Calculator" component={HomeScreen} initialParams = {{ displayValue, date, onNumberInput, onOperatorInput, onEqual, onClear }} />
              <Tab.Screen name="Category" component={CategoryScreen} initialParams = {{ displayValue, date, onNumberInput, onOperatorInput, onEqual, onClear }} />
          </Tab.Navigator>
          </NavigationContainer>

       
        );
      }
      
export default function App() {

// Function to handle number inputs
const handleNumberInput = (num) => {
  console.log('handle number input');
    if (displayValue === '0') {
        setDisplayValue(num.toString());
    } else {
        setDisplayValue(displayValue + num);
    }
  };
  // State variables
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [date,setDate] = useState('20.02.2020');
  // Function to handle operator inputs
  const handleOperatorInput = (operator) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };
 // Function to handle equal button press
    const handleEqual = () => {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(displayValue);

        if (operator === '+') {
            setDisplayValue((num1 + num2).toString());
        } else if (operator === '-') {
            setDisplayValue((num1 - num2).toString());
        } else if (operator === '*') {
            setDisplayValue((num1 * num2).toString());
        } else if (operator === '/') {
            setDisplayValue((num1 / num2).toString());
        }

        setOperator(null);
        setFirstValue('');
    };

    // Function to handle clear button press
    const handleClear = () => {
        setDisplayValue('0');
        setOperator(null);
        setFirstValue('');
    };

  return (
      <Calculator
        displayValue={displayValue}
        date={date}
        onNumberInput={handleNumberInput}
        onOperatorInput={handleOperatorInput}
        onEqual={handleEqual}
        onClear={handleClear}
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
