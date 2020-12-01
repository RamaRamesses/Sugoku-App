import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Options from './Options';
import fetchEmptyBoard from '../store/fetchEmptyBoard';
import validateSudoku from '../store/validateSudoku';
import changeTextInput from '../store/changeTextInput';
import fetchByDifficulty from '../store/fetchByDifficulty'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';



export default function Board () {
  const board = useSelector(state => state.board);
  const status = useSelector(state => state.status);
  const name = useSelector(state => state.name);
  const watchChange = useSelector(state => state.watchChange);
  const [initialBoard, setInitialBoard] = useState([]);
  const [reservedCols, setReservedCols] = useState([]);
  const dispatch = useDispatch();

  function handleInputChange (text, x, y) {
    console.log(notEditable(y, x))
    dispatch(changeTextInput(board.board, text, x, y))
  }

  function generateDifficulty () {
    let output = [];
    setInitialBoard(rows)
    for(let y = 0; y < rows.length; y++) {
      for (let x = 0; x < rows[y].length; x++) {
        if(parseInt(rows[y][x]) > 0) {
          output.push([y, x])
        }
      }
    }
    setReservedCols(output);
  }

  useEffect(() => {
    if(board?.board) {
      generateDifficulty()
    }
  }, [watchChange])

  useEffect(() => {
    dispatch(validateSudoku(board))
  }, [board])

  function notEditable (y, x) {
    let result = false
    reservedCols.forEach(cols => {
      if (cols[0] == y && cols[1] == x) {
        result = true
      }
    })
    return result
  }

  console.log(name)
  let rows = board?.board
  if(!rows) {
  return <ActivityIndicator size="large" color="#0000ff" 
  style={{transform: [
    {
      translateY: 50
    }
  ]}} /> } else {
    return (
      <View>
          <View style={styles.board}>
            {
              rows.map((cols, y) => {
                return cols.map((blocks, x) => {
                  if (!notEditable(y, x)) {
                    return (
                      ((x > 2 && x < 6) && (y > 2 && y < 6)) || ((x < 3 || x > 5) && (y < 3 || y > 5)) ? (
                      <View key={x} style={[styles.blocks, styles.uniqueBlocks, {borderBottomColor: 'green', borderBottomWidth: 2.5, backgroundColor: 'darkorange'}]}>
                        <TextInput keyboardType="numeric" 
                        value={blocks > 0 ? blocks.toString() : ''} 
                        onChangeText={text => handleInputChange(text, x, y) } style={{fontSize: 25}} />
                      </View> ) : ( <View key={x} style={[styles.blocks, styles.regularBlocks, {borderBottomColor: 'green', borderBottomWidth: 2, backgroundColor: '#FFD500'}]}>
                        <TextInput keyboardType="numeric" 
                        value={blocks > 0 ? blocks.toString() : ''} 
                        onChangeText={text => handleInputChange(text, x, y) } style={{fontSize: 25}} />
                      </View> )
                    )
                  } else {
                    return (
                      ((x > 2 && x < 6) && (y > 2 && y < 6)) || ((x < 3 || x > 5) && (y < 3 || y > 5)) ? (
                      <View key={x} style={[styles.blocks, styles.uniqueBlocks]}>
                        <Text style={{fontSize: 25}}>{blocks > 0 ? blocks.toString() : ''}</Text>
                      </View> ) : ( <View key={x} style={[styles.blocks, styles.regularBlocks]}>
                        <Text style={{fontSize: 25}}>{blocks > 0 ? blocks.toString() : ''}</Text>
                      </View> )
                    )
                  }
                })
              })
            }
          </View>
        <Options status={status} board={initialBoard} generateDifficulty={generateDifficulty} />
      </View>
    )
  }
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
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    textAlign: 'center',
    paddingLeft: 10,
  },
  uniqueBlocks: {
    backgroundColor: '#EE7B38',
    borderColor: '#141518',
  },
  regularBlocks: {
    borderColor: '#771F03',
    backgroundColor: '#EEB736',
  },
  board: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '5%',
    maxWidth: 360
  }
});