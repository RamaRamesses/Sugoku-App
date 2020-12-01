import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { useDispatch } from 'react-redux';
import getUserName from '../store/getUserName';
import fetchByDifficulty from '../store/fetchByDifficulty';

let radio_props = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' }
]
export default function Home ({ navigation }) {
  const [difficulty, setDifficulty] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  function handlePlayButton () {
    if (!name) {
      alert('Please enter your name.')
    } else {
      dispatch(fetchByDifficulty(difficulty))
      dispatch({
        type: 'WATCH_CHANGE',
        seed: [5]
      })
      dispatch(getUserName(name))
      navigation.navigate('Game');
    }
  }

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.gameTitle}>Sugoku</Text>
      <View>
        <Text style={{color: '#EEB736', textAlign: 'center', fontSize: 25}}>Enter your name:</Text>
        <TextInput
        style={{height: 40,marginBottom: 45, color: 'white', borderBottomColor: 'darkorange', borderBottomWidth: 3}}
        placeholder="Input your name here"
        value={name}
        onChangeText={(text) => setName(text)}
      />
        <Text style={{color: '#EEB736', textAlign: 'center'}}>Select Difficulty: </Text>
        <View>
          <RadioForm
            style={{marginTop: 10, justifyContent: 'center'}}
            radio_props={radio_props}
            initial={0}
            buttonColor={'#EEB736'}
            selectedButtonColor={'#EEB736'}
            selectedLabelColor={'#EEB736'}
            labelColor={'#EEB736'}
            labelHorizontal={false}
            animation={true}
            formHorizontal={true}
            onPress={(value) => setDifficulty(value)}
          />
        </View>
      </View>
      <View style={styles.buttons}>
          <Button title="PLAY" onPress={handlePlayButton} />
      </View>
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