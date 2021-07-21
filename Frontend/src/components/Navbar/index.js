import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './navbar.css';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    iconStyle: {
        width: 60
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

function Navbar(){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div id="nav">
            <div id="topBar">Asset Discoverer</div>
            <label for="nav-toggle" id="nav-toggle-button">
                <i className="material-icons">menu</i>
            </label>
            <div id="list">
                <ul id="before">
                    <a href="/dashboard"><li><HomeRoundedIcon />&nbsp;&nbsp;Dashboard</li></a>
                    <a href="/kibana"><li><EqualizerRoundedIcon />&nbsp;&nbsp;Kibana</li></a>
                    <a href="/api/ip/add"><li><AddCircleRoundedIcon />&nbsp;&nbsp;Add IP Addresses</li></a>
                </ul>
            </div>
            <IconButton
                className={classes.iconStyle}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <AccountCircleRoundedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    component={Link}
                    to="../login"
                    onClick={handleClose}
                >
                    <ExitToAppIcon />&nbsp;&nbsp;Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Navbar;