const initialLang = {  
    lang: "EN"
}

export default function(state=initialLang, action) {
    switch(action.type) {
        case "TOGGLE_LANG":
            let change = {}
            if (action.payload === "EN") {
                change = {
                    lang: "NL"
                }
            } else {
                change = {
                    lang: "EN"
                }
            }
            return {...state, ...change}
        default: return state
    }
}