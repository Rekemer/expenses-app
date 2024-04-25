import { useCalendar, Calendar } from './Calendar';
import { useCalendarTime } from './RandomtCalendarTime';
import { CATEGORY } from './Categories';
import { userId } from './User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCalculator } from './Calculator';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image, Dimensions }
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
      <Text style={styles.clearButtonText} onPress={() => navigation.goBack()} >Calculation</Text>
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
      <Text style={styles.clearButtonText} onPress={() => navigation.goBack()} >Calculation</Text>
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

export function ApiScreen({ navigator }) {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    // Fetch exchange rates from an API
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(Object.entries(data.rates));
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const renderExchangeRate = ({ item }) => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: '100%',
    }}>
      <Text>{item[0]}:</Text>
      <Text>{item[1]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exchangeRates}
        renderItem={renderExchangeRate}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
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
    <ClearButton onPress={clearAsyncStorage} text='Clear All Records' />
  );
};
export function CalculatorScreen({ route, navigation }) {
  const {
    displayValue,
    date,
    handleNumberInput,
    handleOperatorInput,
    handleEqual,
    handleDot,
    handleClear,
  } = useCalculator(); // Use useCalculator hook to access state and functions
  const { isExpense } = route.params;
  const { updateRandomTime } = useCalendarTime();
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.displayDate, { padding: 10 }]}>{date}</Text>
        <TouchableOpacity style={{
          flex: .8,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          elevation: 3,
          margin: 10,
          padding: 5,
        }}>
          <Text style={[styles.clearButtonText]} onPress={() => updateRandomTime()} >Set Random Time</Text>
        </TouchableOpacity>
      </View>
      <Display value={displayValue} />

      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8}}>
        <ClearAsyncStorageButton />
        <Image style={{width: 24, height: 24, bottom: 5}} source={require('./assets/warning.png')} />
      </View>

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
        {isExpense ? (<TouchableOpacity style={[styles.buttonCategory]}>
          <Text style={[styles.clearButtonText, { padding: 10 }]} onPress={() => navigation.navigate('Expense')} >Pick Category</Text>
        </TouchableOpacity>) :

          (<TouchableOpacity style={styles.buttonCategory}>
            <Text style={[styles.clearButtonText, { padding: 10 }]} onPress={() => navigation.navigate('Income')} >Pick Category</Text>
          </TouchableOpacity>)
        }
      </View>
    </View>
  );
}

