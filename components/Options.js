import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import fetchByDifficulty from '../store/fetchByDifficulty';
import solveSudoku from '../store/solveSudoku';

export default function Options ({ status, board }) {

  const dispatch = useDispatch();

  function handleSolveButton () { 
    dispatch(solveSudoku(board))
    alert('Sudoku has been solved automatically!')
  }

  function handleValidationButton () {
    alert(`Board status: ${status}`)
  }

  function generateDifficulty (difficulty) {
    dispatch(fetchByDifficulty(difficulty))
  }

  return (
    <View style={styles.buttons}>
      <Button title="GENERATE EASY" onPress={() => generateDifficulty('easy')}  />
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
  }
});