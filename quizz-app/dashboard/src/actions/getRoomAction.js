// Imports
import {openWebSocket} from "../reducers/websocket-reducer";

export const GET_ROOM_IS_LOADING = "GET_ROOM_IS_LOADING";

/**
 * Action creator for the GET_ROOM_IS_LOADING action
 *
 * @param {boolean} bool
 */
function getRoomIsLoading(bool) {
  return {
    type: GET_ROOM_IS_LOADING,
    isLoading: bool
  };
}

export const GET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";

/**
 * Action creator for the GET_ROOM_SUCCESS action
 *
 * @param {JSON} payload
 */
function getRoomSuccess(payload) {
  return {
    type: GET_ROOM_SUCCESS,
    payload: payload
  };
}

export const GET_ROOM_FAILURE = "GET_ROOM_FAILURE";

/**
 * Action creator for the GET_ROOM_FAILURE action
 *
 * @param {boolean} bool
 */
function getRoomFailure(bool) {
  return {
    type: GET_ROOM_FAILURE,
    hasErrored: bool
  };
}

/**
 * Async action creator
 * Sends openRoom request to /quizzes/start API endpoint
 * Depending on the result dispatches an action
 *
 * @param roomCode
 */
export function getRoomRequest(roomCode) {
  return (dispatch) => {

    // Sets isLoading to true
    dispatch(getRoomIsLoading(true));

    // Data and configuration of the post request
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    };

    fetch(`http://localhost:3000/currentQuiz/${roomCode}`, options)
      .then(response => {
        dispatch(getRoomIsLoading(false));
        return response.json()
      })
      .then(data => {
        dispatch(getRoomSuccess(data));
        dispatch(openWebSocket());
      })
      .catch(() => dispatch(getRoomFailure(true)))
  }
}
