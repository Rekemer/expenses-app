import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";
import PieChart from 'react-native-pie-chart';

export default function Chart({categories}) {

    const widthAndHeight = 200;
    const cat = [...categories];
    const series = cat.map(x => x = x.sum);
    const colors = cat.map(x => x = x.color);

    return (
      <View style={styles.container}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={colors}
          coverRadius={0.55}
          coverFill={'#FFF'}
        />
      </View>
    );
  
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