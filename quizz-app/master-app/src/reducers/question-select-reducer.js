// Imports
import { produce } from "immer"

// Constants
import { ADD_QUESTIONS, TOGGLE_QUESTION } from '../actions/selectQuestionActions'
import { START_QUESTION, STOP_QUESTION } from '../actions/questionManagementActions'
import { NEXT_ROUND } from "../actions/quizManagmentActions"


const InitialState = {
    questions: [],
    selectedQuestion: null,
    isLoading: true
}

const selectQuestionReducer = produce((state, action) => {

    switch (action.type) {
        case ADD_QUESTIONS: {
            action.payload.forEach(element => {
                state.questions.push(element)
            });
            state.isLoading = false
            return state
        } case TOGGLE_QUESTION: {
            state.selectedQuestion = action.payload
            return state
        } case START_QUESTION: {
            state.questions = state.questions.filter(element => element._id !== action.payload._id)
            return state
        } case STOP_QUESTION: {
            state.selectedQuestion = null
            return state
        } case NEXT_ROUND: {
            return InitialState
        } default: {
            return state;
        }
    }

}, InitialState)

export default selectQuestionReducer