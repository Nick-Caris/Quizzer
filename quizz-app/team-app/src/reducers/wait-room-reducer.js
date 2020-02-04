// Imports
import {produce} from 'immer';

const InitialState = {
  status: 'Wait',
  questionId: '',
  roomCode: '',
  stopped: '',
};

const waitRoomReducer = produce((state, action) => {
  switch (action.type) {
    case 'TEAM-ACCEPTED': {
      state.status = 'your team has been accepted.';
      return state;
    }
    case 'TEAM-REJECTED': {
      state.status = 'your team has NOT been accepted you will be redirected to home screen.';
      return state;
    }
    case 'START-QUESTION': {
      state.status = 'the Quiz has started you will can now join the quiz.';
      state.questionId = action.questionId;
      state.roomCode = action.roomCode;
      state.teamName = action.teamName;
      state.stopped = false;
      return state;
    }
    case 'QUESTION-ENDED': {
      state.status = 'the question has stopped';
      state.questionId = '';
      state.roomCode = action.roomCode;
      state.teamName = action.teamName;
      state.stopped = true;
      return state;
    }
    default: {
      return state;
    }
  }

}, InitialState);

export default waitRoomReducer;
