import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk'

import { createAxiosAuthConfig } from '../../../utils/authRequest';
import { createNowIsoDate } from '../../../utils/date';
import {
  SET_ROOMS,
  LOADING_ROOMS,
  ERROR_LOADING_UPDATE_ROOM,
  CREATE_ROOM_RESERVATION,
  EDIT_ROOM_RESERVATION,
  LOADING_UPDATE_ROOM,
  Reservation,
} from './types'
import { RootState } from '../../store';


type ReservationCreateOrUpdateOmit = Omit<Reservation, "createdAt"|"updatedAt"|"id">;

export const loadRooms = () => (dispatch : ThunkDispatch<{}, {}, any>, getState : () => RootState) => {
  const config = createAxiosAuthConfig(getState());

  dispatch({
    type: LOADING_ROOMS
  });

  axios
    .get('/rooms', config)
    .then(({ data }) => {
      dispatch({
        type: SET_ROOMS,
        payload: data
      });
    })
    .catch(error =>
      // better error handling needed
      dispatch({
        type: ERROR_LOADING_UPDATE_ROOM,
        payload: error
      })
    );
};

export const createRoomReservation = (roomid: number, reservation: ReservationCreateOrUpdateOmit) => (dispatch : ThunkDispatch<{}, {}, any>, getState: () => RootState) => {
  const config = createAxiosAuthConfig(getState());

  dispatch({
    type: LOADING_UPDATE_ROOM
  });

  axios
    // .post(`/rooms/${id}/reservation`, booking, config)
    .get(`/rooms`, config)
    .then(() => {
      const reservationId = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
      const currentDate = createNowIsoDate();
      dispatch({
        type: CREATE_ROOM_RESERVATION,
        payload: {
          roomid,
          reservation: {
            ...reservation,
            id: reservationId,
            updatedAt: currentDate,
            createdAt: currentDate
          }
        }
      });
    })
    .catch(error =>
      // better error handling needed
      dispatch({
        type: ERROR_LOADING_UPDATE_ROOM,
        payload: error
      })
    );
};

export const editRoomReservation = (roomId: number, reservationId: number, reservation: ReservationCreateOrUpdateOmit) => (
  dispatch : ThunkDispatch<{}, {}, any>,
  getState : () => RootState
) => {
  const config = createAxiosAuthConfig(getState());

  dispatch({
    type: LOADING_UPDATE_ROOM
  });

  axios
    // .put(`/rooms/${roomId}/reservation/${reservationId}`, reservation, config)
    .get(`/rooms`, config)
    .then(() => {
      const currentDate = createNowIsoDate();
      dispatch({
        type: EDIT_ROOM_RESERVATION,
        payload: {
          roomId,
          reservationId,
          reservation: {
            ...reservation,
            updatedAt: currentDate
          }
        }
      });
    })
    .catch(error =>
      // better error handling needed
      dispatch({
        type: ERROR_LOADING_UPDATE_ROOM,
        payload: error
      })
    );
};
