// Constants
const port = 3000;
const serverHostname = `${window.location.hostname}:${port}`

// Dependency
let wsConnection

const WS_OPEN = "WS_OPEN"
function ws_open(socket) {
    return {
        type: WS_OPEN,
        payload: socket
    }
}


export default function(state=null, action) {
    switch(action.type) {
        case WS_OPEN: {
            return state = action.payload
        }
        default:
            return state
    }
}

export function openWebSocket() {
    return dispatch => {
        wsConnection = new WebSocket(`ws://${serverHostname}`);
        wsConnection.onmessage = function onmessage(eventInfo) {
            dispatch(JSON.parse(eventInfo.data))
        }
        wsConnection.onopen = (eventInfo) => {
            dispatch(ws_open(wsConnection))
        }
        wsConnection.onclose = (eventInfo) => {
            console.log("websocket closed: ", eventInfo);
        }
        wsConnection.onerror = (eventInfo) => {
            console.log("websocket error: ", eventInfo);
        }
    }
    
}
