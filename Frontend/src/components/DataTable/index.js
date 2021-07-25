import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {
    IconButton, Table, TableBody, 
    TableCell, TableContainer, 
    TableHead, TableRow, Paper, 
    Typography, TablePagination
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
        width: '15rem',
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
    const {table, handleDelete} = props;

    if(table === null){
        return (
            <TableContainer style={{width: '100%', marginTop: '1rem'}} component={Paper}>
            <Table className={classes.table} aria-label="Data Table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="right">IP Address</StyledTableCell>
                        <StyledTableCell align="right">Port Number</StyledTableCell>
                        <StyledTableCell align="right">Operating System</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{alignItems:'center'}}>
                <Typography variant="h6" gutterBottom>
                    No Data Available
                </Typography>
                </TableBody>
            </Table>
        </TableContainer>
        )
    } else 
    return (
        <div>
        <TableContainer style={{width: '100%', marginTop: '1rem'}} component={Paper}>
            <Table className={classes.table} aria-label="Data Table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="right">IP Address</StyledTableCell>
                        <StyledTableCell align="right">Port Number</StyledTableCell>
                        <StyledTableCell align="right">Operating System</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {table.map((row, index) => (
                    <StyledTableRow key={row.ip}>
                        <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                        <StyledTableCell align="right">{row.ip}</StyledTableCell>
                        <StyledTableCell align="right">{row.port}</StyledTableCell>
                        <StyledTableCell align="right">{row.os}</StyledTableCell>
                        <StyledTableCell style={{display: 'flex'}}>
                            <IconButton
                                onClick={() => handleDelete(row.ip)}
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
        </div>
    );
}

export default DataTable;