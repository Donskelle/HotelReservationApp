import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadRooms as loadRoomsAction } from '../redux/actions/rooms/rooms';

export default function LoadRoomsComponent({ children }) {
  const dispatch = useDispatch();
  const { rooms, loadingRooms, errorLoadingRooms } = useSelector(
    state => state.rooms
  );

  const loadRooms = () => {
    dispatch(loadRoomsAction());
  };

  useEffect(() => {
    if ((!rooms || !rooms.length) && !loadingRooms) loadRooms();
  }, []);

  if (errorLoadingRooms) {
    return (
      <>
        <h2>Error</h2>
        <button type="button" onClick={loadRooms}>
          Reload
        </button>
      </>
    );
  }
  if (loadingRooms || (loadingRooms === undefined && !rooms)) {
    return 'Loading ...';
  }

  return children;
}
