import React, { createContext, useContext, useState } from 'react';
const CalculatorContext = createContext();
export const CATEGORY = {
  iceCream: {
    text: 'ice-Cream', 
    uri: require('./assets/ice-cream.png')
  },
};
var map= new Map();
map.set(CATEGORY.iceCream,0);
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
    console.log(displayValue);
    if (displayValue === '0') {
         setDisplayValue(num.toString());
     } else {
         setDisplayValue(displayValue + num);
     }
    };
    const handleCategoryInput = (category) => {
      var categoryNumber = map.get(category);
      categoryNumber += displayValue;
      console.log( category.text+': '+categoryNumber);
      handleClear();
    }
 // Function to handle clear button press
 const handleClear = () => {
     setDisplayValue('0');
     setOperator(null);
     setFirstValue('');
 };
 
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
         handleClear,
       }}
     >
       {children}  
     </CalculatorContext.Provider>
   );
 };
 export const useCalculator = () => useContext(CalculatorContext);