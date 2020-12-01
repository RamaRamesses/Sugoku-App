import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
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
  if(!rows) return <ActivityIndicator size="large" color="#0000ff" 
  style={{transform: [
    {
      translateY: 50
    }
  ]}} />
    return (
      <View>
          <View style={styles.board}>
            {
              rows.map((cols, y) => {
                return cols.map((blocks, x) => {
                  return (
                    ((x > 2 && x < 6) && (y > 2 && y < 6)) || ((x < 3 || x > 5) && (y < 3 || y > 5)) ? ( <View key={x} style={styles.uniqueBlocks}>
                    <TextInput keyboardType="numeric" 
                    value={blocks > 0 ? blocks.toString() : ''} 
                    onChangeText={text => handleInputChange(text, x, y) } style={{fontSize: 25}} />
                  </View> ) : ( <View key={x} style={styles.blocks}>
                      <TextInput keyboardType="numeric" 
                      value={blocks > 0 ? blocks.toString() : ''} 
                      onChangeText={text => handleInputChange(text, x, y) } style={{fontSize: 25}} />
                    </View> )
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
    backgroundColor: '#EEB736',
    height: 36,
    width: 36,
    borderColor: '#771F03',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    textAlign: 'center',
    paddingLeft: 10,
    paddingTop: 5
  },
  uniqueBlocks: {
    backgroundColor: '#EE7B38',
    height: 36,
    width: 36,
    borderColor: '#141518',
    borderTopWidth: 1,
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
    maxWidth: 360
  }
});