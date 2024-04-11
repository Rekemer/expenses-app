import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';

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

export const Calendar = () => {
  const [mode, setMode] = useState('date'); // 'date' or 'category'

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{mode === 'date' ? item.date : item.category}</Text>
      <Text>${item.amount}</Text>
    </View>
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthChange = (index) => {
    setSelectedMonth(index);
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {months.map((month, index) => (
          <TouchableOpacity key={index} onPress={() => handleMonthChange(index)}>
            <Text style={selectedMonth === index ? styles.activeMonth : styles.month}>{month}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={expensesData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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

