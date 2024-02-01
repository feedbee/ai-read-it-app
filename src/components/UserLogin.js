import React, { useState, useEffect, useRef, useContext } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { userMode } from '../config';
import apiService from '../api/apiService';
import { UserContext } from '../context/UserContext';

const UserLogin = () => {
  const {user, setUser} = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const signIn = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: tokenResponse => {
      apiService.post(`/users/auth/google`, tokenResponse)
      .then(response => {
        const data = response.data;
        try {
          let tokenData = jwtDecode(data.token);
          setUser({
            token: data.token,
            tokenData: tokenData,
            profilePic: tokenData.user.avatar,
          });
        } catch (e) {
          console.error('Error decoding token:', e);
        }
      })
      .catch(error => {
        console.error('Login request failed:', error);
      });
    },
    onFailure: error => {
      console.error('Login Failed:', error);
    },
  });

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    signOut();
  };

  const signOut = () => {
    apiService.post(`/users/auth/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      }
    })
    .then(response => {
      console.info('Logout successful');
      setUser(null);
      googleLogout();
    })
    .catch(error => {
      console.info('Logout error, but still clean up the front user token', error);
      setUser(null);
      googleLogout();
    });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
  
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {userMode !== 'disabled' && (
        <div className="user-avatar-section">
        {user ? (
            <>
            <img src={user.profilePic} alt="User Avatar" onClick={handleUserClick} className="user-avatar" />
            {showDropdown && (
                <div className="dropdown-menu show" ref={dropdownRef}>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            )}
            </>
        ) : (
            <button className="btn" onClick={signIn}>
            <i className="bi bi-google"></i>
            </button>
        )}
        </div>
      )}
    </>
  );
};

export default UserLogin;
