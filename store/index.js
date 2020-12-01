import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function reducer(state = { board: [], status: '', name: '', watchChange: [] }, action) {
  switch (action.type) {
    case 'FETCH_BOARD':
      return { ...state, board: action.data, watchChange: action.seed }
    case 'VALIDATE_STATUS':
      return { ...state, status: action.status }
    case 'GET_NAME':
      return { ...state, name: action.name }
    case 'WATCH_CHANGE':
      return { ...state, watchChange: Math.random() }
    default:
      return state
  }
}

let store = createStore(reducer, applyMiddleware(thunk))
export default store;