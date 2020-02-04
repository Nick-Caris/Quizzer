// Imports
import { produce } from "immer"

// Constants
import { ADD_CATEGORIES, TOGGLE_CATEGORY } from '../actions/categoryActions'
import { NEXT_ROUND } from "../actions/quizManagmentActions"


const InitialState = {
    categories: [],
    selectedCategories: [],
    isLoading: true
}

const categoryReducer = produce((state, action) => {

    switch (action.type) {
        case ADD_CATEGORIES: {
            state.categories = action.payload
            state.isLoading = false
            return state
        } case TOGGLE_CATEGORY: {
            if(state.selectedCategories.includes(action.payload)) {
                state.selectedCategories.splice(state.selectedCategories.indexOf(action.payload), 1)
            } else {
                state.selectedCategories.push(action.payload)
            }          
            return state
        } case NEXT_ROUND: {
            return InitialState
        } default: {
            return state;
        }
    }

}, InitialState)

export default categoryReducer