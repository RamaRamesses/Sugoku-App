export default function fetchData () {
    return async function (dispatch) {
        try {
            const response = await fetch('https://sugoku.herokuapp.com/board');
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