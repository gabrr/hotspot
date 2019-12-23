import React, { Component } from 'react'
import ReactDOM from "react-dom"
import store from "../../redux/store"
import HotspotIcon from "../hotspotIcon"
import spotRemover from "../../redux/actions/spotRemover"
import "./style.css"


export class SpotItems extends Component {
    constructor(props) {
        super(props) 
        
        this.key = 0
    }

    keyGentr() {
        return this.key++
    }

    removeSpot(event) {
        store.dispatch(spotRemover(event.target.id - 1))
        window.localStorage.setItem("Hotspots", JSON.stringify(store.getState().hotspotCreator.hotspots));
        ReactDOM.render(<HotspotIcon />, document.getElementById("spot-space"))
        ReactDOM.render(<SpotItems/>, document.getElementById("list-items"))
    }
    
    render() {
        return (
            <React.Fragment>
                {
                    store.getState().hotspotCreator.hotspots.map(spot => {
                        return (
                            <div key={`a${this.keyGentr()}`} className="item primary-text-color">
                                <div key={`b${this.keyGentr()}`} className="name selectable-spot">Hotspot #{spot.id}</div>
                                <div key={`c${this.keyGentr()}`} onClick={this.removeSpot} id={store.getState().hotspotCreator.hotspots.indexOf(spot) + 1} className="delete-bt clickable no-spot selectable-spot">Delete</div>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}



export class HotspotList extends Component {
    constructor(props) {
        super(props) 
        
        this.key = 0
    }

    keyGentr() {
        return this.key++
    }

    render() {
        return (
            <div key={`itemList${this.keyGentr()}`} id="hotspot-list">
                <header key={`header${this.keyGentr()}`} className="primary-text-color selectable-spot">Hotspot's list</header>
                <div key={`heading${this.keyGentr()}`} id="list-items"></div>
            </div>

        )
    }
}

export default {HotspotList, SpotItems}