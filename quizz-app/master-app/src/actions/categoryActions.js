export const ADD_CATEGORIES = "ADD_CATEGORIES"
function addCategories(categories) {
    return {
        type: ADD_CATEGORIES,
        payload: categories
    }
}

export const TOGGLE_CATEGORY = "TOGGLE_CATEGORY"
export function toggleCategory(category) {
    return {
        type: TOGGLE_CATEGORY,
        payload: category
    }
}

export function getCategories() {
    return (dispatch) => {
        
        // Data and configuration of the post request
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }

        fetch(`http://localhost:3000/questions/categories`, options)
        .then(response => { 
            return response.json() })
        .then(data => {
            dispatch(addCategories(data))
        }).catch(error => {
            console.log("get categories went wrong", error);
        })
    }
}