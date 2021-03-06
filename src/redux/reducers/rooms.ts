import { createSelector } from 'reselect';

import {
  LOADING_ROOMS,
  SET_ROOMS,
  ERROR_LOADING_ROOMS,
  CREATE_ROOM_RESERVATION,
  EDIT_ROOM_RESERVATION,
  LOADING_UPDATE_ROOM,
  ERROR_LOADING_UPDATE_ROOM,
  Room,
  RoomsActionTypes
} from '../actions/rooms/types';
import { RootState } from '../store';

const initialState = {};

export interface State {
  loadingRooms?: boolean
  rooms?: Room []
  loadingUpdateRoom?: boolean
  errorLoadingUpdateRoom?: typeof Error
  errorLoadingRooms?: typeof Error
}


export default function(state: State = initialState, action: RoomsActionTypes) : State {
  switch (action.type) {
    case LOADING_ROOMS: {
      const { errorLoadingRooms, ...rest } = state;
      return {
        ...rest,
        loadingRooms: true
      };
    }
    case SET_ROOMS: {
      return {
        ...state,
        loadingRooms: false,
        rooms: action.payload
      };
    }
    case CREATE_ROOM_RESERVATION: {
      const { roomid, reservation } = action.payload;
      const updatedRooms = (state.rooms || []).map((room: Room) : Room => {
        if (room.id !== roomid) return room;

        return {
          ...room,
          reservations: [...room.reservations, reservation]
        };
      });

      return {
        ...state,
        rooms: [...updatedRooms],
        loadingUpdateRoom: false
      };
    }
    case EDIT_ROOM_RESERVATION: {
      const { roomId, reservationId, reservation } = action.payload;
      const updatedRooms = (state.rooms || []).map(room => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          reservations: room.reservations.map(res => {
            if (res.id !== reservationId) return res;
            return {
              ...res,
              ...reservation
            };
          })
        };
      });

      return {
        ...state,
        rooms: [...updatedRooms],
        loadingUpdateRoom: false
      };
    }
    case LOADING_UPDATE_ROOM: {
      const { errorLoadingUpdateRoom, ...rest } = state;
      return {
        ...rest,
        loadingUpdateRoom: true
      };
    }
    case ERROR_LOADING_UPDATE_ROOM: {
      return {
        ...state,
        errorLoadingUpdateRoom: action.payload,
        loadingUpdateRoom: false
      };
    }
    case ERROR_LOADING_ROOMS: {
      return {
        ...state,
        errorLoadingRooms: action.payload,
        loadingRooms: false
      };
    }

    default:
      return state;
  }
}

const roomsList = (state: RootState) : Room [] => state.rooms.rooms || [];

/**
 * Get Room by id
 * @param {number} id
 */
export const getRoom = (id: number) =>
  createSelector(
    roomsList,
    list =>  list.find(room => room.id === id)
  )

/**
 * Get Reservation by room id and reservation id
 * @param {number} roomId
 * @param {number} reservationId
 */
export const getRoomReservation = (roomId: number, reservationId: number) => {
  return createSelector(
    getRoom(roomId),
    room => {
      if (!room || !room.reservations) return {};

      const reservation =
        room.reservations.find(res => res.id === reservationId) || {};
      return { reservation, roomName: room.name };
    }
  );
};
