// Imports
import {produce} from 'immer';
import {
  GET_ANSWERED_QUESTION_FAILURE,
  GET_ANSWERED_QUESTION_IS_LOADING,
  GET_ANSWERED_QUESTION_SUCCESS
} from "../actions/getAnsweredQuestionsAction";

const InitialState = {
  isLoading: false,
  hasErrored: false,
  isUpdated: false,
  hasLoaded: false,
  questionEnded: false,
  questionId: '',
};

const getAnsweredQuestionsReducer = produce((state, action) => {
  switch (action.type) {
    case GET_ANSWERED_QUESTION_IS_LOADING: {
      state.isLoading = true;
      return state;
    }
    case GET_ANSWERED_QUESTION_FAILURE: {
      state.hasErrored = true;
      return state;
    }
    case GET_ANSWERED_QUESTION_SUCCESS: {
      state.isLoading = false;
      state.hasErrored = false;
      state.isUpdated = false;
      state.hasLoaded = true;
      state.answers = action.payload;
      return state;
    }
    case 'UPDATE-ANSWERS': {
      state.questionId = action.questionId;
      state.isUpdated = true;
      state.questionEnded = false;
      return state;
    }
    case 'END-QUESTION': {
      state.isUpdated = true;
      state.questionEnded = true;
      return state;
    }
    default: {
      return state;
    }
  }

}, InitialState);

export default getAnsweredQuestionsReducer;

