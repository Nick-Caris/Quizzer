// Imports
import { combineReducers } from 'redux'
import { enterRoom, enterRoomHasErrored, enterRoomIsLoading } from './enter-room-reducer';
import waitRoomReducer from './wait-room-reducer';
import questionReducer from "./get-question-reducer";
import sendAnswerReducer from "./answer-question-reducer";

/**
 * Creation of rootreducer. Combines every reducer needed to run the application
 */
export const RootReducer = combineReducers({
  enterRoomResponse: combineReducers({
    isLoading: enterRoomIsLoading,
    hasErrored: enterRoomHasErrored,
    enterRoomData: enterRoom,
  }),
  sendAnswerRequest: sendAnswerReducer,
  waitRoomResponse: waitRoomReducer,
  questionResponse: questionReducer,
});
