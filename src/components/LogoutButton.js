import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/actions/user/user.ts';
import Button from './Button';

export default function LogoutButton(props) {
  const dispatch = useDispatch();

  const logoutClick = () => {
    dispatch(logout());
  };

  return (
    <Button type="button" onClick={logoutClick} {...props}>
      Logout
    </Button>
  );
}
