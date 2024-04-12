import React from "react";
import {View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import Chart from "./Chart";

export const Home = () => {
  const [expese, setExpense] = useState([
    {date: '11.04.2024', amount: '20', key: '1'},
    {date: '10.04.2024', amount: '10', key: '2'},
    {date: '9.04.2024', amount: '10', key: '3'},
    {date: '9.04.2024', amount: '10', key: '4'},
    {date: '9.04.2024', amount: '10', key: '5'},
    {date: '9.04.2024', amount: '10', key: '6'},
    {date: '9.04.2024', amount: '10', key: '7'},
    {date: '9.04.2024', amount: '10', key: '8'},
    {date: '9.04.2024', amount: '10', key: '9'},
    {date: '9.04.2024', amount: '10', key: '10'},
  ])

  return(
    <View style={styles.wrapper}>
      <Chart></Chart>
      <FlatList style={styles.historylist} data = {expese} renderItem={({item}) => (
        <View style={styles.itemframe}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.amountText}>{item.amount}$</Text>
        </View>
      )}/>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderColor: 'red',
    borderWidth: 10,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  historylist: {

    margin: 10,
    borderTopWidth: 2,
    borderTopColor: "#bbbbbb",
    width: "auto",
    height: 100,
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
});

// export default Home;