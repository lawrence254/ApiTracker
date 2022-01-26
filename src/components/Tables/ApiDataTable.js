import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavBar } from '../../services/config/navigation';
import Row from './Row';
const axios = require('axios');

export default function ApiDataTable() {
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
        <div className="tableContainer">
            <NavBar />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>View Details</TableCell>
                            <TableCell>API</TableCell>
                            <TableCell>Site</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.keyID} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
