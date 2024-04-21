import React, { version } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView} from "react-native";
import { useState, useRef } from "react";
import PieChart from "react-native-pie-chart";
import { Dimensions } from "react-native";
import BottomPanelToggle from "./Modules/BottomPanel";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

_retrieveData = async (categories) => {
  try {
    const value = await AsyncStorage.getItem(categories.category);
    if (value !== null) {
      // We have data!!
      console.log(value);
      // Save data into expenses array
      expenses.push(value);
    }
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

const convertData = (expenses) => {
  const categoryData = {};
  
  expenses.forEach((expense) => {
    const {date, category, displayValue, id, IsExpense} = expense;
    if (categoryData[category] && IsExpense) {
      categoryData[category] += displayValue;
    } else if (categoryData[category] && !IsExpense) {

    } else {
      categoryData[category] == displayValue;
    }
  });

  const result = Object.keys(categoryData).map((category) => ({
    category,
    sum: categoryData[category],
  }));

  return result;
};

const convertColors = ([categoryColors, categoryData]) => {
  categoryData = categoryData.map((expense) => {
    const categoryColor = categoryColors.find((item) => item.category == expense.category);
    expense.color = categoryColor ? categoryColor.color : '#black';
  });
};

export const Home = ({navigation}) => {
  // Sample data
  const [categories, setCategories] = useState([
    { category: 'Food', sum: 322, color: "#666666", id: 'c1' },
    { category: 'Car', sum: 228, color: "#777777", id: 'c2' },
    { category: 'Pets', sum: 1000, color: "#888888", id: 'c3' },
    { category: 'Sports', sum: 500, color: "#999999", id: 'c4' },
    { category: 'Health', sum: 78, color: "#AAAAAA", id: 'c5' },
  ])

  // -----------------------------------------------------
  // -Saving data from Async Storage into 'expenses' array
  // _retrieveData(categoryColors);
  // // Summing up the expenses for each category 
  // sortedCategories = convertData(expenses);
  // // Assigning colors to each category
  // convertColors([categoryColors, sortedCategories]);
  // -----------------------------------------------------

  return (
    <SafeAreaView style={styles.wrapper}>
      <Chart categories={categories}></Chart>
      <FlatList
        style={[{ width: screenWidth, height: 400, borderTopColor: 'grey', borderTopWidth: 2, }]}
        renderItem={({ item }) => <Item title={item.category} color={item.color} keyExtractor={item => item.id} />}
        data={categories}
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