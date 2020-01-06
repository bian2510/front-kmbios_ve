import React from 'react';
import Navigation from './Components/Header/Navigation'
import './App.css';
import AccountTable from './Components/Table/Table';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <AccountTable/>
    </div>
  );
}

export default App;
