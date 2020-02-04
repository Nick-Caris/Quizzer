// Imports
import {combineReducers} from 'redux'
import getQuizReducer from "./get-room-reducer";
import getAnsweredQuestionsReducer from "./get-answered-questions-reducer";
import getQuestionViewReducer from "./get-question-view-reducer";

/**
 * Creation of root reducer. Combines every reducer needed to run the application
 */
export const RootReducer = combineReducers({
  dashboardQuizResponse: getQuizReducer,
  answerQuestionResponse: getAnsweredQuestionsReducer,
  dashboardViewQuestionResponse: getQuestionViewReducer,
});
