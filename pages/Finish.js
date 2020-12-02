import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import Board from '../components/Board';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useFonts,
  Gugi_400Regular,
} from '@expo-google-fonts/gugi'

export default function Finish ({ navigation }) {
  const name = useSelector(state => state.currentUser);
  const users = useSelector(state => state.leaderboard);
  let leaderboard = [];
  let [fontsLoaded] = useFonts({
    Gugi_400Regular,
  });

  function displayLeaderboard () {
    for(let props in users) {
      leaderboard.push([props, users[props]])
    }
    for(let r = 0; r < leaderboard.length; r++) {
      for(let i = 0; i < leaderboard.length; i++) {
        let index = i
        let tempSwap = []
        for(let j = i + 1; j < leaderboard.length; j++) {
          if(leaderboard[j][1] > leaderboard[i][1]) {
            index = j
          }
        }
        tempSwap = leaderboard[index];
        leaderboard[index] = leaderboard[i];
        leaderboard[i] = tempSwap;
      }
    }
    console.log(leaderboard)
  }

  displayLeaderboard();

  function handleButtonPressed () {
    navigation.navigate('Home')
  }

  if(!fontsLoaded) return <ActivityIndicator size="large" color="#0000ff" 
  style={{transform: [
    {
      translateY: 0
    }
  ]}} />
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.gameTitle}>Leaderboard :</Text>
      <ScrollView style={{marginBottom: 25}}>
        {
          leaderboard.map((user, i) => {
            return (
              <View style={styles.leaderboard} key={i}>
                <Text style={{color: '#EEB736', fontSize: 20, textAlign: 'left', marginBottom: 5, fontFamily: 'Gugi_400Regular'}}>{i+1}. Name: {user[0]}</Text>
                <Text style={{color: 'yellow', fontSize: 20, textAlign: 'left', marginBottom: 25,fontFamily: 'Gugi_400Regular'}}>Time: Solved in {Math.abs(user[1]-600)} seconds</Text>
              </View>
            )
          })
        }
      </ScrollView>
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
    fontSize: 35,
    marginBottom: 25,
    color: 'orange',
    fontFamily: 'Gugi_400Regular',
    textAlign: 'left'
  },
  leaderboard: {
    display: 'flex',
    color: '#EEB736',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
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
    backgroundColor: 'black',
    padding: 50
  },
  buttons: {
    width: '50%'
  },
})