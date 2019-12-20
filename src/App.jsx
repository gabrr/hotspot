import React from 'react';
import Navbar from "./components/navbar"
import {HotspotList} from "./components/hotspotList"
import HotspotCreator from "./components/hostspotCreator"
import store from "./redux/store"
import { Provider } from "react-redux"
import './App.css';

function App() {
    return (
      <Provider store={store}>
          <div className = "App" >
            <Navbar />
            <HotspotCreator />
            <HotspotList />
          </div>
      </Provider> 
    );
}

export default App;