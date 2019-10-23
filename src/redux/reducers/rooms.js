import { createSelector } from 'reselect';

import {
  LOADING_ROOMS,
  SET_ROOMS,
  ERROR_LOADING_ROOMS,
  CREATE_ROOM_RESERVATION,
  EDIT_ROOM_RESERVATION,
  LOADING_UPDATE_ROOM,
  ERROR_LOADING_UPDATE_ROOM
} from '../actions/rooms';
import { createNowIsoDate } from '../../utils/date';

const initialState = {};

export default function(state = initialState, action) {
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
        rooms: action.rooms
      };
    }
    case CREATE_ROOM_RESERVATION: {
      const { id, booking } = action.payload;
      const updatedRooms = state.rooms.map(room => {
        if (room.id !== id) return room;

        const currentDate = createNowIsoDate();
        return {
          ...room,
          createdAt: currentDate,
          updatedAt: currentDate,
          reservations: [...room.reservations, booking]
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
      const updatedRooms = state.rooms.map(room => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          updatedAt: createNowIsoDate(),
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
        errorLoadingUpdateRoom: action.error,
        loadingUpdateRoom: false
      };
    }
    case ERROR_LOADING_ROOMS: {
      return {
        ...state,
        errorLoadingRooms: action.error,
        loadingRooms: false
      };
    }

    default:
      return state;
  }
}

const roomsList = state => {
  return state.rooms.rooms || [];
};

/**
 * Get Room by id
 * @param {number} id
 */
export const getRoom = id => {
  return createSelector(
    roomsList,
    list => {
      const selectedRoom = list.find(room => room.id === id) || {};
      return selectedRoom;
    }
  );
};

/**
 * Get Reservation by room id and reservation id
 * @param {number} roomId
 * @param {number} reservationId
 */
export const getRoomReservation = (roomId, reservationId) => {
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
