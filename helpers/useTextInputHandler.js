import { useState } from "react";

export default function useTextInputHandler () {
    const [boardHandler, setBoard] = useState({board: []})
    function inputHandler (board, event, x, y) {
        let newBoard = [ ...board ];
        newBoard[y][x] = event.target.value;
        console.log(newBoard, 'newBoard')
        console.log(event.target.value)
        setBoard(board => ({ ...board, board: newBoard }))
    }
    return { boardHandler, inputHandler }
}