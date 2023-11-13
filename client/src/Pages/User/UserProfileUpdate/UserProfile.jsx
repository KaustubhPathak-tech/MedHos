import React, { useState } from 'react';
import './UserProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../actions/auth';
const UserProfile = () => {
  const user=useSelector(state=>state.fetch_current_userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({formData},navigate));
  };

  return (
    <div className="userProfileUpdate">
      <form onSubmit={handleSubmit} id='updation'>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder={user?.user?.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={user?.user?.email}
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="avatar">Avatar URL:</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          placeholder={user?.user?.avatar}
          value={formData.avatar}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
