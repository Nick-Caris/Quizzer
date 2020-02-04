export const START_QUESTION = "START_QUESTION"
function startQuestionAction(question) {
    return {
        type: START_QUESTION,
        payload: question
    }
}

export const STOP_QUESTION = "STOP_QUESTION"
function stopQuestionAction(question) {
    return {
        type: STOP_QUESTION,
        payload: question
    }
}

export function startQuestion(roomCode, question) {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        
        fetch(`http://localhost:3000/currentQuiz/${roomCode}/startQuestion/${question._id}`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            dispatch(startQuestionAction(question))
        }).catch(error => {
            console.log("start question went wrong", error);
        })
    }
}

export function stopQuestion(roomCode, question) {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        
        fetch(`http://localhost:3000/currentQuiz/${roomCode}/endQuestion/${question._id}`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            dispatch(stopQuestionAction(question))
        }).catch(error => {
            console.log("stop question went wrong", error);
        })

    }
}