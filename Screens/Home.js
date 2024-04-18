import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image, SafeAreaView } from "react-native";
import { useState } from "react";
import PieChart from "react-native-pie-chart";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const Home = () => {
  const [categories, setCategories] = useState([
    { title: 'Food', sum: 322, color: "#666666", id: 'c1'},
    { title: 'Car', sum: 228, color: "#777777" , id: 'c2'},
    { title: 'Pets', sum: 1000, color: "#888888", id: 'c3'},
    { title: 'Sports', sum: 500, color: "#999999", id: 'c4'},
    { title: 'Health', sum: 78, color: "#AAAAAA", id: 'c5'},
  ])

  return (
    <SafeAreaView style={styles.wrapper}>
      <Chart categories={categories}></Chart>
      <FlatList
      style={[{width: screenWidth, height: 400, backgroundColor: '#ffffff'}]}
      renderItem={({item}) => <Item title={item.title} color={item.color} keyExtractor={item => item.id}/>}
      data={categories}
      />
      <View style={styles.bottomPanel}>
        <Pressable style={styles.bottomButton}>
          <Image style={styles.bottomButton} source={require('../assets/Minus button.png')} />
        </Pressable>
        <Pressable style={styles.bottomButton}>
          <Image style={styles.bottomButton} source={require('../assets/Add button.png')} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const Chart = ({ categories }) => {
  const widthAndHeight = 200;
  const cat = [...categories];
  const series = cat.map(x => x = x.sum);
  const colors = cat.map(x => x = x.color);

  return (
    <View style={[styles.container, {padding: 20}]}>
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

const Item = ({title, color}) => { // Fixed 'item' to 'Item'
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendCircle, {backgroundColor: color}]}></View> 
      <Text style={[{fontSize: 20}]}>{title}</Text>
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
    borderColor: 'red',
    borderWidth: 2,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  topCalendar: {
    marginTop: 20,
    flex: 1,
    position: 'absolute',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#cccccc",
    borderRadius: 12,
    height: 25,
    width: 300,
    overflow: "hidden",
  },
  topCalendarText: {
    fontWeight: "bold",
  },
  doughnut: {
    // position: "relative",
  },
  historylist: {
    margin: 10,
    borderTopWidth: 2,
    borderTopColor: "#bbbbbb",
    width: "auto",
    height: 50,
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
  bottomPanel: {
    // flex: 1,
    // flexShrink: 1,
    padding: 30,
    // flexGrow: 0,
    width: 300,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  bottomButton: {
    height: 50,
    width: 50,
  },
  legendItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  legendCircle: {
    height: 16,
    width: 16,
    borderRadius: 50,
    marginRight: 15,
  }
});

// export default Home;