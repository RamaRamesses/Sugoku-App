import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function reducer(state = { board: [], status: '' }, action) {
  switch (action.type) {
    case 'FETCH_BOARD':
      return { ...state, board: action.data }
    case 'VALIDATE_STATUS':
      return { ...state, status: action.status }
    default:
      return state
  }
}

let store = createStore(reducer, applyMiddleware(thunk))
export default store;