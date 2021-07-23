import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import './navbar.css';
import Logout from './logout';
import AddIP from '../AddIPAdd'

function Navbar(){
    return (
        <div id="nav">
            <div id="topBar">Asset Discoverer</div>
            <div id="list">
                <ul id="before">
                    <a href="/dashboard"><li><HomeRoundedIcon />&nbsp;&nbsp;Dashboard</li></a>
                    <a href="/kibana"><li><EqualizerRoundedIcon />&nbsp;&nbsp;Kibana</li></a>
                    <li><AddIP /></li>
                </ul>
            </div>
            <Logout />
        </div>
    );
}

export default Navbar;

//https://i-o-optimized-deployment-f3036f.kb.us-west1.gcp.cloud.es.io:9243/app/home