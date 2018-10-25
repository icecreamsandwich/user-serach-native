/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import HomeScreen from  './screens/HomeScreen';
import DetailScreen from  './screens/DetailScreen';
import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  DetailScreen: { screen: DetailScreen,
    navigationOptions: {
      headerTitle: 'Details'
    }
   },
});

export default App;
