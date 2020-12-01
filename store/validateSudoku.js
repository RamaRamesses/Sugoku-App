export default function validateSudoku (payload) {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
    return async function (dispatch) {
        try {
            const response = await fetch('https://sugoku.herokuapp.com/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encodeParams(payload)
            })
            const data = await response.json();
            dispatch({
                type: 'VALIDATE_STATUS',
                status: data.status
            })
        } catch (err) {
            console.log(err);
        }
    }
} 