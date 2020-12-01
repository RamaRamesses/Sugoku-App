import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Options from './Options';
import fetchEmptyBoard from '../store/fetchEmptyBoard';
import validateSudoku from '../store/validateSudoku';
import changeTextInput from '../store/changeTextInput';

export default function Board () {
  const board = useSelector(state => state.board);
  const status = useSelector(state => state.status);
  const dispatch = useDispatch();

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
          <View style={styles.board}>
            {
              rows.map((cols, y) => {
                return cols.map((blocks, x) => {
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
        <Options status={status} board={board} />
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
  }
});