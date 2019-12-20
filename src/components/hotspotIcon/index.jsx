import React, { Component } from 'react'
import store from "../../redux/store"
import './style.css'

export default class HotspotIcon extends Component {
    constructor(props) {
        super(props) 
        
        this.key = 0
    }
    

    keyGentr() {
        return this.key++
    }


    render() {
        console.log(store.getState())
        return (
            <React.Fragment>
                {
                    store.getState().hotspotCreator.hotspots.map(spot => {
                        return (
                            <div className="hotspot" key={`a${this.keyGentr()}`} style={{left: spot.x, top: spot.y, transform: "translate(-5%, -78%)"}}>
                                <div key={`b${this.keyGentr()}`} className="red-out">
                                    <div key={`c${this.keyGentr()}`} className="red-in"></div>
                                    <div key={`d${this.keyGentr()}`} className="hotspot-pointer"></div>
                                </div>
                                <div key={`e${this.keyGentr()}`} className="hotspot-info pointer">
                                    <div key={`f${this.keyGentr()}`} className="hotspot-info-title">
                                        {spot.title}
                                    </div>
                                    <div key={`g${this.keyGentr()}`} className="hotspot-info-body primary-text-color">
                                        {spot.body}
                                    </div>
                                </div>
                            </div>
                        )
                    })   
                }
            </React.Fragment>
        )
    }
}
