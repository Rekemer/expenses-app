import React, {createContext,useContext, useState ,useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userId} from './User'
import { getDay, getMonth } from './RandomtCalendarTime';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
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

// Sample data
const expensesData = [
  { id: 1, category: 'Food', amount: 20 },
  { id: 2, category: 'Food', amount: 30 },
  { id: 3, category: 'Bills', amount: 50 },
  { id: 4, category: 'Bills', amount: 70 },
];







export const Calendar = () => {
  const [mode, setMode] = useState('date'); // 'date' or 'category'
  const [expenses, setExpenses] = useState([]);
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
    //console.log("update list");
    const fetchExpenses = async () => {
      const datesJson = await AsyncStorage.getItem(userId);
      const dates = JSON.parse(datesJson);
      const keys = await AsyncStorage.getAllKeys();
      console.log('user dates ' + dates);
      var expenses = []
      // get all expenses of the user for all dates
      for (const date of dates) {
        // Retrieve expenses for the current date
        const expensesData = await retrieveExpenses(date);
        console.log('Expense data:',expensesData);
        expenses.push(...expensesData);
      }
      setExpenses(expenses );
    };

    fetchExpenses();
  }, [storageUpdated]);
  //console.log(expenses);
  //return (<ExpensesList/>);

  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };
  const renderExpense = ({ item }) => {
    return (<View style={{ marginLeft: 20 }}>
      <Text>{`Amount: $${item.displayValue}`}</Text>
      {mode === 'category' && (
  <   Text>Date: {item.date}</Text>
    )}
      {mode === 'date' && (
  <   Text>Category: {item.category}</Text>
    )}
    </View>);
    
    };
  const renderCategoryHeader = ({ item }) => {
    var isExpanded = false;
    if (mode === 'category')
    {
      isExpanded = item.category === expandedCategory;
    }
    else
    {
      isExpanded = item.date === expandedCategory;
    }
   // console.log('item date ' + item.date);
   // console.log('ex ' + expandedCategory);
    //console.log('isExpanded ' +isExpanded);
    return (
      <TouchableOpacity onPress={() => toggleCategory(mode  === 'date'? item.date :item.category )}>
        <Text>{mode === 'date' ? getDay(item.date) : item.category}</Text>
        {isExpanded && (
          <FlatList
            data={expenses.filter((expense) =>  mode === 'date' ?  
            expense.date === item.date : 
            expense.category === item.category)}
            renderItem={renderExpense}
            keyExtractor={(expense) => expense.id.toString()}
          />
        )}
      </TouchableOpacity>
    );
  };

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
      <View style={{ width: '100%', borderColor: 'red', borderWidth: 2 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {months.map((month, index) => (
          <TouchableOpacity key={index} onPress={() => handleMonthChange(index)}>
          <Text style={selectedMonth === index ? styles.activeMonth : styles.month}>{month}</Text>
        </TouchableOpacity>
       ))}
        </ScrollView>
      </View>

      <View style = {{ borderColor: 'red', borderWidth: 2 }}>
      <FlatList
      data= {expenses.reduce((acc, expense) => {
        const shouldRender = (selectedMonth + 1) === getMonth(expense.date);
        //console.log(selectedMonth);
        if (mode === 'category')
        {
           // so we have only unique headers 
          if (!acc.find((item) => item.category === expense.category)) {
            acc.push({ category: expense.category });
          }
        }
        else 
        {
         if ( shouldRender && !acc.find((item) => item.date === expense.date)) {
           acc.push({ date: expense.date });
          }
        }
        console.log(acc);
        return acc;
      }, [])}
      renderItem={renderCategoryHeader}
      keyExtractor={(item) => mode === 'date' ? item.date : item.category}
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

