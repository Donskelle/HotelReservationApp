import axios from 'axios';

import { createAxiosAuthConfig } from '../../utils/authRequest';

export const SET_ROOMS = 'SET_ROOMS';
export const LOADING_ROOMS = 'LOADING_ROOMS';
export const ERROR_LOADING_ROOMS = 'ERROR_LOADING_ROOMS';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const CREATE_ROOM_RESERVATION = 'CREATE_ROOM_RESERVATION';
export const EDIT_ROOM_RESERVATION = 'EDIT_ROOM_RESERVATION';
export const LOADING_UPDATE_ROOM = 'LOADING_UPDATE_ROOM';
export const ERROR_LOADING_UPDATE_ROOM = 'ERROR_LOADING_UPDATE_ROOM';

export const loadRooms = () => (dispatch, getState) => {
  const config = createAxiosAuthConfig(getState);

  dispatch({
    type: LOADING_ROOMS
  });

  axios
    .get('/rooms', config)
    .then(({ data }) => {
      dispatch({
        type: SET_ROOMS,
        rooms: data
      });
    })
    .catch(error =>
      // better error handling needed
      dispatch({
        type: ERROR_LOADING_UPDATE_ROOM,
        error
      })
    );
};

export const createRoomReservation = (id, booking) => (dispatch, getState) => {
  const config = createAxiosAuthConfig(getState);

  dispatch({
    type: LOADING_UPDATE_ROOM
  });

  axios
    // .post(`/rooms/${id}/reservation`, booking, config)
    .get(`/rooms`, config)
    .then(() => {
      const newId = parseInt(Math.random() * Number.MAX_SAFE_INTEGER, 10);
      dispatch({
        type: CREATE_ROOM_RESERVATION,
        payload: {
          id,
          booking: {
            ...booking,
            id: newId
          }
        }
      });
    })
    .catch(error =>
      // better error handling needed
      dispatch({
        type: ERROR_LOADING_UPDATE_ROOM,
        error
      })
    );
};

export const editRoomReservation = (roomId, reservationId, reservation) => (
  dispatch,
  getState
) => {
  const config = createAxiosAuthConfig(getState);

  dispatch({
    type: LOADING_UPDATE_ROOM
  });

  axios
    // .put(`/rooms/${roomId}/reservation/${reservationId}`, reservation, config)
    .get(`/rooms`, config)
    .then(() => {
      dispatch({
        type: EDIT_ROOM_RESERVATION,
        payload: {
          roomId,
          reservationId,
          reservation
        }
      });
    })
    .catch(error =>
      // better error handling needed
      dispatch({
        type: ERROR_LOADING_UPDATE_ROOM,
        error
      })
    );
};
