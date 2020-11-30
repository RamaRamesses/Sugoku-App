export default function changeTextInput (board, val, x, y) {
    return function (dispatch) {
        if (!val) {
            val = 0;
        }
        let newBoard = [...board];
        newBoard[y][x] = parseInt(val);
        dispatch({
            type: 'FETCH_BOARD',
            data: { board: newBoard }
        })
    }
}