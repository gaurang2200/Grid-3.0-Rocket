import React, {useState} from 'react';
import './addip.css';
import '../Navbar/navbar.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, AppBar, Tabs, Tab }
from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
          <div>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 1em',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '35em',
    width: '90%',
  },
  tabTextStyle: {
    color: 'black',
    fontFamily: 'Source Serif Pro'
  }
}));

const AddIP = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [state, setState] = useState({
        username: "",
        ipAdd: "",
        password: "",
        ipName: "",
        desc: ""
    })

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleValueChange = (e, value) => {
      setValue(value);
    }

    const handleChange = (e) => {
        let propName = e.target.name;
        let value = e.target.value;
        let type = e.target.type;

        if(type === 'file'){
          value = e.target.files[0];
        }
        setState(prevState => {
          return {...prevState, [propName]: value}
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // let {ipName, ipAdd, password, desc} = state;
        console.log(state);
    }

  return (
    <div className="w-full h-full">
      <a className="w-full h-full addButton" onClick={handleOpen}>
        <AddCircleRoundedIcon />&nbsp;&nbsp;Add IP Addresses
      </a>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add an IP Address</h2>
            <form onSubmit={handleOnSubmit}>

                <label className="inputBlock">
                    <span>Username</span>
                    <input className="w-full" type="text" name="ipName" required={true}
                    onChange={handleChange} 
                    placeholder="Administrator"/>
                </label>

                <label className="inputBlock ">
                    <span>IP Address</span>
                    <input className="w-full" type="text" name="ipAdd" required={true}
                    onChange={handleChange} 
                    placeholder="127.0.0.1"/>
                </label>

                <label className="inputBlock">
                    <span>IP Name</span>
                    <input className="w-full" type="text" name="ipName" required={true}
                    onChange={handleChange} 
                    placeholder="Local IP"/>
                </label>

                <label className="inputBlock ">
                  <AppBar position="static">
                    <Tabs value={value} onChange={handleValueChange}>
                      <Tab style={{color: 'black', fontFamily: 'Source Serif Pro', width: '40%', padding: 0}} label="Password" />
                      <Tab style={{color: 'black', fontFamily: 'Source Serif Pro', width: '40%', padding: 0}} label="PEM Key" />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <input className="w-full" type="password" name="password" required={true}
                      onChange={handleChange}
                      placeholder="**********"/>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <input className="w-full" type="file" name="password" required={true}
                      onChange={handleChange} accept=".pem" 
                      placeholder="**********"/>
                  </TabPanel>
                </label>

                <label className="inputBlock ">
                    <span>Description</span>
                    <input className="w-full" type="text" name="desc"
                    onChange={handleChange} 
                    placeholder="This is the local IP Address"/>
                </label>

                <input type="submit" value="Add IP" className="w-full buttonStyle" />
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddIP;