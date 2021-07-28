import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './addip.css';
import '../Navbar/navbar.css';
import PropTypes from 'prop-types';

import {Modal, Backdrop, Fade, AppBar, Tabs, Tab, Select, MenuItem, makeStyles, FormControl, TextField }
from '@material-ui/core';
import DataTable from '../DataTable';
import Card from '../Card';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import axios from 'axios';


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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  searchStyle: {
    width: '100%',
    // maxWidth: "50rem",
    backgroundColor: 'white',
    borderRadius: '2px',
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
    const [page] = useState(1);
    const [state, setState] = useState({
        username: "",
        ip: "",
        port: "",
        password: "",
        os:""
    });
    const [data, setData] = useState(null);
    const[windows, setWindows] = useState(0);
    const[linux, setLinux] = useState(0);

    useEffect(() => {
      getdata(page);
    }, []);

    const getdata = (pg) => {
      axios.get(`/api/ip/all?page=${pg}`, { withCredentials: true })
      .then(res => {
        const notes = res.data.message;
        setData(notes);
        
        notes.map((row) => {
          if(row.os === 'linux')   setLinux(prev => prev+1);
          else    setWindows(prev => prev+1);
          return 0;
        })

      }).catch(err => {
      })
    }
    const [errMessage, setErrorMessage] = useState("");

    // const incrementPage = () => {
    //   setPage(page+1);
    //   getdata(page);
    // }
    // const decrementPage = () => {
    //   if(page > 1){
    //     setPage(page-1);
    //     getdata(page);
    //   }
    // }


    //error toast
    const error = (message) =>
    toast.error("❌\t" + message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const success = (message) =>
    toast.success("🦄\t" + message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

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
            value = atob(res);
            setState(prevState => {
              return {...prevState, password: value};
            })
          }).catch(err => {
          })
        } else {
          setState(prevState => {
            return {...prevState, [propName]: value}
          })
        }
    }

    // For deleting an existing entry
    const handleDelete = (ip, os) => {
      axios.post(
        `/api/ip/delete`,
        { ip: ip }
      ).then(res => {
        success("Item Deleted Successfully");

        if(os === 'linux')  setLinux(prev => prev-1);
        else  setWindows(prev => prev-1);

        const newData = [...data];
        const index = data.findIndex((entry) => entry.ip === ip);
        newData.splice(index, 1);
        setData(newData);

      }).catch(err => {
        error(err.response.data.message);
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
          desc: state.desc,
          os: state.os
        };

        axios.post(
          '/api/ip/add',
          newData
        ).then(res => {
          setErrorMessage("");
          success("IP Added Successfully");
          
          if(newData.os === 'linux')  setLinux(prev => prev+1);
          else  setWindows(prev => prev+1);

          const newTable = [...data, newData];
          setData(newTable)
        }).catch(err => {
          if(err.response.data.message === "Unauthorized"){
            error('Unauthorized');
            window.location = '/login';
          } else {
            setErrorMessage(err.response.data.message)
          }
        })
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
    }

  return (
    <div className="tableDiv">
      <div id="cardsDiv">
        <Card value={windows+linux} message="Total Assets"/>
        <Card value={windows} message="Windows Machines"/>
        <Card value={linux} message="Linux Machines"/>
      </div>
      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
          <TextField 
              className={classes.searchStyle}
              size="small" id="outlined-basic" 
              label="Search" 
              variant="outlined"
          />
      </form>
      <DataTable rows={data} handleDelete={handleDelete}/>
      <div className="w-full" id="buttonsDiv">
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
                <div className="errInfo">{errMessage}</div>
                <form onSubmit={handleOnSubmit}>

                    <label className="inputBlock">
                        <span>Username</span>
                        <input className="w-full" type="text" name="username" required={true}
                        onChange={handleChange} value={state.username}
                        placeholder="Administrator"/>
                    </label>

                    <label className="inputBlock ">
                        <span>IP Address</span>
                        <input className="w-full" type="text" name="ip" required={true}
                        onChange={handleChange} value={state.ip}
                        placeholder="127.0.0.1"/>
                    </label>

                    <label className="inputBlock">
                        <span>Port Number</span>
                        <input className="w-full" type="number" name="port" required={true}
                        onChange={handleChange} value={state.port}
                        placeholder="22"/>
                    </label>

                    <label>
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

                    <label className="inputBlock">
                      <FormControl className={[classes.formControl, "w-full"].join(' ')} required>
                        <span>Operating System</span>
                        <Select
                          value={state.os}
                          onChange={handleChange}
                          name="os"
                          displayEmpty
                          className={[classes.selectEmpty, "w-full"].join(' ')}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value={'linux'}>Linux</MenuItem>
                          <MenuItem value={'win64'}>Windows</MenuItem>
                        </Select>
                      </FormControl>
                    </label>

                    <input type="submit" value="Add IP" className="w-full buttonStyle" />
                </form>
              </div>
            </Fade>
          </Modal>
        </button>
        {/* <div style={{float:'right'}}>
          <button onClick={decrementPage} className="pageArrowStyle" value="<">&lt;</button>
          {page}
          <button onClick={incrementPage} className="pageArrowStyle" value="<">&gt;</button>
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddIP;