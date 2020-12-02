import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Board from '../components/Board';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

export default function Finish ({ navigation }) {
  const name = useSelector(state => state.name)

  function handleButtonPressed () {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.gameTitle}>Congratulations! {name}</Text>
      <Button
        title="Back to home"
        labelC
        color="orange"
        accessibilityLabel="Back to home"
        onPress={handleButtonPressed}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  gameTitle: {
    marginTop: 0,
    fontSize: 25,
    marginBottom: 50,
    color: '#EEB736',
    fontFamily: 'Roboto'
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    transform: [
      {
        translateY: 0
      }
    ],
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  buttons: {
    width: '50%'
  }
})