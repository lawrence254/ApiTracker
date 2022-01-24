import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
const axios = require('axios');

function createData(Site_Alias, provider, date_registered, keyID, key, Rate_Limited, Rate_Per_Hour, User_Email) {
    return {
        Site_Alias,
        provider,
        date_registered,
        data: {
            key,
            Rate_Limited,
            Rate_Per_Hour,
            User_Email
        },
        keyID
    };
}


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    let dataRow;

    // let details = [];
    // for (let i = 0; i < row.length; i++) {
    //     console.log(row[i]);
    //     details.push(
    //         < TableRow key={row[i].data.Key}>
    //             <TableCell component="th" scope="row">{row[i].data.Key}</TableCell>
    //             <TableCell>{row[i].data.Rate_Limited}</TableCell>
    //             <TableCell align="right">{row[i].data.Rate_Per_Hour}</TableCell>
    //             <TableCell align="right">{row[i].data.User_Email}</TableCell>
    //         </TableRow>
    //     )
    // }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.Site_Alias}</TableCell>
                <TableCell align="right">{row.provider}</TableCell>
                <TableCell align="right">{row.date_registered}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Data
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>API Key</TableCell>
                                        <TableCell>Is Rate Limited?</TableCell>
                                        <TableCell align="right">Hourly Rate</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    < TableRow key={row.data.Key}>
                                        <TableCell component="th" scope="row">{row.data.Key}</TableCell>
                                        <TableCell>{row.data.Rate_Limited}</TableCell>
                                        <TableCell align="right">{row.data.Rate_Per_Hour}</TableCell>
                                        <TableCell align="right">{row.data.User_Email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        Site_Alias: PropTypes.string.isRequired,
        provider: PropTypes.string.isRequired,
        date_registered: PropTypes.string.isRequired,
        data: PropTypes.shape({
            Key: PropTypes.string.isRequired,
            Rate_Limited: PropTypes.string.isRequired,
            Rate_Per_Hour: PropTypes.string.isRequired,
            User_Email: PropTypes.string.isRequired,
        }),

    }).isRequired,
};


export default function CollapsibleTable() {
    const [response, setResponse] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:8080/results').then(resp => {
            setResponse(resp.data)
        })
    }, [])

    const rows = [];

    for (let res in response) {
        rows.push(response[res])
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>API</TableCell>
                        <TableCell align="right">Site</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.keyID} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
