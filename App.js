import React, { useState } from 'react';
import { account, ID } from './lib/appwrite';
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function login(email, password) {
    try{
    await account.createEmailSession(email, password);
    setLoggedInUser(await account.get());}
    catch(err){alert('아이디 비밀번호가 틀렸습니다.')}
  }


  return (
    <div className='login-container'>
      
      <div>
      <img src="/login-image.png" alt="이미지" className='login-image'/>
      </div>
      <div>
      <div className='login-form'></div>
      <p className='custom-write'>
        {loggedInUser ? `반갑습니다. ${loggedInUser.name}님` : '로그인하세요'}
      </p>

      

      <form>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

        <button type='button' className="custom-button" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          className="custom-button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          className="custom-button"
          onClick={async () => {
            await account.deleteSession('current');
            setLoggedInUser(null);
          }}
        >
          Logout
        </button>
      </form>
    </div>
    </div>
  );
};

export default App;
