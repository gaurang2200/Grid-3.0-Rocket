import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Icons
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    iconDivStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10%'
    },
    iconStyle: {
        color: '#F5A35C',
        width: '8vh'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const Logout = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [listEl, setListEl] = useState(true);
    const media = useMediaQuery('(min-width: 850px)')

    if(listEl && !media)
        setListEl(false);
    else if(!listEl && media)
        setListEl(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        axios.get(
            '/api/auth/logout',
            {withCredentials: true}
        ).then(res => {
            window.location = '/login';
        }).catch(err => {
            window.location = '/login';
        })
    }
    
    return (
        <div className={classes.iconDivStyle}>
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
                {
                    listEl?
                    <MenuItem component={Link} to="/login" onClick={handleLogout}>
                        <ExitToAppIcon />&nbsp;&nbsp;Logout
                    </MenuItem>
                    :
                    <div>
                        <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                            <HomeRoundedIcon />&nbsp;&nbsp;Dashboard
                        </MenuItem>
                        <MenuItem component={Link} to="/kibana" onClick={handleClose}>
                            <EqualizerRoundedIcon />&nbsp;&nbsp;Kibana
                        </MenuItem>
                        <MenuItem component={Link} to="/login" onClick={handleLogout}>
                            <ExitToAppIcon />&nbsp;&nbsp;Logout
                        </MenuItem>
                    </div>
                }
            </Menu>
        </div>
    );
}

export default Logout;