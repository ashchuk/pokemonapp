import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import CameraComponent from "../components/CameraComponent";

export default function CameraScreen() {
  return (
      <CameraComponent/>
  );
}

CameraScreen.navigationOptions = {
  header: null,
};
