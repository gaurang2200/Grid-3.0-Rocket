import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import {
    IconButton, Table, TableBody,
    TableCell, TableHead, TableRow, Paper
}
from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    iconStyle: {
        borderRadius: '10px',
        padding: '0.3em 0.5em',
    },
    deleteStyle:{
        color: 'white',
        backgroundColor: '#FF5671'
    },
}))


const DataTable = (props) => {
    const classes = useStyles();
    const {rows, handleDelete} = props;
    if(rows === null){
        return (
            <Paper className="tableStyle">
            <Table aria-label="Data Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">IP Address</TableCell>
                        <TableCell align="right">Port Number</TableCell>
                        <TableCell align="right">Operating System</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>No Data Available</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
        )
    } else
    return (
        <Paper className="tableStyle">
            <Table aria-label="Data Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">IP Address</TableCell>
                        <TableCell align="right">Port Number</TableCell>
                        <TableCell align="right">Operating System</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.ip}>
                        <TableCell scope="row" style={{textTransform: 'capitalize'}}>
                        {row.username}</TableCell>
                        <TableCell align="right">{row.ip}</TableCell>
                        <TableCell align="right">{row.port}</TableCell>
                        <TableCell align="right">
                            {row.os === 'linux'? 
                                "Linux"
                                : "Windows"
                            }
                        </TableCell>
                        <TableCell>
                            <IconButton
                                onClick={() => handleDelete(row.ip, row.os)}
                                className={[classes.iconStyle, classes.deleteStyle].join(" ")}
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default DataTable;