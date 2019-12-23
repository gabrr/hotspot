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
    // the card placement will vary if the hotspot indicator is too close to the sides.
    // 170 the limit
    showCard(event) {
        const safeDistance = 170
        const windowWidth = window.innerWidth
        let id = event.target.dataset.id
        let spotLeftValue = document.querySelector(`.hotspot${id}`).offsetLeft
        if(spotLeftValue < safeDistance) {
            document.querySelector(`.hotspot-info${id}`).style.left = `${safeDistance - spotLeftValue}px`
            document.querySelector(`.card-pointer${id}`).style.left = `${spotLeftValue - 5}px`
        }
        
        let rightDistance = windowWidth - spotLeftValue
        if(rightDistance < safeDistance) {
            document.querySelector(`.hotspot-info${id}`).style.left = `${rightDistance - safeDistance}px`
            document.querySelector(`.card-pointer${id}`).style.left = `calc(100% - ${rightDistance}px + 5px)`
        }

       document.querySelector(`.hotspot-info${id}`).classList.add("show");
    }
        

    // if the user leaves the card information container, then it hides itself.
    hideCard(event) {
        event.target.classList.remove("show")
    }

    // when the user focus out the input in the card, this code will, update the redux store, update the localstorage,
    // update the the card's body text.
    updateBody(event) {
        const id = parseInt(event.target.dataset.id) //getting element id
        store.dispatch(spotUpdater(id - 1, "body", event.target.value)) //updating the redux store
        window.localStorage.setItem("Hotspots", JSON.stringify(store.getState().hotspotCreator.hotspots)) //updating the localstore
        document.querySelector(`.hotspot${id}`).classList.add("higher-indexed") //make sure, hovered element is on top of the others
        document.querySelector(`.card-p${id}`).innerText = event.target.value
        document.querySelector(`.card-p${id}`).style.display = "block"
        event.target.style.display = "none"
    }

    // when the user focus out the input in the card, this code will, update the redux store, update the localstorage,
    // update the the card's title.
    updateTitle(event) {
        const id = parseInt(event.target.dataset.id) //getting element id
        store.dispatch(spotUpdater(id - 1, "title", event.target.value)) //updating the redux store
        window.localStorage.setItem("Hotspots", JSON.stringify(store.getState().hotspotCreator.hotspots)) //updates the localstorage
        document.querySelector(`.hotspot${id}`).classList.remove("higher-indexed") 
        document.querySelector(`.card-h4${id}`).innerText = event.target.value
        document.querySelector(`.card-h4${id}`).style.display = "block"
        event.target.style.display = "none"
    } 

    render() {
        return (
            <React.Fragment>
                {
                    store.getState().hotspotCreator.hotspots.map((spot, index) => {
                        return (
                            <div className={`hotspot hotspot${index + 1}`} data-id={index + 1} key={`a${this.keyGentr()}`} style={{left: spot.x, top: spot.y}}>
                                <div className="red-in" key={`b${this.keyGentr()}`}>
                                    <div className="red-out no-spot" data-id={index + 1} onClick={this.showCard} key={`c${this.keyGentr()}`}></div>
                                </div>
                                <div className={`hotspot-info no-spot pointer hotspot-info${index + 1}`} data-id={index + 1} onMouseLeave={this.hideCard} key={`e${this.keyGentr()}`} >
                                    <div className={`card-pointer card-pointer${index + 1}`}></div>
                                    <div onDoubleClick={this.spotEditor} className="hotspot-info-title no-spot" key={`f${this.keyGentr()}`} >
                                        <h4 className={`no-spot card-h4${index + 1}`} data-id={index + 1} onDoubleClick={this.showInput} key={`g${this.keyGentr()}`}>{spot.title}</h4>
                                        <input className={`title-input editable-input no-spot" type="text card-title-input${index + 1}`} onBlur={this.updateTitle} data-id={index + 1} defaultValue={"Click out the input to save"}  key={`h${this.keyGentr()}`}/>
                                    </div>      
                                    <div onDoubleClick={this.spotEditor} className="hotspot-info-body no-spot primary-text-color" key={`i${this.keyGentr()}`}>
                                        <p className={`no-spot card-p${index + 1}`} data-id={index + 1} onDoubleClick={this.showInput} key={`j${this.keyGentr()}`}>{spot.body}</p> 
                                        <input  className={`body-input editable-input no-spot card-body-input${index + 1}`} type="text" onBlur={this.updateBody} data-id={index + 1} defaultValue={"Click out the input to save"} key={`k${this.keyGentr()}`}/>
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
