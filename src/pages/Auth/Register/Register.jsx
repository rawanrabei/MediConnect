import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import { registerUser } from '../../../features/auth/authThunks';
import { clearAuthError } from '../../../features/auth/authSlice';
import { selectAuthError, selectAuthLoading } from '../../../features/auth/authSelectors';
import { getDashboardPath } from '../../../utils/getDashboardPath';
import { authContainer, authLink, authPage, formGroup, formInput, formLabel } from '../../../constants/uiClasses';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    dispatch(clearAuthError());
    setLocalError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    const { confirmPassword, ...payload } = formData;
    const result = await dispatch(registerUser(payload));
    if (registerUser.rejected.match(result)) {
      return;
    }

    navigate(getDashboardPath(formData.role), { replace: true });
  };

  return (
    <div className={authPage}>
      <div className={authContainer}>
        <h1>Register</h1>
        {(error || localError) && (
          <p className="text-[var(--text-danger)] mb-4" role="alert">
            {localError || error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
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
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          <div className={formGroup}>
            <label htmlFor="role" className={formLabel}>Role</label>
            <select id="role" name="role" className={formInput} value={formData.role} onChange={handleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <Button type="submit" variant="primary" size="large" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>
        <p className={authLink}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
