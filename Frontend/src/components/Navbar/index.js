import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import './navbar.css';
import Logout from './logout';

function Navbar(){
    return (
        <div id="nav">
            <div id="topBar">Asset Discoverer</div>
            <div id="list">
                <ul id="before">
                    <a href="/dashboard"><li><HomeRoundedIcon />&nbsp;&nbsp;Dashboard</li></a>
                    <a href="/kibana"><li><EqualizerRoundedIcon />&nbsp;&nbsp;Kibana</li></a>
                </ul>
            </div>
            <Logout />
        </div>
    );
}

export default Navbar;