// Imports
import {openWebSocket} from "../reducers/websocket-reducer";

export const GET_ANSWERED_QUESTION_IS_LOADING = "GET_ANSWERED_QUESTION_IS_LOADING";

/**
 * Action creator for the GET_ANSWERED_QUESTION_IS_LOADING action
 *
 * @param {boolean} bool
 */
function getAnsweredQuestionIsLoading(bool) {
  return {
    type: GET_ANSWERED_QUESTION_IS_LOADING,
    isLoading: bool
  };
}

export const GET_ANSWERED_QUESTION_SUCCESS = "GET_ANSWERED_QUESTION_SUCCESS";

/**
 * Action creator for the GET_ANSWERED_QUESTION_SUCCESS action
 *
 * @param {JSON} payload
 */
function getAnsweredQuestionSuccess(payload) {
  return {
    type: GET_ANSWERED_QUESTION_SUCCESS,
    payload: payload
  };
}

export const GET_ANSWERED_QUESTION_FAILURE = "GET_ANSWERED_QUESTION_FAILURE";

/**
 * Action creator for the GET_ANSWERED_QUESTION_FAILURE action
 *
 * @param {boolean} bool
 */
function getAnsweredQuestionFailure(bool) {
  return {
    type: GET_ANSWERED_QUESTION_FAILURE,
    hasErrored: bool
  };
}

/**
 * Async action creator
 * Sends openRoom request to /quizzes/start API endpoint
 * Depending on the result dispatches an action
 *
 * @param roomCode
 * @param questionId
 */
export function getAnsweredQuestionRequest(roomCode, questionId) {
  return (dispatch) => {

    // Sets isLoading to true
    dispatch(getAnsweredQuestionIsLoading(true));

    // Data and configuration of the post request
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    };

    fetch(`http://localhost:3000/currentQuiz/${roomCode}/AnswerQuestions/${questionId}`, options)
      .then(response => {
        dispatch(getAnsweredQuestionIsLoading(false));
        return response.json()
      })
      .then(data => {
        dispatch(getAnsweredQuestionSuccess(data));
        dispatch(openWebSocket());
      })
      .catch(() => dispatch(getAnsweredQuestionFailure(true)))
  }
}
