export const SET_ROOMS = 'SET_ROOMS';
export const LOADING_ROOMS = 'LOADING_ROOMS';
export const ERROR_LOADING_ROOMS = 'ERROR_LOADING_ROOMS';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const CREATE_ROOM_RESERVATION = 'CREATE_ROOM_RESERVATION';
export const EDIT_ROOM_RESERVATION = 'EDIT_ROOM_RESERVATION';
export const LOADING_UPDATE_ROOM = 'LOADING_UPDATE_ROOM';
export const ERROR_LOADING_UPDATE_ROOM = 'ERROR_LOADING_UPDATE_ROOM';

interface LoadingRooms {
    type: typeof LOADING_ROOMS
}
interface LoadingUpdateRoom {
    type: typeof LOADING_UPDATE_ROOM
}
interface SetRooms {
    type: typeof SET_ROOMS
    payload: Room []
}
interface ErrorLoadingRoom {
    type: typeof ERROR_LOADING_ROOMS
    payload: typeof Error
}
interface ErrorLoadingUpdateRoom {
    type: typeof ERROR_LOADING_UPDATE_ROOM
    payload: typeof Error
}
interface CreateRoomReservation {
    type: typeof CREATE_ROOM_RESERVATION
    payload: {
        reservation: Reservation
        roomid: number
    }
}
interface EditRoomReservation {
    type: typeof EDIT_ROOM_RESERVATION
    payload: {
        reservation: Reservation
        roomId: number
        reservationId: number
    }
}

export interface Reservation {
    id: number
    name: string
    firstName: string
    startDate: string
    endDate: string
    createdAt: string
    updatedAt: string
}

export interface Room {
    id: number
    name: string
    priceEuro: number
    pastBookings: Reservation []
    reservations: Reservation []
    images: {
        slideShow: string []
        cover: {
            max: string
        }
    }
}
export type RoomsActionTypes = LoadingRooms | SetRooms | ErrorLoadingRoom | CreateRoomReservation | EditRoomReservation | ErrorLoadingUpdateRoom | LoadingUpdateRoom;


