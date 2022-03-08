import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { DataResponse } from '../../interfaces/ApiModel';
import { NavBar } from '../../services/config/navigation';
import Row from './Row';
const axios = require('axios');

export default function ApiDataTable() {
    const [response, setResponse] = useState<DataResponse[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startRow, setStartRow] = useState(0);
    const [maxPageRow, setMaxPageRow] = useState(rowsPerPage);
    useEffect(() => {

        axios.get('http://localhost:8080/results').then((resp:DataResponse[])=> {
            setResponse(resp)
        })
    }, [])
    
    console.log(response)

    const rows:DataResponse[] = [];
    let slicedRows:any=[];
    
    for (let res in response) {
        rows.push(response[res])
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage:number) => {
        setPage(newPage);
        setStartRow(maxPageRow + 1);
        slicedRows.push(rows.slice(startRow, maxPageRow))
        console.log(setPage(newPage))
    };

    const handleChangeRowsPerPage = (event:ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        sliceRows(parseInt(event.target.value, 10));
        setMaxPageRow(parseInt(event.target.value, 10));
    };
    
    const sliceRows = (maxRows: number) => {
        slicedRows.push(rows.slice(startRow, maxRows));
    }
    return (
        <div className="tableContainer">
            <NavBar />
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
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
                            {slicedRows.map((row:DataResponse['results']) => (
                                <Row key={row.keyID} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
