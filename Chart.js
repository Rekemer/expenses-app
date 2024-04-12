import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";
import PieChart from 'react-native-pie-chart';

export default class Chart extends Component {
  render() {
    const widthAndHeight = 250;
    const series = [123, 321, 123, 789, 537];
    const sliceColor = ['#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd', '#eeeeee'];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Doughnut</Text>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
})