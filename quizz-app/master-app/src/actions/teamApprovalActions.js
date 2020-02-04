export const TEAM_APPROVE = "TEAM_APPROVE"
function approveTeam(teamid) {
    return {
        type: TEAM_APPROVE,
        payload: teamid
    }
}

export const TEAM_DISAPPROVE = "TEAM_DISAPPROVE"
function dissapproveTeam(teamid) {
    return {
        type: TEAM_DISAPPROVE,
        payload: teamid
    }
}

export const TEAM_JOIN = "TEAM_JOIN"
function joinTeam(teams) {
    return {
        type: TEAM_JOIN,
        payload: teams
    }
}

export function acceptTeamRequest(teamid, roomCode) {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        fetch(`http://localhost:3000/currentQuiz/${roomCode}/approve/${teamid}`, options)
        .then(response => { return response.json() })
        .then(data => {
            dispatch(approveTeam(teamid))
        }).catch(error => {
            console.log("accept team went wrong", error);
        })
    }
}

export function rejectTeamRequest(teamid, roomCode) {
    return (dispatch) => {

        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        fetch(`http://localhost:3000/currentQuiz/${roomCode}/disapprove/${teamid}`, options)
        .then(response => { return response.json() })
        .then(data => {
            dispatch(dissapproveTeam(teamid))
        }).catch(error => {
            console.log("reject team went wrong", error);
        })
    }
    
}

export function joinTeamRequest(roomCode) {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        credentials: "include"
        }

        fetch(`http://localhost:3000/currentQuiz/${roomCode}/teams`, options)
        .then(response => { return response.json() })
        .then(data => {
            dispatch(joinTeam(data.teams))
        }).catch(error => {
            console.log("join team went wrong", error);
        })
    }
}
