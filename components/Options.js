import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import fetchByDifficulty from '../store/fetchByDifficulty';
import solveSudoku from '../store/solveSudoku';

export default function Options ({ status, board, generateDifficulty }) {

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
      break;
      default:
        message = 'Validation failed! the sudoku has not been solved'
    }
    alert(message)
  }

  return (
    <View style={styles.fixToText}>
      <Button title="Auto Solve" onPress={handleSolveButton} />
      <Button title="Validate" onPress={handleValidationButton} />
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