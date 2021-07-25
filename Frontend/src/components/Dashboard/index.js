import React from 'react';
import './dashboard.css';
import Navbar from '../Navbar';
import { makeStyles, Button, TextField } from '@material-ui/core';
import AddIP from '../AddIPAdd'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
      margin: '0 0 0 1em',
      display: 'flex'
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
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // getdata(1);
    }
    
    return (
        <div className="w-full h-full whitebg mainContainer">
            <Navbar />
            <div id="dashboardBody">
                <div className="w-full header">
                    <div style={styles.dashboardStyle}>Dashboard</div>
                    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <TextField 
                            className={classes.searchStyle} 
                            size="small" id="outlined-basic" 
                            label="Search" 
                            variant="outlined"
                        />
                        <Button variant="contained" color="primary" type='submit'>
                          Search
                        </Button>
                    </form>
                </div>
                <AddIP/>
            </div>
        </div>
    );
}

export default Dashboard;