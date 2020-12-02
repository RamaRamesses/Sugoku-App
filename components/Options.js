import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import fetchByDifficulty from '../store/fetchByDifficulty';
import solveSudoku from '../store/solveSudoku';

export default function Options ({ status, board, navigation }) {

  const dispatch = useDispatch();

  function handleSolveButton () { 
    dispatch(solveSudoku(board))
    alert('Sudoku has been solved automatically!')
  }

  function handleValidationButton () {
    let message = '';
    switch(status) {
      case 'solved':
        message = 'Congratulations! You have solved the sudoku!'
        navigation.navigate('Finish')
        dispatch({
          type: 'FETCH_BOARD',
          data: []
        })
      break;
      default:
        message = 'Validation failed! the sudoku has not been solved'
    }
    alert(message)
  }

  function handleGiveUpButton () {
    navigation.navigate('Home')
    dispatch({
      type: 'FETCH_BOARD',
      data: []
    })
  }

  return (
    <View style={styles.fixToText}>
      <Button color="orange" title="Auto Solve" onPress={handleSolveButton} />
      <Button color="orange" title="Validate" onPress={handleValidationButton} />
      <Button color="orange" title="Give Up" onPress={handleGiveUpButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  }
});