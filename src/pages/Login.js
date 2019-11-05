import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import useForm from '../hooks/useForm';
import { loginUser, lookupRefreshToken } from '../redux/actions/user/user';
import H1 from '../components/typo/H1';
import Button from '../components/Button';
import PageWrapper from '../components/PageWrapper';

export default function LoginPage() {
  const [{ username, password }, setFormValue] = useForm();
  const { name, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const login = e => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    const { from } = location.state || { from: { pathname: '/dashboard' } };

    if (name) {
      history.replace(from);
    }
  }, [name]);

  useEffect(() => {
    dispatch(lookupRefreshToken());
  }, [dispatch]);

  return (
    <PageWrapper>
      <H1>Login</H1>
      <form onSubmit={login} disabled={loading}>
        <input
          name="username"
          placeholder="Username"
          onChange={setFormValue}
          required
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={setFormValue}
          required
          autoComplete="current-password"
        />
        <Button type="submit">Log in</Button>
      </form>
    </PageWrapper>
  );
}
