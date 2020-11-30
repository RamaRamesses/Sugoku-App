export default function fetchData (difficulty) {
    return async function (dispatch) {
        try {
            console.log(difficulty)
            const response = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`);
            const data = await response.json();
            dispatch({
                type: 'FETCH_BOARD',
                data
            })
        } catch (err) {
            console.log(err);
        }
    }
}