export const ACCEPT_TEAM_ANSWER = "ACCEPT_TEAM_ANSWER"
export function acceptTeamAnswer(answer) {
    return {
        type: ACCEPT_TEAM_ANSWER,
        payload: answer 
    }
}

export const REJECT_TEAM_ANSWER = "REJECT_TEAM_ANSWER"
export function rejectTeamAnswer(answer) {
    return {
        type: REJECT_TEAM_ANSWER,
        payload: answer 
    }
}

export const GET_TEAM_ANSWER = "GET_TEAM_ANSWER"
function getTeamAnswer(answers) {
    return {
        type: GET_TEAM_ANSWER,
        payload: answers
    }
}

export function getAnswers(roomCode, questionId) {  
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        fetch(`http://localhost:3000/currentQuiz/${roomCode}/AnswerQuestions/${questionId}`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            dispatch(getTeamAnswer(data))
        }).catch(error => {
            console.log("get questions went wrong", error);
        })
    }
}

export function acceptTeamAnswerRequest(roomCode, question, teamName) {  
    return (dispatch) => {
        
        console.log("roomCode", roomCode);
        console.log("question:", question);
        console.log("teamName", teamName);

        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

    
        fetch(`http://localhost:3000/currentQuiz/${roomCode}/approve/question/${question.questionId}/team/${teamName}`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            dispatch(acceptTeamAnswer(question))
        }).catch(error => {
            console.log("get questions went wrong", error);
        })
    }
}

export function rejectTeamAnswerRequest(roomCode, question, teamName) {  
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

    
        fetch(`http://localhost:3000/currentQuiz/${roomCode}/disapprove/question/${question.questionId}/team/${teamName}`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            console.log("data in answers", data);
            dispatch(rejectTeamAnswer(question))
        }).catch(error => {
            console.log("get questions went wrong", error);
        })
    }
}