import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Board from '../components/Board';
import { createStackNavigator } from '@react-navigation/stack';


export default function Game () {


  return (
    <View style={styles.container}>
      <Board />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    transform: [{
      translateY: 0
    }],
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
})