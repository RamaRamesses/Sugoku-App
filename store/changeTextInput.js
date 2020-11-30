export default function changeTextInput (board, val, x, y) {
    return function (dispatch) {
        let newBoard = [...board];
        newBoard[y][x] = !val ? 0 : parseInt(val);
        dispatch({
            type: 'FETCH_BOARD',
            data: { board: newBoard }
        })
    }
}