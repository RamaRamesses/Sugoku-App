import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import store from './store';
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}
