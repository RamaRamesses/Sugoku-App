import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function reducer(state = { board: [], status: '', leaderboard: {}, watchChange: [], currentUser: '' }, action) {
  switch (action.type) {
    case 'FETCH_BOARD':
      return { ...state, board: action.data, watchChange: action.seed }
    case 'VALIDATE_STATUS':
      return { ...state, status: action.status }
    case 'GET_NAME':
      return { ...state, currentUser: action.name }
    case 'SET_SCORE':
      let newLeaderboard = {...state.leaderboard};
      newLeaderboard[action.user] = action.score
      console.log(newLeaderboard)
      return { ...state, leaderboard: newLeaderboard }
    case 'WATCH_CHANGE':
      return { ...state, watchChange: Math.random() }
    default:
      return state
  }
}

let store = createStore(reducer, applyMiddleware(thunk))
export default store;