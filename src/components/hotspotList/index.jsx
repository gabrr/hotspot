import React, { Component } from 'react'
import "./style.css"

export default class HotspotList extends Component {
    render() {
        return (
            <div id="hotspot-list">
                <header className="primary-text-color">Hotspot's list</header>
                <div className="item primary-text-color">
                    <div className="name">Hotspot #1</div>
                    <div className="delete-bt">Delete</div>
                </div>
                <div className="item primary-text-color">
                    <div className="name">Hotspot #1</div>
                    <div className="delete-bt">Delete</div>
                </div>
                <div className="item primary-text-color">
                    <div className="name">Hotspot #1</div>
                    <div className="delete-bt">Delete</div>
                </div>
            </div>

        )
    }
}
