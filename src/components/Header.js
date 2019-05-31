import React, { Component } from 'react';
import '../styles/Header.css'
import logo from '../styles/piktogram.png'

class Header extends Component {
    render() {
        return (
            <div>
                <header className="d-flex flex-row justify-content-between">
                    <div className="d-flex ">
                        <img id="logoImg" src={logo} className="mr-1"/>
                        <h3>Piktogram</h3>
                    </div>
                    <input placeholder="Search"></input>
                    <div>
                        <nav>
                            <ul className="d-flex flex-row justify-content-around">
                                <li>Home</li>
                                <li>Notifications</li>
                                <li>Profile</li>
                            </ul>
                        </nav>
                    </div>

                </header>
            </div>
        );
    }
}

export default Header;
