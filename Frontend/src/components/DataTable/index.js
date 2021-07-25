import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {
    IconButton, Table, TableBody, 
    TableCell, TableContainer, 
    TableHead, TableRow, Paper
} 
from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
    actionTextStyle:{
        fontSize: '0.9rem',
        color: 'black'
    }
}


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#333333',
        color: theme.palette.common.white,
        fontWeight: 'bold',
        width: '10rem',
    },
    body: {
        fontSize: 14,
        fontFamily: 'Roboto',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
        backgroundColor: 'white',
        borderBottom: 'gray solid 1px',
    },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
    iconStyle: {
        display: 'flex',
        borderRadius: '10px',
        padding: '0.3em 0.5em',
        marginRight: '1rem'
    },
    deleteStyle:{
        backgroundColor: '#FF375FDD'
    }
}))


const DataTable = (props) => {
    const classes = useStyles();

    return (
        <TableContainer style={{width: '100%', marginTop: '1rem'}} component={Paper}>
            <Table className={classes.table} aria-label="Data Table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>IP Name</StyledTableCell>
                        <StyledTableCell align="right">IP Address</StyledTableCell>
                        <StyledTableCell align="right">IP Username</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.table.map((row, index) => (
                    <StyledTableRow key={row.ip}>
                        <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                        <StyledTableCell align="right">{row.ip}</StyledTableCell>
                        <StyledTableCell align="right">{row.ipName}</StyledTableCell>
                        <StyledTableCell align="right" compnent="th" scope="row">{row.desc}</StyledTableCell>
                        <StyledTableCell style={{display: 'flex'}}>
                            <IconButton
                                onClick={() => props.handleDelete(row.ip)}
                                className={[classes.iconStyle, classes.deleteStyle].join(" ")}
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                            >
                                <DeleteIcon />
                                <span style={styles.actionTextStyle}>Delete</span>
                            </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;