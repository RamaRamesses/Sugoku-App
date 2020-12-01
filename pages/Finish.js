import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Board from '../components/Board';
import { createStackNavigator } from '@react-navigation/stack';

export default function Finish () {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.gameTitle}>Congratulations!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  gameTitle: {
    marginTop: 0,
    fontSize: 50,
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