import React, { Component } from 'react'
import "./style.css"
// import ReactDOM from "react-dom"
// import HotspotIcon from '../hotspotIcon'

export default class HotspotCreator extends Component {

    inspector() {
        document.addEventListener("mouseover", (event) => {
            if(event.target.classList.value.indexOf("selectable-spot") !== -1) {
                event.target.classList.add("selected")
            }
        })
        document.addEventListener("mouseout", (event) => {
            if(event.target.classList.value.indexOf("selectable-spot") !== -1) {
                event.target.classList.remove("selected")
            }
        })
    }

    // spotPositionSetter() {
    //     document.addEventListener("click", (event) => {
    //         ReactDOM.render(<HotspotIcon />, document.getElementById("root"))
    //         // event.screenX, event.screenY
    //         // console.log()
    //     })
    // }

    componentDidMount() {
        this.inspector()
        // this.spotPositionSetter()
    }

    render() {
        return (
            <React.Fragment>
                <div className="hotspot-creator-bt white-text-color clickable selectable-spot">
                    Create Hotspot
                </div>
            </React.Fragment>
        )
    }
}
