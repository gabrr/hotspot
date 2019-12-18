import React from 'react';
import Navbar from "./components/navbar"
import HotspotList from "./components/hotspotList"
import HotspotCreator from "./components/hostspotCreator"
import HotspotIcon from "./components/hotspotIcon"
import './App.css';

function App() {
    return ( 
      <div className = "App" >
        <Navbar />
        <HotspotCreator />
        <HotspotList />
        <HotspotIcon />
      </div>
    );
}

export default App;