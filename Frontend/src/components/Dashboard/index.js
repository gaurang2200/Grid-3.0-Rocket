import React from 'react';
import './dashboard.css';
import Navbar from '../Navbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIP from '../AddIPAdd'
// import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
      margin: '0 0 0 1em',
    },
    searchStyle: {
        width: '90%',
        maxWidth: "50rem",
        margin: '1em 0 1em 1em',
        backgroundColor: 'white',
        borderRadius: '5px',
    },
}));

const styles = {
    dashboardStyle: {
        width: '90%',
        fontSize: '2rem',
        textAlign: 'start'
    }
}

const Dashboard = () => {
    const classes = useStyles();
    
    return (
        <div className="w-full h-full whitebg mainContainer">
            <Navbar />
            <div id="dashboardBody">
                <div className="w-full header">
                    <div style={styles.dashboardStyle}>Dashboard</div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField 
                            className={classes.searchStyle} 
                            size="small" id="outlined-basic" 
                            label="Search" 
                            variant="outlined"
                        />
                    </form>
                </div>
                <AddIP />
            </div>
        </div>
    );
}

export default Dashboard;