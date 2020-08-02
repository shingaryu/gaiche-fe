import React from 'react';
import logo from './logo.svg';
import './App.css';
import RecordComponent from './components/recordComponent';
import HeaderComponent from './components/headerComponent';
import { useAuth0 } from "./services/react-auth0-spa";
import NavBar from "./components/navBarComponent";
import UserApi from './api/userApi';

function App() {
  const { loading, isAuthenticated, user } = useAuth0();
  console.log(user)
  const userApi = new UserApi();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  } else if (!isAuthenticated) {
    return (
      <div>
        <div>
          Please Login!
        </div>
        <NavBar />
      </div>
    );
  } else {
    userApi.getUser(user.)


    return (
      <div>
        <header>
          <NavBar />
          <HeaderComponent/>
        </header>
        <RecordComponent user={user}/>
      </div>
    );
  }
}

export default App;
