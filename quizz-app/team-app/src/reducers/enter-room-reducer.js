// Imports
import {ENTER_ROOM_FAILURE, ENTER_ROOM_ISLOADING, ENTER_ROOM_SUCCES} from '../actions/lobbyActions'


export function enterRoomIsLoading(state = false, action) {
  switch (action.type) {
    case ENTER_ROOM_ISLOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function enterRoomHasErrored(state = false, action) {
  switch (action.type) {
    case ENTER_ROOM_FAILURE:
      return action.hasErrored;
    default:
      return state;
  }
}

export function enterRoom(state = "", action) {
  switch (action.type) {
    case ENTER_ROOM_SUCCES:
      return action.payload;
    default:
      return state;
  }
}
