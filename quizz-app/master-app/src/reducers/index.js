// Imports
import { combineReducers } from 'redux'
import ToggleLangReducer from './toggle-lang-reducer'
import { openRoomisLoading, openRoomHasErrored, openRoom } from './open-room-reducer'
import websocketReducer from './websocket-reducer'
import teamApprovalReducer from './team-approval-reducer'
import categoryReducer from './category-reducer'
import questionSelectReducer from './question-select-reducer'
import questionManagmentReducer from "./question-management-reducer"
import teamsAnswerReducer from "./team-answers-reducer"


/**
 * Creation of rootreducer. Combines every reducer needed to run the application
 */
export const RootReducer = combineReducers({
    language: ToggleLangReducer,
    roomCodeResponse: combineReducers({
        isLoading: openRoomisLoading,
        hasErrored: openRoomHasErrored,
        roomCode: openRoom
    }),
    websocket: websocketReducer,
    teams: teamApprovalReducer,
    categories: categoryReducer,
    questions: questionSelectReducer,
    questionManagement: questionManagmentReducer,
    teamAnswers: teamsAnswerReducer
})
