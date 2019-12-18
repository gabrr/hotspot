import React, { Component } from 'react'
import "./style.css"
import logo from "../../assets/logo.png"

export default class Navbar extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="grey-hr">
                    <div className="logo">
                        <img src={logo} alt="conpass logo"/>
                    </div>
                    <ul className="navbar-links">
                        <li className="primary-text-color">Fake link 1</li>
                        <li className="primary-text-color">Fake link 2</li>
                        <li className="primary-text-color">Fake link 3</li>
                        <li className="primary-text-color">Fake link 4</li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}
