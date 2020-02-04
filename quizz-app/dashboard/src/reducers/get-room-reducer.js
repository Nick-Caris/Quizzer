// Imports
import {produce} from 'immer';
import {GET_ROOM_FAILURE, GET_ROOM_IS_LOADING, GET_ROOM_SUCCESS} from "../actions/getRoomAction";

const InitialState = {
  isLoading: false,
  hasErrored: false,
  isUpdated: false,
  hasLoaded: false,
  lang: 'EN',
  quiz: '',
};

const getQuizReducer = produce((state, action) => {
  switch (action.type) {
    case GET_ROOM_IS_LOADING: {
      state.isLoading = true;
      return state;
    }
    case GET_ROOM_FAILURE: {
      state.hasErrored = true;
      return state;
    }
    case GET_ROOM_SUCCESS: {
      state.isLoading = false;
      state.hasErrored = false;
      state.isUpdated = false;
      state.hasLoaded = true;
      state.quiz = action.payload.quiz;
      state.lang = action.payload.quiz.lang;
      return state;
    }
    case 'UPDATE-DASHBOARD': {
      state.isUpdated = true;
      return state;
    }
    default: {
      return state;
    }
  }

}, InitialState);

export default getQuizReducer;

