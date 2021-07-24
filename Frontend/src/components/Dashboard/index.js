import React from 'react';
import './dashboard.css';
import Navbar from '../Navbar';
import DataTable from '../DataTable';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIP from '../AddIPAdd'
// import SearchIcon from '@material-ui/icons/Search';


const exData = [{
    'id': 'fkalsdjf',
    'username': 'Admin Super Pro Max',
    'ipAdd': '127.0.0.1',
    'ipName': 'Local-IP',
    'desc': 'This is a local IP'
  },
  {
    'id': 'faiwenga',
    'username': 'Ubuntu',
    'ipAdd': '127.0.0.1',
    'ipName': 'Local IP',
    'desc': 'This is a local IP'
  },
  {
    'id': 'qpwetwm',
    'username': 'Windows',
    'ipAdd': '127.0.0.1',
    'ipName': 'Local IP Pro Max',
    'desc': 'This is a local IP'
  },
  
  {
    'id': 'wo3ejnklf',
    'username': 'Windows',
    'ipAdd': '127.0.0.1',
    'ipName': 'Local IP Pro Max',
    'desc': 'This is a local IP'
  },
  {
    'id': 'fasdkfna',
    'username': 'Administrator',
    'ipAdd': '127.0.0.1',
    'ipName': 'LocalIP Series S Max Pro',
    'desc': 'This is an Example of a long long long description'
  }
]  


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
                <AddIP table={exData} />
            </div>
        </div>
    );
}

export default Dashboard;