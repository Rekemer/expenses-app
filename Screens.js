import { useCalendar, Calendar } from './Calendar';
import { useCalendarTime } from './RandomtCalendarTime';
import { CATEGORY } from './Categories';
import { userId } from './User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCalculator } from './Calculator';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image }
  from 'react-native';
import { styles } from './MainStyle';
const Button = ({ onPress, text }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
const CategoryButton = ({ onPress, image }) => (
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

export function ExpenseScreen({ navigation }) {
  const {
    displayValue,
    date,
    handleCategoryInput,
  } = useCalculator(); // Use useCalculator hook to access state and functions
  return (<View style={styles.container}>
    <View >
      <Text style={styles.displayDate}>{date}</Text>
    </View>
    <Display value={displayValue} />
    <TouchableOpacity style={styles.buttonCategory}>
      <Text style={styles.clearButtonText} onPress={() => navigation.navigate('Calculator')} >Calculation</Text>
    </TouchableOpacity>
    <View style={styles.buttonContainer}>

      <View style={styles.row}>
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.eatingOut)} image={CATEGORY.eatingOut} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.food)} image={CATEGORY.food} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.bills)} image={CATEGORY.bills} />
      </View>
      <View style={styles.row}>
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.health)} image={CATEGORY.health} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.transport)} image={CATEGORY.transport} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.taxi)} image={CATEGORY.taxi} />
      </View>
      <View style={styles.row}>
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.pets)} image={CATEGORY.pets} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.sports)} image={CATEGORY.sports} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.house)} image={CATEGORY.house} />
      </View>

    </View>
  </View>)
}

export function IncomeScreen({ navigation }) {
  const {
    displayValue,
    date,
    handleCategoryInput,
  } = useCalculator(); // Use useCalculator hook to access state and functions
  return (<View style={styles.container}>
    <View >
      <Text style={styles.displayDate}>{date}</Text>
    </View>
    <Display value={displayValue} />
    <TouchableOpacity style={styles.buttonCategory}>
      <Text style={styles.clearButtonText} onPress={() => navigation.navigate('Calculator')} >Calculation</Text>
    </TouchableOpacity>
    <View style={styles.buttonContainer}>

      <View style={styles.row}>
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.savings)} image={CATEGORY.savings} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.deposit)} image={CATEGORY.deposit} />
        <CategoryButton onPress={() => handleCategoryInput(CATEGORY.salary)} image={CATEGORY.salary} />
      </View>
    </View>
  </View>)
}

export function CalendarScreen({ navigator }) {
  return <Calendar />
}
const ClearAsyncStorageButton = () => {

  const { storageUpdated, setStorageUpdated } = useCalendar();
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      const initDates = ['13:4:2024'];
      await AsyncStorage.setItem(userId, JSON.stringify(initDates))
      setStorageUpdated(!storageUpdated);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <ClearButton onPress={clearAsyncStorage} text='Clear AsyncStorage' />
  );
};
export function CalculatorScreen({ navigation, isExpense }) {
  const {
    displayValue,
    date,
    handleNumberInput,
    handleOperatorInput,
    handleEqual,
    handleDot,
    handleClear,
  } = useCalculator(); // Use useCalculator hook to access state and functions
  const { updateRandomTime } = useCalendarTime();
  console.log('isExpense ' + isExpense);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.displayDate}>{date}</Text>
        <TouchableOpacity style={{
          flex: 1,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          elevation: 3,
          margin: 1,
          padding: 2,
        }}>
          <Text style={styles.clearButtonText} onPress={() => updateRandomTime()} >Set Random Time</Text>
        </TouchableOpacity>
      </View>
      <Display value={displayValue} />
      { isExpense ? ( <TouchableOpacity style={styles.buttonCategory}>
        <Text style={styles.clearButtonText}  onPress={() => navigation.navigate('Expense')} >Pick Category</Text> 
      </TouchableOpacity>) :

       ( <TouchableOpacity style={styles.buttonCategory}>
        <Text style={styles.clearButtonText}  onPress={() => navigation.navigate('Income')} >Pick Category</Text> 
      </TouchableOpacity>)
      }
      
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
          <OperatorButton onPress={() => handleDot()} text="." />
        </View>
        <ClearButton onPress={() => handleClear()} text="C" />
        <ClearAsyncStorageButton />
      </View>


    </View>
  );
}

