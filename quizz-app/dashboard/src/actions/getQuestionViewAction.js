// Imports
import {openWebSocket} from "../reducers/websocket-reducer";

export const GET_QUESTION_VIEW_IS_LOADING = "GET_QUESTION_VIEW_IS_LOADING";

/**
 * Action creator for the GET_QUESTION_VIEW_IS_LOADING action
 *
 * @param {boolean} bool
 */
function getQuestionViewIsLoading(bool) {
  return {
    type: GET_QUESTION_VIEW_IS_LOADING,
    isLoading: bool
  };
}

export const GET_QUESTION_VIEW_SUCCESS = "GET_QUESTION_VIEW_SUCCESS";

/**
 * Action creator for the GET_QUESTION_VIEW_SUCCESS action
 *
 * @param {JSON} payload
 */
function getQuestionViewSuccess(payload) {
  return {
    type: GET_QUESTION_VIEW_SUCCESS,
    payload: payload
  };
}

export const GET_QUESTION_VIEW_FAILURE = "GET_QUESTION_VIEW_FAILURE";

/**
 * Action creator for the GET_QUESTION_VIEW_FAILURE action
 *
 * @param {boolean} bool
 */
function getQuestionViewFailure(bool) {
  return {
    type: GET_QUESTION_VIEW_FAILURE,
    hasErrored: bool
  };
}

/**
 * Async action creator
 * Sends openRoom request to /quizzes/start API endpoint
 * Depending on the result dispatches an action
 *
 * @param questionId
 */
export function getQuestionViewRequest(questionId) {
  return (dispatch) => {

    // Sets isLoading to true
    dispatch(getQuestionViewIsLoading(true));

    // Data and configuration of the post request
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    };

    fetch(`http://localhost:3000/questions/${questionId}`, options)
      .then(response => {
        dispatch(getQuestionViewIsLoading(false));
        return response.json()
      })
      .then(data => {
        dispatch(getQuestionViewSuccess(data));
        dispatch(openWebSocket());
      })
      .catch(() => dispatch(getQuestionViewFailure(true)))
  }
}
