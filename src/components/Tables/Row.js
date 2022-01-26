import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';

export default function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    let dataRow;

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

                <TableCell align="right">{row.Site_Alias}</TableCell>
                <TableCell align="right">{row.provider}</TableCell>
                <TableCell align="right">{new Date(row.date_registered).toLocaleDateString('en-gb')}</TableCell>
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