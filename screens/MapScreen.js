import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import MapComponent from "../components/MapComponent";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function MapScreen({ navigation }) {
  return (
    <MapComponent navigator={navigation}/>
  );
}

MapScreen.navigationOptions = {
  header: null,
};
