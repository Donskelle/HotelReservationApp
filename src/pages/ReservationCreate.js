import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import useForm from '../hooks/useForm';
import { createRoomReservation } from '../redux/actions/rooms/rooms.ts';
import { getRoom } from '../redux/reducers/rooms';
import SelectRoomList from '../components/SelectRoomList';
import LoadRoomsComponent from '../components/LoadRoomsComponent';
import H1 from '../components/typo/H1';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import Form from '../components/Form';

export default function ReserervationCreate() {
  const { id } = useParams();
  const [bookingFormData, setValue] = useForm();
  const { name } = useSelector(getRoom(parseInt(id, 10)));
  const { loadingUpdateRoom, errorLoadingUpdateRoom } = useSelector(
    state => state.rooms
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    // prepare Data
    const {
      firstname,
      enddate,
      startdate,
      roomid,
      ...restFormData
    } = bookingFormData;
    const formattedData = {
      ...restFormData,
      firstName: firstname,
      startDate: startdate,
      endDate: enddate
    };
    const currentRoomId = parseInt(id || roomid, 10);

    dispatch(createRoomReservation(currentRoomId, formattedData));
    setFormSubmitted(true);
  };

  // redirect after form submitted
  useEffect(() => {
    if (!formSubmitted) return;

    if (!loadingUpdateRoom && !errorLoadingUpdateRoom) {
      const currentRoomId = id || bookingFormData.roomid;
      history.push(`/rooms/${currentRoomId}/reservations`);
    }
  }, [loadingUpdateRoom]);

  return (
    <LoadRoomsComponent>
      <PageWrapper>
        <H1>Create Reservation{name ? ` at Room ${name}` : ''}</H1>
        {errorLoadingUpdateRoom && <p>{errorLoadingUpdateRoom}</p>}
        <Form onSubmit={submitForm} disabled={loadingUpdateRoom}>
          {!name && (
            <SelectRoomList required name="roomid" onChange={setValue} />
          )}
          <input
            name="startdate"
            type="date"
            placeholder="Start Date"
            required
            onChange={setValue}
          />
          <input
            name="enddate"
            type="date"
            placeholder="End Date"
            required
            onChange={setValue}
          />
          <input name="name" placeholder="Name" required onChange={setValue} />
          <input
            name="firstname"
            placeholder="First Name"
            required
            onChange={setValue}
          />
          <div className="buttonRow">
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </PageWrapper>
    </LoadRoomsComponent>
  );
}
