// Imports
import {openWebSocket} from "../reducers/websocket-reducer";

export const ENTER_ROOM_ISLOADING = "ENTER_ROOM_ISLOADING";

/**
 * Action creator for the ENTER_ROOM_ISLOADING action
 *
 * @param {boolean} bool
 */
function enterRoomIsLoading(bool) {
  return {
    type: ENTER_ROOM_ISLOADING,
    isLoading: bool
  };
}

export const ENTER_ROOM_SUCCES = "ENTER_ROOM_SUCCES";

/**
 * Action creator for the ENTER_ROOM_SUCCES action
 *
 * @param {JSON} payload
 */
function enterRoomSucces(payload) {
  return {
    type: ENTER_ROOM_SUCCES,
    payload: payload
  };
}

export const ENTER_ROOM_FAILURE = "ENTER_ROOM_FAILURE";

/**
 * Action creator for the ENTER_ROOM_FAILURE action
 *
 * @param {boolean} bool
 */
function enterRoomFailure(bool) {
  return {
    type: ENTER_ROOM_FAILURE,
    hasErrored: bool
  };
}

/**
 * Async action creator
 * Sends openRoom request to /quizzes/start API endpoint
 * Depending on the result dispatches an action
 *
 * @param {object} data
 * @param callback
 */
export function enterRoomRequest(data, callback) {
  return (dispatch) => {

    // Sets isLoading to true
    dispatch(enterRoomIsLoading(true));

    // Data and configuration of the post request
    const sendData = {'name': data.name};
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(sendData)
    };

    fetch(`http://localhost:3000/currentQuiz/${data.roomCode}/team`, options)
      .then(response => {
        dispatch(enterRoomIsLoading(false));
        return response.json()
      })
      .then(data => {
        dispatch(enterRoomSucces(data));
        dispatch(openWebSocket());
        callback();
      })
      .catch(() => dispatch(enterRoomFailure(true)))
  }
}
