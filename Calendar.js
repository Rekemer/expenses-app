import React, {createContext,useContext, useState ,useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCalendarTime } from './RandomtCalendarTime';
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const expensesData = [
  { date: '2022-01-01', category: 'Food', amount: 20 },
  { date: '2022-01-01', category: 'Transportation', amount: 15 },
  { date: '2022-01-02', category: 'Food', amount: 25 },
  { date: '2022-01-02', category: 'Shopping', amount: 30 },
  // Add more expense data here
];

export const CalendarProvider = ({ children }) => {
  
  const [storageUpdated, setStorageUpdated] = useState(false);
  return (
    <CalendarContext.Provider
    value={{ storageUpdated, setStorageUpdated }}
    >
      {children}  
    </CalendarContext.Provider>
  );
  
}
const CalendarContext = createContext();
export const useCalendar = () => useContext(CalendarContext);
export const Calendar = () => {
  const [mode, setMode] = useState('date'); // 'date' or 'category'
  const [expenses, setExpenses] = useState([]);
  const renderItem = ({ item }) => {
    console.log('render item called ');
    const month = parseInt(item.date.split(':')[1], 10);
    const shouldRender = (selectedMonth+1) === month;
    console.log('selected ' + selectedMonth+1);
    console.log('item month '+ month);
    return shouldRender ? (
      <View style={styles.item}>
        <Text>{mode === 'date' ? item.date : item.category}</Text>
        <Text>${item.displayValue}</Text>
      </View>
    ) : null;

}
  const {randomDate} =useCalendarTime();
  console.log(randomDate);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthChange = (index) => {
    setSelectedMonth(index);
  };
  const retrieveExpenses = async (date) => {
    try {
      // Retrieve the JSON string from AsyncStorage
      const jsonString = await AsyncStorage.getItem(date);
      //console.log('json:', jsonString);
  
      // Parse the JSON string into a JavaScript object
      const data = JSON.parse(jsonString) || [];
  
      // Log or return the data object
      
      return data;
    } catch (error) {
      console.error('Error retrieving expense data:', error);
      return null;
    }
  };
  const {storageUpdated}= useCalendar();
  useEffect(() => {
    console.log("update list");
    const fetchExpenses = async () => {
      const expensesData = await retrieveExpenses('12:4:2024');
      console.log('Expense data:',expensesData);
      setExpenses(expensesData);
    };

    fetchExpenses();
  }, [storageUpdated]);
  //console.log(expenses);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setMode('date')}>
          <Text style={mode === 'date' ? styles.activeTab : styles.tab}>By Date</Text>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => setMode('category')}>
          <Text style={mode === 'category' ? styles.activeTab : styles.tab}>By Category</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {months.map((month, index) => (
          <TouchableOpacity key={index} onPress={() => handleMonthChange(index)}>
            <Text style={selectedMonth === index ? styles.activeMonth : styles.month}>{month}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    fontSize: 16,
    color: 'black',
  },
  activeTab: {
    fontSize: 16,
    color: 'blue',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  month: {
    fontSize: 16,
    color: 'black',
    marginRight: 20,
  },
  activeMonth: {
    fontSize: 16,
    color: 'blue',
    marginRight: 20,
  },
});

