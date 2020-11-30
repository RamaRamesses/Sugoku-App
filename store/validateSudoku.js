export default function validateSudoku (payload) {
    return async function (dispatch) {
        try {
            const response = await fetch('https://sugoku.herokuapp.com/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: '[[1,9,2,3,5,7,8,4,6],[5,3,4,1,6,8,7,2,9],[6,7,8,2,4,9,1,3,5],[4,1,3,6,7,5,2,9,8],[2,5,6,8,9,1,3,7,4],[7,8,9,4,2,3,6,5,1],[3,2,1,5,8,4,9,6,7],[8,4,7,9,3,6,5,1,2],[9,6,5,7,1,2,4,8,3]]'
            })
            const data = await response.json();
            console.log(data.status)
            dispatch({
                type: 'VALIDATE_STATUS',
                status: data.status
            })
        } catch (err) {
            console.log(err);
        }
    }
} 