import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminServiceObj } from '../../services/adminService';
import './login.css';

function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const loginButton_click = async () => {
    const queryString = location.search;
    const strReturnUrl = new URLSearchParams(queryString).get('returnUrl') || '/AdminHome';

    try {
      const data = await adminServiceObj.adminLogin({ email: adminId, password: password });

      if (data.success) {
        sessionStorage.setItem('admin-token', data.token);
        sessionStorage.setItem('adminId', data.adminId);
        navigate(strReturnUrl);
      } else {
        setResult('Invalid Email or Password');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <>
    <div className="login-component">
      <fieldset>
      <img src='/Images/admin.jpg' alt="Login" className="login-image" />
        <legend></legend>
        <div className="label">
        <label>Admin ID: </label>
        <input
          type="text"
          id="adminId"
          value={adminId}
          onChange={(event) => setAdminId(event.target.value)}
        />
        </div>
        <div className="label">
        <label>Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
       </div>

        <input type="button" onClick={loginButton_click} value="Login" />
        <p style={{ color: 'red' }}>{result}</p>
        <br/>
          <a className="link" href="/forgotAdminPassword">Forgot Password?</a>   
          <br/>      
          <a className="link" href="/admin-register">Sign Up</a>
      </fieldset>
      </div>
    </>
  );
}

export default AdminLogin;
