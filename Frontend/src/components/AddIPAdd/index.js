import React, {useState} from 'react';
import './addip.css';
import '../Navbar/navbar.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, AppBar, Tabs, Tab }
from '@material-ui/core';
import DataTable from '../DataTable';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import axios from 'axios';
import ipData from '../GetData';


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
}));

const styles = {
  tabTextStyle: {
    color: 'black', 
    fontFamily: 'Source Serif Pro', 
    width: '40%', 
    padding: 0,
  }
}

function readFileDataAsBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
          resolve(event.target.result);
      };

      reader.onerror = (err) => {
          reject(err);
      };

      reader.readAsDataURL(file);
  });
}


function AddIP(){
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [state, setState] = useState({
        username: "",
        ip: "",
        port: 22,
        password: "",
        ipName: "",
        desc: "",
        os:""
    });
    const [data, setData] = useState(ipData);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleValueChange = (e, value) => {
      setValue(value);
    };

    const handleChange = (e) => {
        e.preventDefault();
        let propName = e.target.name;
        let value = e.target.value;
        let type = e.target.type;

        if(type === 'file'){
          value = e.target.files[0];
          readFileDataAsBase64(value)
          .then(res => {
            res = res.replace('data:application/octet-stream;base64,', '');
            value = res;
          }).catch(err => {
            console.log(err.message);
          })
        }
        setState(prevState => {
          return {...prevState, [propName]: value}
        })
    }
    
    // For deleting an existing entry
    const handleDelete = (ip) => {
      console.log(ip);
      const newData = [...data];
      const index = data.findIndex((entry) => entry.ip === ip);

      axios.post(
        `/api/ip/delete`,
        { ip: ip }
      ).then(res => {
        console.log("Item Deleted Successfully");
        newData.splice(index, 1);
        setData(newData);
      }).catch(err => {
        console.log(err.response.data.message);
      })

    }

    // For adding a new Entry
    const handleOnSubmit = (e) => {
        e.preventDefault();

        const newData = {
          username: state.username,
          ip: state.ip,
          password: state.password,
          port: state.port,
          ipName: state.ipName,
          desc: state.desc,
          os: state.os
        };
        
        axios.post(
          '/api/ip/add',
          newData
        ).then(res => {
          console.log(res.data)
          const newTable = [...data, newData];
          setData(newTable)
        }).catch(err => {
          console.log(err.response.data)
          if(err.response.data.message === "Unauthorized")
            window.location = '/login';
          else {
            
          }
        })
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <DataTable table={data} handleDelete={handleDelete}/>
      <button className="addButtonStyle">
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
                      <input className="w-full" type="text" name="username" required={true}
                      onChange={handleChange} 
                      placeholder="Administrator"/>
                  </label>

                  <label className="inputBlock ">
                      <span>IP Address</span>
                      <input className="w-full" type="text" name="ip" required={true}
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
                        <Tab style={styles.tabTextStyle} label="Password" />
                        <Tab style={styles.tabTextStyle} label="PEM Key" />
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
      </button>
    </div>
  );
}

export default AddIP;