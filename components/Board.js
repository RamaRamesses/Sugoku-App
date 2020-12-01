import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import fetchEmptyBoard from '../store/fetchEmptyBoard';
import fetchByDifficulty from '../store/fetchByDifficulty';
import solveSudoku from '../store/solveSudoku';
import validateSudoku from '../store/validateSudoku';
import changeTextInput from '../store/changeTextInput';

export default function Board () {
  const board = useSelector(state => state.board);
  const status = useSelector(state => state.status);
  const dispatch = useDispatch();

  function handleSolveButton () { 
    dispatch(solveSudoku(board))
    alert('Sudoku has been solved automatically!')
  }

  function handleValidationButton () {
    console.log(status, 'status handler')
    alert(`Board status: ${status}`)
  }

  function generateDifficulty (difficulty) {
    dispatch(fetchByDifficulty(difficulty))
  }

  function handleInputChange (text, x, y) {
    dispatch(changeTextInput(board.board, text, x, y))
  }

  useEffect(() => {
    dispatch(fetchEmptyBoard())
  }, [])

  useEffect(() => {
    dispatch(validateSudoku(board))
  }, [board])

  let rows = board?.board
  if(!rows) return <Text>Wait</Text>
    return (
      <View>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text>Sudoku</Text>
          <View style={styles.board}>
            {
              rows.map((cols, y) => {
                return cols.map((blocks, x) => {
                  let a = 1;
                  // console.log(rows[0][5])
                  return (
                    <View key={x} style={styles.blocks}>
                      <TextInput keyboardType="numeric" 
                      value={blocks > 0 ? blocks.toString() : ''} 
                      onChangeText={text => handleInputChange(text, x, y) } />
                    </View>
                  )
                })
              })
            }
          </View>
        </View>
        <View style={styles.buttons}>
          <Button title="GENERATE EASY BOARD" onPress={() => generateDifficulty('easy')} />
          <Button title="Auto Solve" onPress={handleSolveButton} />
          <Button title="Validate" onPress={handleValidationButton} />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
   display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  blocks: {
    height: 36,
    width: 36,
    borderColor: 'gray',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    textAlign: 'center',
    paddingLeft: 10,
    paddingTop: 5
  },
  board: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '5%',
    maxWidth: 350
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});