import React, { Component } from 'react'
import ReactDOM from "react-dom"
import store from "../../redux/store"
import createSpot from "../../redux/actions/spotCreator"
import {SpotItems} from "../../components/hotspotList"
import "./style.css"
import HotspotIcon from '../hotspotIcon'

export default class HotspotCreator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hotspotCreatorActive: false
        }

        this.createSpotBt = this.createSpotBt.bind(this)
    }

    // this inspector will highlight elements being hovered, to make it work, the elements 
    //must have the class "selectable-spot".
    inspector() {
        document.addEventListener("mouseover", (event) => {
            // if(this.state.hotspotCreatorActive) {
                if(event.target.classList.value.indexOf("selectable-spot") !== -1) {
                    event.target.classList.add("selected")
                }
            // }
        })
        document.addEventListener("mouseout", (event) => {
            // if(this.state.hotspotCreatorActive) {
                if(event.target.classList.value.indexOf("selectable-spot") !== -1) {
                    event.target.classList.remove("selected")
                }
            // }
        })
    }

    // To plot the hotspot indicator when user clicks. if the element has class "no-spot", it will not plot in that space.
    // it will not plot in inputs since the class could not prevent the plotting event. updates the localstorage and re-render the 
    // hotspots indicators and list with the new values on the store redux.
    spotPositionSetter() {        
        document.addEventListener("click", (event) => {
            if(this.state.hotspotCreatorActive) {
                if(event.target.classList.value.indexOf("no-spot") === -1 && event.target.tagName !== "INPUT") {
                    const title = "Click twice to edit the title"
                    const body = "Click twice to edit body text"
                    let browserData = JSON.parse(window.localStorage.getItem("Hotspots"));      
                    let id = browserData ? browserData.length + 1 : 1
                    const newSpot = [
                        {
                            title, 
                            body, 
                            x: event.clientX, 
                            y: event.clientY, 
                            id
                        }
                    ]
                    
                    store.dispatch(createSpot(newSpot))
                    ReactDOM.render(<HotspotIcon />, document.getElementById("spot-space"))
                    ReactDOM.render(<SpotItems/>, document.getElementById("list-items"))
                }
            }
            window.localStorage.setItem("Hotspots", JSON.stringify(store.getState().hotspotCreator.hotspots));
        })

    }

    createSpotBt() {
        if(!this.state.hotspotCreatorActive) {
            this.setState({
                hotspotCreatorActive: true
            })

            this.inspector()
            this.spotPositionSetter()
            // hotspot button creator with animation when editor mode is active
            document.getElementsByClassName("hotspot-creator-bt")[0].classList.add("active")
        } 
        else {
            // this.setState({
            //     hotspotCreatorActive: false
            // })
            // document.getElementsByClassName("hotspot-creator-bt")[0].classList.remove("active")
        }

    }

    // change button text to match the action it will handle.
    btName() {
        if(!this.state.hotspotCreatorActive) {
            return "Create Hotspot"
        } else {
            return "Stop Hotspot Creator"
        }
    }

    // when the component mount, the redux store gets updated from the localstorage.
    componentDidMount() {
        if(window.localStorage.getItem("Hotspots")) {
            store.dispatch(createSpot(JSON.parse(window.localStorage.getItem("Hotspots"))))
        }
        ReactDOM.render(<HotspotIcon />, document.getElementById("spot-space"))
        ReactDOM.render(<SpotItems/>, document.getElementById("list-items"))
    }

    render() {
        return (
            <React.Fragment>
                <div onClick={this.createSpotBt} className="hotspot-creator-bt no-spot white-text-color clickable selectable-spot">
                   {this.btName()}
                </div>
                <div id="spot-space"></div>
            </React.Fragment>
        )
    }
}
