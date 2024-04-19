import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions, SafeAreaView, Image } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const BottomPanelToggle = () => {
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
    outputRange: [400, 0],
  });

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainText}>Your main content here</Text>
      </View>

      {/* Bottom Panel */}
      {isPanelVisible && (
        <Animated.View
          style={[styles.bottomPanel, { transform: [{ translateY: panelTranslateY }]}]}>
          <TouchableOpacity onPress={togglePanel}>
            <Text style={styles.panelText}>Close Panel</Text>
          </TouchableOpacity>
          <SafeAreaView>
            <TouchableOpacity style={styles.bottomPanelButton}>
              <Image></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomPanelButton}>
              <Image ></Image>
            </TouchableOpacity>
          </SafeAreaView>
        </Animated.View>
      )}

      {/* Toggle Button */}
      {!isPanelVisible && (
        <TouchableOpacity onPress={togglePanel} style={styles.toggleButton}>
          <Text style={styles.buttonText}>Show Panel</Text>
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
    left: -100,
    right: 0,
    backgroundColor: '#e0e0e0',
    padding: 20,
    width: screenWidth,
  },
  panelText: {
    fontSize: 18,
  },
  toggleButton: {
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
  bottomPanelButton: {
    height: 50,
    width: 50,
    margin: 10,
  }
});

export default BottomPanelToggle;
