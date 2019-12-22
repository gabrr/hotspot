import React, { Component } from 'react'
import store from "../../redux/store"
import spotUpdater from "../../redux/actions/spotUpdater"
import './style.css'

export default class HotspotIcon extends Component {
    constructor(props) {
        super(props)
        
        this.key = 0
    
    }
    // key generator for the html childs below.
    keyGentr() {
        return this.key++
    }

    // the card has inputs, h4 and p tags, in order to edit the text, double click, remove the p or h4, and
    // show the input, so the can edit the header or the body text.
    showInput(event) {
        event.target.nextElementSibling.style.display = "block"
        event.target.style.display = "none"
    }

    // the card will show up only if the user hover the hotspot indicator.
    showCard(event) {
        const safeDistance = 170
        const windowWidth = window.innerWidth
        const spotLeftValue = store.getState().hotspotCreator.hotspots[0].x
        if(spotLeftValue < safeDistance) {
            document.querySelector(".hotspot-info").style.left = `${safeDistance - spotLeftValue}px`
        }
        const rightDistance = windowWidth - spotLeftValue
        if(rightDistance < safeDistance) {
            document.querySelector(".hotspot-info").style.left = `${rightDistance - spotLeftValue}px`
        }
        

       

        event.target.offsetParent.offsetParent.querySelector(".hotspot-info").classList.add("show");
    }

    // the card placement will vary if the hotspot indicator is too close to the sides.
    // 170 the limit
        

    // if the user leaves the card information container, then it hides itself.
    hideCard(event) {
        event.target.classList.remove("show")
    }

    // when the user focus out the input in the card, this code will, update the redux store, update the localstorage,
    // update the the card's body text.
    updateBody(event) {
        store.dispatch(spotUpdater(parseInt(event.target.dataset.id) - 1, "body", event.target.value))
        window.localStorage.setItem("Hotspots", JSON.stringify(store.getState().hotspotCreator.hotspots));
        event.target.offsetParent.querySelector("p").innerText = event.target.value
        event.target.offsetParent.querySelector("p").style.display = "block"
        event.target.style.display = "none"
    }

    // when the user focus out the input in the card, this code will, update the redux store, update the localstorage,
    // update the the card's title.
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
                                <div className="red-in" key={`b${this.keyGentr()}`}>
                                    <div className="red-out" onMouseOver={this.showCard} key={`c${this.keyGentr()}`}></div>
                                </div>
                                <div className="hotspot-info no-spot pointer" onMouseLeave={this.hideCard} key={`e${this.keyGentr()}`} >
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
