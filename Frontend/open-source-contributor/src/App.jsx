import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

const CLIENT_ID = "Ov23licc0R42GG7WK2wm"

function App() {
  const [rerender, setRerender] = useState(false)
  const [userData,setUserData]= useState({})
  //forward the user to the github login screen ( we pass in the client id)
  //user is now on the github side and log in 
  // when user decides to login... they get vack to localhost:3000
  //but localhost:3000/?code??sdasdasdsafd
  //use the code to get access token(code can only be used once)
  
  useEffect(()=>{
  //localhost:3000/?code??sdasdasdsafd
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam =urlParams.get("code");
  console.log(codeParam);

    // local storage is nice 
    //leave our page for a while
    //comeback and still logged in with Github

    if(codeParam && (localStorage.getItem("accessToken")===null)){
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam,{
          method: "GET"
        }).then((response)=>{
          return response.json()
        }).then((data)=>{
          console.log(data);
          if(data.access_token){
            localStorage.setItem("accessToken",data.access_token)
            setRerender(!rerender)
          }
        })
      }
      getAccessToken()
    }


  }, [])

  async function getUserData(){
    await fetch("http://localhost:4000/getUserData",{
      method: "GET",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("accessToken")//bearer Access Token
      }
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data);
      setUserData(data)
    })
  }
  
  
  function LoginWithGithub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
  }
  
  return (  
      <div className='App'>
        <header className='App-header'>
        {localStorage.getItem("accessToken") ?
        <>
          <h1>we have the accessToken</h1>
          <button onClick={()=>{
            localStorage.removeItem("accessToken"); setRerender(!rerender)}}>
            Logout
          </button>
          <h3>Get User Data from GitHub API</h3>
          <button onClick={getUserData}>Get User Data</button>
          {Object.keys(userData).length !== 0 ?
            <>
            <h4>Hey there {userData.login}</h4>
            </>  
          :
          <>
          </>
        
        }
        </>:
        
        <>
        <h3>User is not Logged in</h3>
        <button onClick={LoginWithGithub}>
            Login with GitHub
          </button>
        </>
        }
          
        </header>
      </div>
      
  )
}

export default App
