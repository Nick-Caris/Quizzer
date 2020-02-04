// Imports
import {produce} from 'immer';
import {
  GET_QUESTION_VIEW_FAILURE,
  GET_QUESTION_VIEW_IS_LOADING,
  GET_QUESTION_VIEW_SUCCESS
} from "../actions/getQuestionViewAction";

const InitialState = {
  isLoading: false,
  hasErrored: false,
  isUpdated: false,
  hasLoaded: false,
  question: '',
  questionId: '',
};

const getQuestionViewReducer = produce((state, action) => {
  switch (action.type) {
    case GET_QUESTION_VIEW_IS_LOADING: {
      state.isLoading = true;
      return state;
    }
    case GET_QUESTION_VIEW_FAILURE: {
      state.hasErrored = true;
      return state;
    }
    case GET_QUESTION_VIEW_SUCCESS: {
      state.isLoading = false;
      state.hasErrored = false;
      state.isUpdated = false;
      state.hasLoaded = true;
      state.question = action.payload;
      return state;
    }
    case 'NEXT_QUESTION': {
      console.log('HAAL VRAAG OP');
      state.questionId = action.questionId;
      state.isUpdated = true;
      return state;
    }
    default: {
      return state;
    }
  }

}, InitialState);

export default getQuestionViewReducer;

