import React from 'react';
import SignupInfo from '../components/Signupinfo';
import {useState} from 'react';


const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignup = async (e) => {
    e.preventDefault();
    alert('Account created successfully!');
  };

  return (
    <div>
      <SignupInfo />
      <form onSubmit={handleSignup}>
        <input 
          type="text"
          placeholder='Enter your full name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div> 
  );
};


export default Signup;