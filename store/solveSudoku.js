import axios from 'axios';

export default function solveSudoku (payload) {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
    return async function (dispatch) {
        try {
            const response = await fetch ('https://sugoku.herokuapp.com/solve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encodeParams(payload)
            });
            const data = await response.json();
            dispatch({
                type: 'FETCH_BOARD',
                data: { board: data.solution }
            })
        } catch (err) {
            console.log(err);
        }
    }
}