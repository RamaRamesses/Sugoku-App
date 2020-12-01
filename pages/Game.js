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
    transform: [{
      translateY: 80
    }],
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})