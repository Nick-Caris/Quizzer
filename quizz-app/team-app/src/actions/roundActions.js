// Imports

export const GET_QUESTION_ISLOADING = "GET_QUESTION_ISLOADING";

/**
 * Action creator for the GET_QUESTION_ISLOADING action
 *
 * @param {boolean} bool
 */
function getQuestionIsLoading(bool) {
  return {
    type: GET_QUESTION_ISLOADING,
    isLoading: bool
  };
}

export const GET_QUESTION_SUCCES = "GET_QUESTION_SUCCES";

/**
 * Action creator for the GET_QUESTION_SUCCES action
 *
 * @param {JSON} payload
 */
function getQuestionSucces(payload) {
  return {
    type: GET_QUESTION_SUCCES,
    payload: payload
  };
}

export const GET_QUESTION_FAILURE = "GET_QUESTION_FAILURE";

/**
 * Action creator for the GET_QUESTION_FAILURE action
 *
 * @param {boolean} bool
 */
function getQuestionFailure(bool) {
  return {
    type: GET_QUESTION_FAILURE,
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
export function getQuestionRequest(questionId) {
  return (dispatch) => {

    // Sets isLoading to true
    dispatch(getQuestionIsLoading(true));

    // Data and configuration of the get request
    const options = {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(`http://localhost:3000/questions/teamQuestion/${questionId}`, options)
      .then(response => {
        dispatch(getQuestionIsLoading(false));
        return response.json()
      })
      .then(data => {
        dispatch(getQuestionSucces(data));
      })
      .catch(() => dispatch(getQuestionFailure(true)))
  }
}

export const ANSWER_QUESTION_ISLOADING = "ANSWER_QUESTION_ISLOADING";

/**
 * Action creator for the ANSWER_QUESTION_ISLOADING action
 *
 * @param {boolean} bool
 */
function answerQuestionIsLoading(bool) {
  return {
    type: ANSWER_QUESTION_ISLOADING,
    isLoading: bool
  };
}

export const ANSWER_QUESTION_SUCCES = "ANSWER_QUESTION_SUCCES";

/**
 * Action creator for the ANSWER_QUESTION_SUCCES action
 *
 * @param {JSON} payload
 */
function answerQuestionSucces(payload) {
  return {
    type: ANSWER_QUESTION_SUCCES,
    payload: payload
  };
}

export const ANSWER_QUESTION_FAILURE = "ANSWER_QUESTION_FAILURE";

/**
 * Action creator for the ANSWER_QUESTION_FAILURE action
 *
 * @param {boolean} bool
 */
function answerQuestionFailure(bool) {
  return {
    type: ANSWER_QUESTION_FAILURE,
    hasErrored: bool
  };
}

/**
 * Async action creator
 * Sends openRoom request to /quizzes/start API endpoint
 * Depending on the result dispatches an action
 *
 * @param data
 * @param roomCode
 */
export function answerQuestionRequest(data, roomCode) {
  return (dispatch) => {

    // Sets isLoading to true
    dispatch(answerQuestionIsLoading(true));

    // Data and configuration of the get request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/currentQuiz/${roomCode}/addAnswerQuestion`, options)
      .then(response => {
        dispatch(answerQuestionIsLoading(false));
        return response.json()
      })
      .then(data => {
        dispatch(answerQuestionSucces(data));
      })
      .catch(() => dispatch(answerQuestionFailure(true)))
  }
}

