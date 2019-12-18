import React, { Component } from 'react'
import './style.css'

export default class HotspotIcon extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="hotspot">
                    <div className="red-out">
                        <div className="red-in"></div>
                        <div className="hotspot-pointer"></div>
                    </div>
                    <div className="hotspot-info pointer">
                        <div className="hotspot-info-title">
                            How to install
                        </div>
                        <div className="hotspot-info-body primary-text-color">
                            It takes only 5 minutes to install the script into your website.
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
