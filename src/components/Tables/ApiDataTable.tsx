import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { DataResponse } from '../../interfaces/ApiModel';
import { NavBar } from '../../services/config/navigation';
import Row from './Row';
const axios = require('axios');

export default function ApiDataTable() {
    const [sliced, setSliced] = useState([])
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startRow, setStartRow] = useState(0);
    const [maxPageRow, setMaxPageRow] = useState(rowsPerPage);


    let rows: any = [];
    let slicedRows: any = [];
    useEffect(() => {

        const fetchData = async () => {
            const { data: response } = await axios.get('http://localhost:8080/results')
            console.log(response)
            setData(response)
        }

        fetchData()
    }, [])

    const sliceRows = (maxRows: number) => {
        let intermidiary = data.slice(startRow, maxRows);
        setSliced(intermidiary)
        console.log(intermidiary)
    }


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        setStartRow(maxPageRow + 1);
        slicedRows.push(rows.slice(startRow, maxPageRow))
        // console.log(setPage(newPage))
    };
    console.log(sliced)

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        sliceRows(parseInt(event.target.value, 10));
        setMaxPageRow(parseInt(event.target.value, 10));
    };

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
                            {sliced.map((row: any) => (
                                <Row key={row.keyID} row={row} />
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

