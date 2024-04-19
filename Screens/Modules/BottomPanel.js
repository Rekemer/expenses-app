import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions, SafeAreaView, Image } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const BottomPanelToggle = ({navigation}) => {
  const [isPanelVisible, setPanelVisible] = useState(false);
  const slideAnimation = new Animated.Value(1);

  const togglePanel = () => {
    if (isPanelVisible) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setPanelVisible(false));
    } else {
      setPanelVisible(true);
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const panelTranslateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  return (
    <View style={styles.container}>

      {/* Bottom Panel */}
      {isPanelVisible && (
        <Animated.View
          style={[styles.bottomPanel, { transform: [{ translateY: panelTranslateY }]}]}>
          {/* Close bottom panel button */}
          <TouchableOpacity onPress={togglePanel} style={[{alignSelf: 'center', height: 20, width: 100}]}>
            <Image style={[{height: 12, width: 20, resizeMode: 'stretch', alignSelf: 'center'}]} source={require('../../assets/ArrowDown.png')}/>
          </TouchableOpacity>
          
          {/* Content of the bottom panel*/}
          <SafeAreaView style={styles.bottomButtonWrapper}>
            <TouchableOpacity style={styles.bottomPanelButton} onPress={() => navigation.navigate('Calculator',{ isExpense: false })}>
              <Image style={[styles.bottomPanelButton, {resizeMode: 'stretch', position: 'absolute', top: -15, left: -15}]} source={require('../../assets/Add button.png')}></Image>
            </TouchableOpacity>
            <View style={styles.bottomBalancePanel}>
              <Text style={[{fontSize: 16, fontWeight: 'bold'}]}>Balance: </Text>
            </View>
            <TouchableOpacity style={styles.bottomPanelButton} onPress={() => navigation.navigate('Calculator',{ isExpense: true })}>
              <Image style={[styles.bottomPanelButton, {resizeMode: 'stretch', position: 'absolute', top: -15, left: -15}]} source={require('../../assets/Minus button.png')}></Image>
            </TouchableOpacity>
          </SafeAreaView>
        </Animated.View>
      )}

      {/* Toggle Button */}
      {!isPanelVisible && (
        <TouchableOpacity onPress={togglePanel} style={styles.toggleButton}>
          <Image style={[{height: 12, width: 20, resizeMode: 'stretch'}]} source={require('../../assets/ArrowUp.png')}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns items at the bottom
    alignItems: 'center',
  },
  mainContent: {
    flex: 1, // Takes up remaining space
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  mainText: {
    fontSize: 20,
  },
  bottomPanel: {
    flex: 1,
    flexDirection: 'column',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    position: 'absolute',
    bottom: 0,
    left: -screenWidth/2,
    right: 0,
    backgroundColor: '#d0d0d0',
    padding: 20,
    width: screenWidth,
  },
  panelText: {
    fontSize: 18,
  },
  toggleButton: {
    justifyContent: 'center',
    backgroundColor: 'grey',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomButtonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomPanelButton: {
    height: 48,
    width: 48,
    margin: 10,
    borderRadius: 50,
    
  },
  bottomBalancePanel: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  }
});

export default BottomPanelToggle;