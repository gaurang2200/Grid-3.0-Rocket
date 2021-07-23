import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const exData = [{
    'username': 'Admin Super Pro Max',
    'add': '127.0.0.1',
    'ipName': 'Local-IP',
    'desc': 'This is a local IP'
},
{
    'username': 'Ubuntu',
    'add': '127.0.0.1',
    'ipName': 'Local IP',
    'desc': 'This is a local IP'
},
{
    'username': 'Windows',
    'add': '127.0.0.1',
    'ipName': 'Local IP Pro Max',
    'desc': 'This is a local IP'
},
{
    'username': 'Administrator',
    'add': '127.0.0.1',
    'ipName': 'LocalIP Series S Max Pro',
    'desc': 'This is an Example of a long long long description'
}
]


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#fccd33',
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    body: {
        minWidth: '10em',
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
    table: {
        minWidth: 700,
    },
    iconStyle: {
        display: 'flex',
    }
}))


const DataTable = () => {
    const classes = useStyles();

    return (
        <TableContainer style={{width: '90%', maxWidth: "50rem"}} component={Paper}>
            <Table className={classes.table} aria-label="Data Table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>IP Name</StyledTableCell>
                        <StyledTableCell align="right">IP Address</StyledTableCell>
                        <StyledTableCell align="right">IP Username</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {exData.map((row, index) => (
                    <StyledTableRow key={row.username}>
                        <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                        <StyledTableCell align="right">{row.add}</StyledTableCell>
                        <StyledTableCell align="right">{row.ipName}</StyledTableCell>
                        <StyledTableCell align="right" compnent="th" scope="row">{row.desc}</StyledTableCell>
                        <StyledTableCell style={{display: 'flex'}}>
                            <IconButton
                                className={classes.iconStyle}
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                className={classes.iconStyle}
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                            >
                                <DeleteIcon />
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