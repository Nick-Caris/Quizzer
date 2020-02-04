// Imports
import { produce } from 'immer'
import { GET_TEAM_ANSWER, ACCEPT_TEAM_ANSWER, REJECT_TEAM_ANSWER } from '../actions/teamAnswerActions'
import { START_QUESTION } from "../actions/questionManagementActions"

const InitialState = {
    answers: [],
    isUpdated: false
}

const teamAnswersReducer = produce((state, action) => {

    switch (action.type) {
        case "QUESTION-ANSWERED": {
            state.isUpdated = true
            return state
        } case GET_TEAM_ANSWER: {
            state.answers = action.payload
            state.isUpdated = false
            return state
        } case ACCEPT_TEAM_ANSWER: {
            let answer = state.answers.find(element => element._id === action.payload._id)
            answer.right = 1
            return state
        } case REJECT_TEAM_ANSWER: {
            let answer = state.answers.find(element => element._id === action.payload._id)
            answer.right = 0
            return state
        } case START_QUESTION: {
            state.answers = []
            return state
        }default: {
            return state;
        }
    }

}, InitialState)

export default teamAnswersReducer
