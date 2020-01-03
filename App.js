import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, SafeAreaView, ImageBackground } from 'react-native';
import Home from './assets/components/Home';
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')

const App = () => {


  return (
    <SafeAreaView>
      <ImageBackground source={{ uri: "https://i.stack.imgur.com/mLncE.jpg" }} style={styles.backgroundImage}>
        <Home />
      </ImageBackground>
    </SafeAreaView>
  );
}


export default App

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
