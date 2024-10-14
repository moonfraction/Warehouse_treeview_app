import React, { useState, useContext } from 'react';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const navigateTo = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const domain = 'g.com';
        const emailDomain = email.split('@')[1];

        if (emailDomain === domain) {
            setIsAuthenticated(true);
            toast.success('Successfully logged in!');
            navigateTo('/home');
        } else {
            toast.error(`Invalid email domain. Please use ${domain}`);
        }
    };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter godown email address'
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;