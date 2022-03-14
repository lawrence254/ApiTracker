import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { NavBar } from '../../services/config/navigation';
const axios = require('axios');

export default function ApiDataTable() {
    // const [response, setResponse] = useState<DataResponse[]>([])
    const [response,setResponse]=useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startRow, setStartRow] = useState(0);
    const [maxPageRow, setMaxPageRow] = useState(rowsPerPage);
    
    
        let rows:any = [];
        let slicedRows:any=[];
    useEffect(() => {

        const fetchData=async()=>{
            let data=await  axios.get('http://localhost:8080/results')
            setResponse(data.data)
            rows=data.data;
        }

        fetchData()
    }, [])
console.log(rows)
    response.forEach((obj)=>{
        // rows.push(obj)
    })

    const sliceRows = (maxRows: number) => {
        let intermidiary = rows.slice(startRow, maxRows);
        slicedRows.push(intermidiary);
        console.log(intermidiary)
    }
    console.log(rows)
    console.log(slicedRows)
    
    
    const handleChangePage = (event: unknown,newPage:number) => {
        setPage(newPage);
        setStartRow(maxPageRow + 1);
        slicedRows.push(rows.slice(startRow, maxPageRow))
        // console.log(setPage(newPage))
    };
    // console.log(slicedRows)
// {slicedRows.map((row:any) => (
//                                 <Row key={row.keyID} row={row} />
//                             ))}
    const handleChangeRowsPerPage = (event:ChangeEvent<HTMLInputElement>) => {
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

