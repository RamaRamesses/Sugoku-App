export default function getUserName (name) {
    return function (dispatch) {
        dispatch({
            type: 'GET_NAME',
            name
        })
    }
}