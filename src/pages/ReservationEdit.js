import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import useForm from '../hooks/useForm';
import { editRoomReservation } from '../redux/actions/rooms/rooms.ts';
import { getRoomReservation } from '../redux/reducers/rooms';
import LoadRoomsComponent from '../components/LoadRoomsComponent';
import H1 from '../components/typo/H1';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import Form from '../components/Form';

export default function ReserervationEdit() {
  const { id, reservationId } = useParams();
  const { reservation, roomName } = useSelector(
    getRoomReservation(parseInt(id, 10), parseInt(reservationId, 10))
  );
  const { loadingUpdateRoom, errorLoadingUpdateRoom } = useSelector(
    state => state.rooms
  );
  const [reservationFormData, setValue] = useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const refForm = useRef(null);

  const submitForm = e => {
    e.preventDefault();
    const currentRoomId = parseInt(id, 10);
    const currentReservationId = parseInt(reservationId, 10);

    dispatch(
      editRoomReservation(
        currentRoomId,
        currentReservationId,
        reservationFormData
      )
    );
    setFormSubmitted(true);
  };

  const resetForm = () => {
    if (refForm.current) refForm.current.reset();
  };

  // redirect after form submitted
  useEffect(() => {
    if (!formSubmitted) return;

    if (!loadingUpdateRoom && !errorLoadingUpdateRoom) {
      history.push(`/rooms/${id}/reservations`);
    }
  }, [loadingUpdateRoom]);

  return (
    <LoadRoomsComponent>
      <PageWrapper>
        <H1>
          Edit Reservation
          {reservation && roomName
            ? ` from ${reservation.name} at Room ${roomName}`
            : ''}
        </H1>
        {errorLoadingUpdateRoom && <p>{errorLoadingUpdateRoom}</p>}
        {reservation && (
          <Form
            onSubmit={submitForm}
            disabled={loadingUpdateRoom}
            ref={refForm}
          >
            <input
              name="startDate"
              type="date"
              placeholder="Start Date"
              required
              defaultValue={reservation.startDate}
              onChange={setValue}
            />
            <input
              name="endDate"
              type="date"
              placeholder="End Date"
              required
              defaultValue={reservation.endDate}
              onChange={setValue}
            />
            <input
              name="name"
              placeholder="Name"
              required
              defaultValue={reservation.name}
              onChange={setValue}
            />
            <input
              name="firstName"
              placeholder="First Name"
              required
              defaultValue={reservation.firstName}
              onChange={setValue}
            />
            <div className="buttonRow">
              <Button type="submit">Update</Button>
              <Button type="button" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </Form>
        )}
      </PageWrapper>
    </LoadRoomsComponent>
  );
}
