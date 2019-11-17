import React from 'react';
import logo from './logo.svg';
import './App.css';
import RecordComponent from './components/recordComponent';
import HeaderComponent from './components/headerComponent';
import { useAuth0 } from "./services/react-auth0-spa";
import NavBar from "./components/navBarComponent";

function App() {
  const { loading, isAuthenticated } = useAuth0();

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
    return (
      <div>
        <header>
          <NavBar />
          <HeaderComponent/>
        </header>
        <RecordComponent/>
      </div>
    );
  }
}

export default App;
