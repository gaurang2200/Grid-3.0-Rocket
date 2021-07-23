import React from 'react';
import './dashboard.css';
import Navbar from '../Navbar';
import DataTable from '../DataTable';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import SearchIcon from '@material-ui/icons/Search';
  

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
      width: '100%',
    },
    searchStyle: {
        width: '90%',
        maxWidth: "50rem",
        margin: '1em',
        backgroundColor: 'white',
        borderRadius: '5px',
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    
    return (
        <div className="w-full h-full whitebg mainContainer">
            <Navbar />
            <div id="dashboardBody">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField 
                        className={classes.searchStyle} 
                        size="small" id="outlined-basic" 
                        label="Search" 
                        variant="outlined"
                    />
                </form>
                <DataTable />
            </div>
        </div>
    );
}

export default Dashboard;