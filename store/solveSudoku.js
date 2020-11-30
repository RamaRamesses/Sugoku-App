import axios from 'axios';

export default function solveSudoku (payload) {
    console.log(payload.board, 'BOARD')
    return async function (dispatch) {
        try {
            const response = await fetch ('https://sugoku.herokuapp.com/solve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: '[[0,0,0,0,0,0,8,0,0],[0,0,4,0,0,8,0,0,9],[0,7,0,0,0,0,0,0,5],[0,1,0,0,7,5,0,0,8],[0,5,6,0,9,1,3,0,0],[7,8,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,0,0,9,3,0,0,1,0],[0,0,5,7,0,0,4,0,3]]'
            });
            const data = await response.json();
            console.log(data)
            dispatch({
                type: 'FETCH_BOARD',
                data: { board: data.solution }
            })
        } catch (err) {
            console.log(err);
        }
    }
}