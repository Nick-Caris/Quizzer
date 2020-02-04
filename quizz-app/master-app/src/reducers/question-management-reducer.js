// Imports
import { produce } from "immer"

// Constants
import { START_QUESTION, STOP_QUESTION } from '../actions/questionManagementActions'
import { NEXT_ROUND } from "../actions/quizManagmentActions"


const InitialState = {
    question: {},
    isActive: false,
}

const questionManagmentReducer = produce((state, action) => {

    switch (action.type) {
        case START_QUESTION: {
            state.isActive = true
            state.question = action.payload
            return state
        } case STOP_QUESTION: {
            state.isActive = false
            return state
        } case NEXT_ROUND: {
            return InitialState
        } default: {
            return state;
        }
    }

}, InitialState)

export default questionManagmentReducer