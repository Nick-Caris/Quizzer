// Imports
import {produce} from 'immer';
import {ANSWER_QUESTION_FAILURE, ANSWER_QUESTION_ISLOADING, ANSWER_QUESTION_SUCCES} from "../actions/roundActions";

const InitialState = {
  status: 'Wait',
  isLoading: false,
  hasErrored: false,
  isUpdated: false,
  nextQuestion: false,
};

const sendAnswerReducer = produce((state, action) => {
  switch (action.type) {
    case ANSWER_QUESTION_SUCCES: {
      state.status = 'SUCCESS';
      state.isLoading = false;
      state.isUpdated = true;
      return state;
    }
    case ANSWER_QUESTION_FAILURE: {
      state.status = 'FAILED';
      state.isLoading = false;
      state.hasErrored = true;
      return state;
    }
    case ANSWER_QUESTION_ISLOADING: {
      state.status = 'ISLOADING';
      state.isLoading = true;
      return state;
    }
    default: {
      return state;
    }
  }

}, InitialState);

export default sendAnswerReducer;
