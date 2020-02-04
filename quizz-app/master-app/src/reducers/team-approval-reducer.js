// Imports
import { produce } from "immer"

// Constants
import { TEAM_APPROVE, TEAM_DISAPPROVE, TEAM_JOIN } from '../actions/teamApprovalActions.js'


const InitialState = {
    teams: [],
    isUpdated: false
}

const teamApprovalReducer = produce((state, action) => {

    switch (action.type) {
        case TEAM_APPROVE: {
            let team = state.teams.find(element => element._id === action.payload)
            team.approved = 1
            return state;
        } case TEAM_DISAPPROVE: {
            state.teams = state.teams.filter(element => element._id !== action.payload)
            return state;
        } case TEAM_JOIN: {
            state.teams = action.payload;
            state.isUpdated = false;
            return state;
        } case "TEAM-JOINED": {
            state.isUpdated = true;
            return state;

        } default: {
            return state;
        }
    }

}, InitialState)

export default teamApprovalReducer

