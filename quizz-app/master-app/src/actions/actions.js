// Import 
import { openWebSocket } from '../reducers/websocket-reducer'

const TOGGLE_LANG = "TOGGLE_LANG"
/**
 * Action creator fot the TOGGLE_LANG action
 * 
 * @param {String} currentLang 
 */
export function toggleLanuage(currentLang) {
    return {
        type: TOGGLE_LANG,
        payload: currentLang
    }
}

export const OPEN_ROOM_ISLOADING = "OPEN_ROOM_ISLOADING"
/**
 * Action creator for the OPEN_ROOM_ISLOADING action
 * 
 * @param {bool} bool 
 */
function openRoomIsloading(bool) {
    return {
        type: OPEN_ROOM_ISLOADING,
        isLoading: bool
    };
}

export const OPEN_ROOM_SUCCES = "OPEN_ROOM_SUCCES"
/**
 * Action creator for the OPEN_ROOM_SUCCES action
 * 
 * @param {JSON} payload 
 */
function openRoomSucces(payload) {
    return {
        type: OPEN_ROOM_SUCCES,
        payload: payload
    };
}

export const OPEN_ROOM_FAILURE = "OPEN_ROOM_FAILURE"
/**
 * Action creator for the OPEN_ROOM_FAILURE action
 * 
 * @param {bool} bool 
 */
function openRoomFailure(bool) {
    return {
        type: OPEN_ROOM_FAILURE,
        hasErrored: bool
    };
}

/**
 * Async action creator
 * Sends openroom request to /quizzes/start API endpoint
 * Depending on the result dispatches an action
 * 
 * @param {String} currentLang 
 */
export function openRoomRequest(currentLang) {
    return (dispatch) => {
 
        // Sets isLoading to true
        dispatch(openRoomIsloading(true))

        // Data and configuration of the post request
        const data = { "lang": currentLang };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(data)
        }

        // Fetch POST request on the quizzes/start API endpoint
        fetch('http://localhost:3000/currentQuiz/start', options)
        .then(response => {
            dispatch(openRoomIsloading(false))
            return response.json()
        })
        .then(data => {
            dispatch(openRoomSucces(data))
            dispatch(openWebSocket())
        })
        .catch(() => dispatch(openRoomFailure(true))) 
    }
}
