import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Options from './Options';
import fetchEmptyBoard from '../store/fetchEmptyBoard';
import validateSudoku from '../store/validateSudoku';
import changeTextInput from '../store/changeTextInput';
import fetchByDifficulty from '../store/fetchByDifficulty'
import CountDown from 'react-native-countdown-component';
import { diff } from 'react-native-reanimated';
import {
  useFonts,
  Gugi_400Regular,
} from '@expo-google-fonts/gugi'

export default function Board ({navigation}) {
  const board = useSelector(state => state.board);
  const status = useSelector(state => state.status);
  const name = useSelector(state => state.name);
  const watchChange = useSelector(state => state.watchChange);
  const difficulty = useSelector(state => state.difficulty);
  const [initialBoard, setInitialBoard] = useState([]);
  const [reservedCols, setReservedCols] = useState([]);
  let [timer, setTimer] = useState(600);
  const dispatch = useDispatch();

  function handleInputChange (text, x, y) {
    console.log(notEditable(y, x))
    dispatch(changeTextInput(board.board, text, x, y))
  }

  let [fontsLoaded] = useFonts({
    Gugi_400Regular,
  });

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

  function handleTimeout () {
    alert('Time out! Too bad you havent validate yet, go ahead and try again!')
    navigation.navigate('Home')
  }

  let rows = board?.board
  if(!rows) {
  return <ActivityIndicator size="large" color="#0000ff" 
  style={{transform: [
    {
      translateY: 0
    }
  ]}} /> } else {
    return (
      <View>
        <CountDown
        until={timer}
        size={30}
        onChange={(time) => setTimer(time)}
        onFinish={handleTimeout}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
          <View style={styles.board}>
            {
              rows.map((cols, y) => {
                return cols.map((blocks, x) => {
                  if (!notEditable(y, x)) {
                    return (
                      ((x > 2 && x < 6) && (y > 2 && y < 6)) || ((x < 3 || x > 5) && (y < 3 || y > 5)) ? (
                      <View key={x} style={[styles.blocks, styles.uniqueBlocks, {borderBottomColor: 'green', backgroundColor: 'darkorange', textAlign: 'center', paddingLeft: 10}]}>
                        <TextInput keyboardType="numeric" 
                        value={blocks > 0 ? blocks.toString() : ''} 
                        onChangeText={text => handleInputChange(text, x, y) } style={{fontSize: 25, fontFamily: 'Gugi_400Regular', marginTop: '20%'}} />
                      </View> ) : ( <View key={x} style={[styles.blocks, styles.regularBlocks, {borderBottomColor: 'green', backgroundColor: 'orange', textAlign: 'center', paddingLeft: 10}]}>
                        <TextInput keyboardType="numeric" 
                        value={blocks > 0 ? blocks.toString() : ''} 
                        onChangeText={text => handleInputChange(text, x, y) } style={{fontSize: 25, fontFamily: 'Gugi_400Regular'}} />
                      </View> )
                    )
                  } else {
                    return (
                      ((x > 2 && x < 6) && (y > 2 && y < 6)) || ((x < 3 || x > 5) && (y < 3 || y > 5)) ? (
                      <View key={x} style={[styles.blocks, styles.uniqueBlocks]}>
                        <Text style={{fontFamily: 'Gugi_400Regular', fontSize: 22, maxWidth: '95%', maxHeight:'95%', marginTop: '23%', textAlign: 'center', color: 'darkred'}}>{blocks > 0 ? blocks.toString() : ''}</Text>
                      </View> ) : ( <View key={x} style={[styles.blocks, styles.regularBlocks]}>
                        <Text style={{fontFamily: 'Gugi_400Regular', fontSize: 22, maxWidth: '95%', maxHeight:'95%', marginTop: '23%', color: 'darkred', textAlign: 'center'}}>{blocks > 0 ? blocks.toString() : ''}</Text>
                      </View> )
                    )
                  }
                })
              })
            }
          </View>
        <Options navigation={navigation} status={status} board={initialBoard} time={timer} />
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
  },
  uniqueBlocks: {
    backgroundColor: 'darkorange',
    borderColor: '#141518',
  },
  regularBlocks: {
    borderColor: '#771F03',
    backgroundColor: 'orange',
  },
  board: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '5%',
    maxWidth: 360
  },
  reservedBorder: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderLeftColor: 'black',
  }
});