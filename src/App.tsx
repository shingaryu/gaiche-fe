import React from 'react';
import logo from './logo.svg';
import './App.css';
import RecordComponent from './components/recordComponent';
import HeaderComponent from './components/headerComponent';

function App() {
  return (
    <div>
      <header>
        <HeaderComponent/>
      </header>
      <RecordComponent/>
    </div>
  );
}

export default App;
