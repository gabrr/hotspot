import React, { Component } from 'react'
import store from "../../redux/store"
import spotUpdater from "../../redux/actions/spotUpdater"
import './style.css'

export default class HotspotIcon extends Component {
    constructor(props) {
        super(props)
        
        this.key = 0
    
    }
    

    keyGentr() {
        return this.key++
    }

    showInput(event) {
        console.log(event.target)
        event.target.nextElementSibling.style.display = "block"
        event.target.style.display = "none"
    }


    componentDidMount() {

    }
    
    updateBody(event) {
        store.dispatch(spotUpdater(parseInt(event.target.dataset.id) - 1, "body", event.target.value))
        window.localStorage.setItem("Hotspots", JSON.stringify(store.getState().hotspotCreator.hotspots));
        event.target.offsetParent.querySelector("p").innerText = event.target.value
        event.target.offsetParent.querySelector("p").style.display = "block"
        event.target.style.display = "none"
    }
    updateTitle(event) {
        store.dispatch(spotUpdater(parseInt(event.target.dataset.id) - 1, "title", event.target.value))
        window.localStorage.setItem("Hotspots", JSON.stringify(store.getState().hotspotCreator.hotspots));
        event.target.offsetParent.querySelector("h4").innerText = event.target.value
        event.target.offsetParent.querySelector("h4").style.display = "block"
        event.target.style.display = "none"
    } 

    render() {
        return (
            <React.Fragment>
                {
                    store.getState().hotspotCreator.hotspots.map((spot, index) => {
                        return (
                            <div className="hotspot" key={`a${this.keyGentr()}`} style={{left: spot.x, top: spot.y}}>
                                <div className="red-out" key={`b${this.keyGentr()}`}>
                                    <div className="red-in" key={`c${this.keyGentr()}`}></div>
                                    <div className="hotspot-pointer" key={`d${this.keyGentr()}`}></div>
                                </div>
                                <div className="hotspot-info no-spot pointer" key={`e${this.keyGentr()}`} >
                                    <div onDoubleClick={this.spotEditor} className="hotspot-info-title no-spot" key={`f${this.keyGentr()}`} >
                                        <h4 className="no-spot" onDoubleClick={this.showInput} key={`g${this.keyGentr()}`}>{spot.title}</h4>
                                        <input type="text" onBlur={this.updateTitle} data-id={index + 1} defaultValue={"Click out the input to save"} className="title-input editable-input no-spot" key={`h${this.keyGentr()}`}/>
                                    </div>      
                                    <div onDoubleClick={this.spotEditor} className="hotspot-info-body no-spot primary-text-color" key={`i${this.keyGentr()}`}>
                                        <p className="no-spot" onDoubleClick={this.showInput} key={`j${this.keyGentr()}`}>{spot.body}</p> 
                                        <input type="text" onBlur={this.updateBody} data-id={index + 1} defaultValue={"Click out the input to save"} className="body-input editable-input no-spot" key={`k${this.keyGentr()}`}/>
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
