import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '../Calculator';


export default function LoginScreen({ navigation }) {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createTable();

  });

  const checkLogin = async () => {
    if (username.length == 0 || password.length == 0) {
      Alert.alert('Warning!', "Please, enter your username and password or sign up if you don't have an account");
    } else {
      try {

        // navigation.navigate('Home');
      } catch (error) {
        console.log('Login Error: ' + error);
      }
    }
  }

  const createUser = async () => {
    if (username.length == 0 || password.length == 0) {
      Alert.alert('Warning!', "Please, enter your username and password or sign up if you don't have an account");
    } else {
      const existingUser = await AsyncStorage.getItem(username);

      try {
        if (existingUser) {
          console.log('Error, user already exists.');
        } else {
          id = generateId();
          // What happens if user already exists
            const userData = {password, id};
            await AsyncStorage.setItem(username, JSON.stringify(userData));
            console.log('User ' + username + ' was successfully created.');
        }
        // navigation.navigate('Home');
      } catch (error) {
        console.log('Sign Up Error: ' + error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/adaptive-icon.png')} style={styles.imgicon}></Image>
      <Text style={styles.logoText}>Nihil Expense Tracker</Text>
      <TextInput style={styles.userInput} placeholder='Username' onChangeText={(value) => setUsername(value)}></TextInput>
      <TextInput style={styles.userInput} placeholder='Password' onChangeText={(value) => setPassword(value)}></TextInput>
      <TouchableOpacity style={[{margin: 5}]}><Text style={[{color: 'white'}]}>Login or Sign up</Text></TouchableOpacity>
      <View style={styles.loginButtonBox}>
        <TouchableOpacity style={styles.loginButton} onPress={checkLogin}><Text style={[{color: 'white'}]}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={createUser}><Text style={[{color: 'white'}]}>Sign Up</Text></TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    gap: 5,
  },
  body: {

  },
  logoText: {
    padding: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  imgicon: {
    width: 64,
    height: 64,
    padding: 80,
  },
  userInput: {
    padding: 10,
    borderRadius: 10,
    width: 300,
    borderWidth: 2,
    borderColor: '#555555',
    backgroundColor: '#ffffff'
  },
  loginButtonBox: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },
  loginButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#555555',
    
  }
})