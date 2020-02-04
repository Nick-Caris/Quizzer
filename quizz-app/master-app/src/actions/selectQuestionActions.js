export const ADD_QUESTIONS = "ADD_QUESTIONS"
function addQuestions(questions) {
    return {
        type: ADD_QUESTIONS,
        payload: questions
    }
}

export const TOGGLE_QUESTION = "TOGGLE_QUESTION"
export function toggleQuestion(question) {
    return {
        type: TOGGLE_QUESTION,
        payload: question
    }
}

export function getQuestions(categories) {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        categories.forEach((category) => {
            fetch(`http://localhost:3000/questions/category/${category}`, options)
            .then(response => { 
                return response.json() })
            .then(data => {
                dispatch(addQuestions(data))
            }).catch(error => {
                console.log("get questions went wrong", error);
            })
        })
    }
}