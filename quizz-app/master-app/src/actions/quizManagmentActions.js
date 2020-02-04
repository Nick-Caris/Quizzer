export const NEXT_ROUND = "NEXT_ROUND"
function nextRound() {
    return {
        type: NEXT_ROUND
    }
}

export const END_QUIZ = "END_QUIZ"
function endQuiz() {
    return {
        type: END_QUIZ
    }
}

export function nextRoundRequest(roomCode, callback) {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        fetch(`http://localhost:3000/currentQuiz/${roomCode}/nextRound`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            dispatch(nextRound())
            callback()
        }).catch(error => {
            console.log("put next round went wrong", error);
        })
    }
}

export function endQuizRequest(roomCode, callback) {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        fetch(`http://localhost:3000/currentQuiz/${roomCode}/endQuiz`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            dispatch(endQuiz())
            callback()
        }).catch(error => {
            console.log("get end quiz went wrong", error);
        })
    }
}