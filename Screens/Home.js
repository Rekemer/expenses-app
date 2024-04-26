import React, { Children, createContext, useContext, useEffect, version } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, RefreshControl, ScrollView } from "react-native";
import { useState, useRef } from "react";
import PieChart from "react-native-pie-chart";
import { Dimensions } from "react-native";
import BottomPanelToggle from "./Modules/BottomPanel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userId } from "../User";

const screenWidth = Dimensions.get("window").width;
// const [sorted, setSorted] = useState();
export const HomeScreenContext = createContext();


export const HomeScreenProvider = ({ children }) => {
  const [diagramUpdated, setDiagramUpdated] = useState(false);

  return (
    <HomeScreenContext.Provider
      value={{ diagramUpdated, setDiagramUpdated }}
    >
      {children}
    </HomeScreenContext.Provider>
  );
}

const categoryColors = [
  { category: "Food", color: "#3388ff" },
  { category: "Transport", color: "orange" },
  { category: "Health", color: "#ee1010" },
  { category: "Pets", color: "green" },
  { category: "Bills", color: "cyan" },
  { category: "Sports", color: "brown" },
  { category: "Taxi", color: "#eecc25" },
  { category: "Eating out", color: "magenta" },
  { category: "House", color: "pink" },
];


_retrieveData = async (userId) => {
  let retrievedExpenses = [];

  try {
    const value = await AsyncStorage.getItem(userId);
    if (value !== null) {
      const userDates = JSON.parse(value);
      console.log('user dates ' + userDates);

      const promises = userDates.map(async (date) => {
        let expense = await AsyncStorage.getItem(date);
        let expenseParsed = JSON.parse(expense);
        if (expenseParsed !== null) {
          expenseParsed.forEach((x) => { retrievedExpenses.push(x) });
        } else {
          console.log(`No expenses found for date: ${date}`);
        }
      });
      await Promise.all(promises);
    }
  } catch (error) {
    console.log("Error fetching data: ", error);
  }

  return retrievedExpenses;
};

// Sum up the expenses for categories and assign colors to them
const calculateCategorySum = (expenses, categoryColors, returnValue) => {
  const categorySum = {};
  let totalIncome = 0;
  let totalExpense = 0;
  // Calculate sum of expenses for each category
  // ------------------------------------
  expenses.forEach((expense) => {

    if (expense.IsExpense) {
      // Convert displayValue to a number
      const expenseAmount = parseFloat(expense.displayValue);
      console.log('Expense:', expense);
      console.log('Parsed displayValue:', expenseAmount);

      if (!isNaN(expenseAmount)) {

        if (!categorySum[expense.category]) {
          categorySum[expense.category] = 0;
        }
        console.log('Previous sum for category', expense.category, ':', categorySum[expense.category]);

        categorySum[expense.category] += expenseAmount;

        console.log('Updated sum for category', expense.category, ':', categorySum[expense.category]);
        totalExpense += expenseAmount;
        console.log('Total expense: ' + totalExpense);
      } else {
        console.warn(`Invalid displayValue for expense with ID ${expense.id}. Skipping.`);
      }
    } else {
      const incomeAmount = parseFloat(expense.displayValue);
      console.log('Total Income: ' + incomeAmount);

      totalIncome += incomeAmount;
    }
  });
  // ------------------------------------

  console.log('Final category sums:', categorySum);
  // Create array with category, sum, and color
  const categorySumArray = [];



  for (const categoryColor of categoryColors) {
    const category = categoryColor.category;
    const color = categoryColor.color;
    const sum = categorySum[category.toLowerCase()] || 0; // Use 0 if category not found
    categorySumArray.push({ category, sum, color });
  }

  switch (returnValue) {
    case 'expenses':
      return categorySumArray;
      break;
    case 'totalincome':
      return totalIncome;
      break;
    case 'totalexpense':
      return totalExpense;
      break;
    default:
      return 0;
  }

};



export const Home = ({ navigation }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // -----------------------------------------------------
  // -Saving data from Async Storage into 'expenses' array
  const [data, setData] = useState({ values: [], loading: true });
  const { diagramUpdated } = useContext(HomeScreenContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await _retrieveData(userId);
        const expenses = data.map(item => ({ ...item }));
        console.log(expenses);
        setData({ values: calculateCategorySum(expenses, categoryColors, 'expenses'), loading: false });
        setTotalIncome(calculateCategorySum(expenses, categoryColors, 'totalincome'));
        setTotalExpense(calculateCategorySum(expenses, categoryColors, 'totalexpense'));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [diagramUpdated]);

  const filteredData = data.values.filter(e => e.sum > 0);
  console.log(filteredData);



  // // Summing up the expenses for each category and assigning colors

  // -----------------------------------------------------

  return (
    <SafeAreaView style={styles.wrapper}>

      {<Chart categories={filteredData.length > 0 ? filteredData : [{ category: "None", color: "grey", sum: 1 }]}></Chart>}
      {filteredData.length > 0 ? (<FlatList
        style={[{ width: screenWidth, height: 400, borderTopColor: 'grey', borderTopWidth: 2, backgroundColor: '#eee', }]}
        renderItem={({ item }) => <Item title={item.category} color={item.color} sum={item.sum.toFixed(2)} keyExtractor={item => item.category} />}
        data={filteredData}
      />) : (<View style={styles.emptyPanel}><Text style={styles.emptyText}>No expenses currently</Text></View>)}
      <BottomPanelToggle navigation={navigation} incomebalance={(totalIncome-totalExpense)}/>

    </SafeAreaView>
  );
};

const Chart = ({ categories }) => {
  const widthAndHeight = 200;
  const cat = [...categories];
  const series = cat.map(x => x = x.sum);
  const colors = cat.map(x => x = x.color);

  return (
    <View style={[styles.container, { padding: 20, }]}>
      <PieChart style={styles.doughnut}
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={colors}
        coverRadius={0.65}
      />
    </View>
  );
}

const Item = ({ title, color, sum }) => {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendCircle, { backgroundColor: color }]}></View>
      <Text style={[{ fontSize: 20, color: 'black' }]}>{title}: €{sum}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    gap: 5,
    backgroundColor: "#dddddd",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  doughnut: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    width: screenWidth / 2,
    height: screenWidth / 2
    // position: "relative",
  },
  itemframe: {
    marginTop: 7,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#fff",
    width: 270,
    height: 60,
  },
  dateText: {
    fontSize: 16,
  },
  amountText: {
    fontWeight: 'bold',
  },
  bottomPanelButton: {
    height: 50,
    width: 50,
  },
  legendItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  legendCircle: {
    height: 16,
    width: 16,
    borderRadius: 50,
    marginRight: 15,
    borderColor: '#333333',
    borderWidth: 2
  },
  emptyPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    color: 'whitesmoke',
    fontSize: 16,
    fontWeight: '600'
  }
});