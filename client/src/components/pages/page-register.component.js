import React, { useState } from 'react';
import axios from 'axios';

function Register(props) {
  const [formData, setFormData] = useState({
    name_first: '',
    name_last: '',
    main_role: '',
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform the registration
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // If the registration was successful, set the current user
      props.setCurrentUser(data.user);
    } else {
      // Handle error
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="name_first" value={formData.name_first} onChange={handleChange} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="name_last" value={formData.name_last} onChange={handleChange} required />
      </label>
      <label>
        Main Role:
        <input type="text" name="main_role" value={formData.main_role} onChange={handleChange} required />
      </label>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <input type="submit" value="Register" />
    </form>
  );
}

export default Register;