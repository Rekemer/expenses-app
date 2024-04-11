import React, { createContext, 
  useContext, useState
 } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CalculatorContext = createContext();
export const CATEGORY = {
  eatingOut: {
    text: 'ice-Cream', 
    uri: require('./assets/ice-cream.png')
  },
  food: {
    text: 'food', 
    uri: require('./assets/food.png')
  },
  bills: {
    text: 'bills', 
    uri: require('./assets/bills.png')
  },
  health: {
    text: 'health', 
    uri: require('./assets/health.png')
  },
  transport: {
    text: 'transport', 
    uri: require('./assets/transport.png')
  },
  taxi: {
    text: 'taxi', 
    uri: require('./assets/taxi.png')
  },
  pets: {
    text: 'pets', 
    uri: require('./assets/pets.png')
  },
  sports: {
    text: 'sports', 
    uri: require('./assets/sports.png')
  },
  house: {
    text: 'house', 
    uri: require('./assets/house.png')
  },
};
AsyncStorage.setItem(CATEGORY.eatingOut.text,'0');

export const CalculatorProvider = ({ children }) => {


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

   // Function to handle number inputs
   const handleNumberInput = (num) => {
     if (displayValue === '0') {
       setDisplayValue(num.toString());
      } else {
        setDisplayValue(displayValue + num);
      }
      console.log('handleNumberInput: ' +  displayValue);
      console.log('handleNumberInput num: ' +  num);
    };
    const handleCategoryInput = async (category) => {
      try {
        let categoryNumber = await AsyncStorage.getItem(category.text);
        categoryNumber = JSON.parse(categoryNumber); 
        const newNumber = categoryNumber + parseFloat(displayValue);
        //console.log('new number : ' +newNumber);
        await AsyncStorage.setItem(category.text, JSON.stringify(newNumber));
        //console.log(category.text + ': ' + categoryNumber);
        handleClear();
    } catch (error) {
        console.error('Error saving data:', error);
        // Handle error
    }
    };
 // Function to handle clear button press
 const handleClear = () => {
     setDisplayValue('0');
     setOperator(null);
     setFirstValue('');
 };
 const handleDot = () => {
  setDisplayValue(displayValue+'.');
 }
   return (
     <CalculatorContext.Provider
       value={{
         displayValue,
         date,
         setDisplayValue,
         setDate,
         handleNumberInput,
         handleOperatorInput,
         handleCategoryInput,
         handleEqual,
         handleDot,
         handleClear,
       }}
     >
       {children}  
     </CalculatorContext.Provider>
   );
 };
 export const useCalculator = () => useContext(CalculatorContext);