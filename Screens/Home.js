import React, { useEffect, version } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView} from "react-native";
import { useState, useRef } from "react";
import PieChart from "react-native-pie-chart";
import { Dimensions } from "react-native";
import BottomPanelToggle from "./Modules/BottomPanel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userId } from "../User";

const screenWidth = Dimensions.get("window").width;

const categoryColors =[
  {category: "Food", color: "blue"},
  {category: "Transport", color: "yellow"},
  {category: "Health", color: "red"},
  {category: "Pets", color: "green"},
  {category: "Bills", color: "cyan"},
  {category: "Sports", color: "light-blue"},
  {category: "Taxi", color: "orange"},
  {category: "Eating-out", color: "magenta"},
];

let expenses = [];
let sortedCategories = [];
let allZero = false;

// useEffect(() => {
//   first

//   return () => {
//     second
//   }
// }, [third])


_retrieveData = async (userId) => {
  try {
    const value = await AsyncStorage.getItem(userId);
    if (value !== null) {
      
      const userDates = JSON.parse(value);
      console.log('user dates ' + userDates);
      
      userDates.forEach(async (date) => {
        let expense = await AsyncStorage.getItem(date);
        let expenseParsed = JSON.parse(expense);
        expenseParsed.forEach(x => expenses.push(x));
        console.log(expenses);
      });
    }
    
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

// Sum up the expenses for categories and assign colors to them
const calculateCategorySum = (expenses, categoryColors) => {
  const categorySum = {};
  // Calculate sum of expenses for each category
  expenses.forEach((expense) => {
    
    if (expense.isExpense) {
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
      } else {
        console.warn(`Invalid displayValue for expense with ID ${expense.id}. Skipping.`);
      }
    }
  });

  console.log('Final category sums:', categorySum);

  // Create array with category, sum, and color
  const categorySumArray = [];
  for (const categoryColor of categoryColors) {
    const category = categoryColor.category;
    const color = categoryColor.color;
    // problem here
    const sum = categorySum[category] || 0; // Use 0 if category not found
    categorySumArray.push({ category, sum, color });
  }

  return categorySumArray;
};

export const Home = ({navigation}) => {
  // Sample data
  const [categories, setCategories] = useState([
    { category: 'Food', sum: 322, color: "#666666"},
    { category: 'Car', sum: 228, color: "#777777"},
    { category: 'Pets', sum: 1000, color: "#888888"},
    { category: 'Sports', sum: 500, color: "#999999"},
    { category: 'Health', sum: 78, color: "#AAAAAA" },
  ])

  // -----------------------------------------------------
  // -Saving data from Async Storage into 'expenses' array
  _retrieveData(userId);
  console.log('All expenses: ' + expenses);
  // // Summing up the expenses for each category and assigning colors
  sortedCategories = calculateCategorySum(expenses, categoryColors);
  console.log(sortedCategories);
  // -----------------------------------------------------

  return (
    <SafeAreaView style={styles.wrapper}>
      <Chart categories={categories}></Chart>
      <FlatList
        style={[{ width: screenWidth, height: 400, borderTopColor: 'grey', borderTopWidth: 2, }]}
        renderItem={({ item }) => <Item title={item.category} color={item.color} keyExtractor={item => item.category} />}
        data={sortedCategories}
      />
      <BottomPanelToggle navigation={navigation}/>
    </SafeAreaView>
  );
};

const Chart = ({ categories }) => {
  const widthAndHeight = 200;
  const cat = [...categories];
  const series = cat.map(x => x = x.sum);
  const colors = cat.map(x => x = x.color);

  return (
    <View style={[styles.container, { padding: 20 }]}>
      <PieChart style={styles.doughnut}
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={colors}
        coverRadius={0.55}
        coverFill={'#FFF'}
      />
    </View>
  );
}

const Item = ({ title, color }) => {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendCircle, { backgroundColor: color }]}></View>
      <Text style={[{ fontSize: 20 }]}>{title}: %</Text>
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
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  doughnut: {
    // position: "relative",
  },
  itemframe: {
    marginVertical: 7,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#cccccc",
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
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center'
  },
  legendCircle: {
    height: 16,
    width: 16,
    borderRadius: 50,
    marginRight: 15,
  }
});