// Imports
import { OPEN_ROOM_ISLOADING, OPEN_ROOM_FAILURE, OPEN_ROOM_SUCCES } from '../actions/actions'

export function openRoomisLoading(state = false, action) {
    switch (action.type) {
        case OPEN_ROOM_ISLOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function openRoomHasErrored(state = false, action) {
    switch (action.type) {
        case OPEN_ROOM_FAILURE:
            return action.hasErrored;
        default:
            return state;
    }
}

export function openRoom(state = "", action) {
    switch (action.type) {
        case OPEN_ROOM_SUCCES:
            return action.payload;
        default:
            return state;
    }
}
