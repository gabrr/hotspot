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

    spotPositionSetter() {        
        document.addEventListener("click", (event) => {
            if(this.state.hotspotCreatorActive) {
                if(event.target.classList.value.indexOf("no-spot") === -1) {
                    let title = "Just a test"
                    let body = "This is a body for a test"
                    window.localStorage.setItem(Math.random() * .3.toPrecision(5), "spot");

                    let id = window.localStorage.length;
                    store.dispatch(createSpot(title, body, event.screenX, event.screenY, id))
                    ReactDOM.render(<HotspotIcon />, document.getElementById("spot-space"))
                    ReactDOM.render(<SpotItems/>, document.getElementById("list-items"))
                }
            }
        })
    }

    createSpotBt() {
        if(!this.state.hotspotCreatorActive) {
            this.setState({
                hotspotCreatorActive: true
            })

            this.inspector()
            this.spotPositionSetter()
            document.getElementsByClassName("hotspot-creator-bt")[0].classList.add("active")
        } 
        else {
            // this.setState({
            //     hotspotCreatorActive: false
            // })
            // document.getElementsByClassName("hotspot-creator-bt")[0].classList.remove("active")
        }

    }

    btName() {
        if(!this.state.hotspotCreatorActive) {
            return "Create Hotspot"
        } else {
            return "Stop Hotspot Creator"
        }
    }

    componentDidMount() {
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
