import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import { loginUser } from '../../../features/auth/authThunks';
import { clearAuthError } from '../../../features/auth/authSlice';
import { selectAuthError, selectAuthLoading } from '../../../features/auth/authSelectors';
import { resolvePostLoginPath } from '../../../utils/getDashboardPath';
import { authContainer, authLink, authPage, formGroup, formInput, formLabel } from '../../../constants/uiClasses';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const redirectPath = location.state?.from || '/patient/dashboard';
  const bookingState = location.state?.bookingState;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
  });

  const handleChange = (e) => {
    dispatch(clearAuthError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));
    if (loginUser.rejected.match(result)) {
      return;
    }

    if (redirectPath.startsWith('/booking/') && bookingState) {
      navigate(redirectPath, { state: bookingState, replace: true });
      return;
    }

    navigate(resolvePostLoginPath(formData.role, redirectPath), { replace: true });
  };

  return (
    <div className={authPage}>
      <div className={authContainer}>
        <h1>Login</h1>
        {error && (
          <p className="text-[var(--text-danger)] mb-4" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <div className={formGroup}>
            <label htmlFor="login-role" className={formLabel}>Role</label>
            <select
              id="login-role"
              name="role"
              className={formInput}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Button type="submit" variant="primary" size="large" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className={authLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
