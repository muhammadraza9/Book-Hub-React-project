import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

function Home() {
  const [currentUser, setCurrentUser] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    //  const isLoggedIn = localStorage.getItem("isLoggedIn");
    const checklogin = localStorage.getItem("currentUser");
     if(!checklogin){
        navigation("/login");   
     }
     else{
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(user)
     }
  },[navigation]);

  return (
    <UserContext.Provider value={currentUser}>
      <h2>{`Well Come ${currentUser ? currentUser.name : "users"}!`}</h2>
    </UserContext.Provider>
  )
}

export default Home
