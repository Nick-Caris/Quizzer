// Imports
import {produce} from 'immer';
import {GET_QUESTION_FAILURE, GET_QUESTION_ISLOADING, GET_QUESTION_SUCCES} from "../actions/roundActions";

const InitialState = {
  status: 'Wait',
  isLoading: false,
  hasErrored: false,
  isUpdated: false,
  ended: false,
  stop: false,
};

const questionReducer = produce((state, action) => {
  switch (action.type) {
    case GET_QUESTION_SUCCES: {
      state.status = 'SUCCESS';
      state.isLoading = false;
      state.isUpdated = false;
      state.question = action.payload;
      return state;
    }
    case GET_QUESTION_FAILURE: {
      state.status = 'FAILED';
      state.isLoading = false;
      state.hasErrored = true;
      return state;
    }
    case GET_QUESTION_ISLOADING: {
      state.status = 'ISLOADING';
      state.isLoading = true;
      return state;
    }
    case 'START-QUESTION': {
      state.isUpdated = true;
      state.ended = false;
      return state;
    }
    case 'QUESTION-ENDED': {
      state.ended = true;
      return state;
    }
    case 'QUIZ-ENDED': {
      state.stop = true;
      return state;
    }
    default: {
      return state;
    }
  }

}, InitialState);

export default questionReducer;
