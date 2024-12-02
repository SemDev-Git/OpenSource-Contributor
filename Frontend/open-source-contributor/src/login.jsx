import React, { useState, useEffect } from 'react';
import Onboarding from './onboarding.jsx'
import Screen from './screen.jsx'

const CLIENT_ID = "Ov23licc0R42GG7WK2wm";

function Login() {
  const [userData, setUserData] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log("Code in front-end: " + codeParam);

    if (codeParam && !localStorage.getItem("accessToken")) {
      async function getAccessToken() {
        try {
          const response = await fetch(`https://opensource-contributor.onrender.com/getAccessToken?code=${codeParam}`, {
            method: "GET",
          });
          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            getUserData(data.access_token);
          } else {
            throw new Error('Access token not found in response');
          }
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      }
      getAccessToken();
    } else {
      setIsLoading(false); 
    }
  }, []);

  async function getUserData(token) {
    try {
      const response = await fetch("https://opensource-contributor.onrender.com/getUserData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setRepositories(data.user.repos); 
        setIsLoading(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user data');
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  function LoginWithGithub() {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`);
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <div>Loading...</div>
        ) : localStorage.getItem("accessToken") ? (
          <>
            {userData.isNewUser ? (
              <Onboarding />  
            ) : (
              <Screen userData={userData} />   
            )}
          </>
        ) : (
          <section id="login">
            <h1>Let's find you a project</h1>
            <button className="git-button" onClick={LoginWithGithub}>
              Login with GitHub
            </button>
          </section>
        )}
      </header>
    </div>
  );
}

export default Login;