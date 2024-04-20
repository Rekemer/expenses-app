import React, {
  createContext,
  useContext, useState
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCalendar } from './Calendar'
import { useCalendarTime } from './RandomtCalendarTime'
import { userId } from './User'
const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  // State variables
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const { storageUpdated, setStorageUpdated } = useCalendar();
  const { randomTime } = useCalendarTime();
  const date = randomTime.getString()
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
    //console.log('handleNumberInput: ' +  displayValue);
    //console.log('handleNumberInput num: ' +  num);
  };

  const handleCategoryInput = async (category) => {
    try {
      let categoryNumber = await AsyncStorage.getItem(category.text);
      categoryNumber = JSON.parse(categoryNumber);
      const newNumber = categoryNumber + parseFloat(displayValue);
      //console.log('new number : ' +newNumber);
      const generateId = () => {
        return Math.random().toString(36).substr(2, 9);
      };

      // Data item description
      const data = { date: date, displayValue, category: category.text, id: generateId(), IsExpense: category.IsExpense };

      const userDatesJson = await AsyncStorage.getItem(userId);
      userDates = JSON.parse(userDatesJson);
      console.log('user dates ' + userDates);
      const existingDataString = await AsyncStorage.getItem(date);
      const existingData = existingDataString ? JSON.parse(existingDataString) : [];
      // Add or update the expense for the given date
      existingData.push(data);
      console.log(existingData);

      if (!userDates.includes(date)) {
        userDates.push(date);
      }

      //console.log('date '  + date.getString());

      await AsyncStorage.setItem(date, JSON.stringify(existingData));
      await AsyncStorage.setItem(userId, JSON.stringify(userDates));
      //console.log(category.text + ': ' + categoryNumber);
      setStorageUpdated(!storageUpdated);
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
    setDisplayValue(displayValue + '.');
  }
  return (
    <CalculatorContext.Provider
      value={{
        displayValue,
        date: date,
        setDisplayValue,
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