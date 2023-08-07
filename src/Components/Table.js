import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

export default function TableData(props) {
    const { tableHeight, columns, rows, page, rowsPerPage, handleChangeRowsPerPage, handleChangePage } = props

    const handleThisChangePage = (event, newPage) => {
        handleChangePage(newPage)
    }

    const handleThisChangeRowsPerPage = (event) => {
        handleChangeRowsPerPage(event)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: tableHeight, minHeight: tableHeight }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns &&
                                columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            width: column.maxWidth,
                                            background: 'rgb(229 231 235)',
                                            fontWeight: 'bold',
                                            fontFamily: 'Montserrat, sans-serif',
                                            textAlign: column.align,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow role="checkbox" tabIndex={-1} key={index}>
                                    {columns &&
                                        columns.map((column) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'info' ? (
                                                        <React.Fragment>{value}</React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </React.Fragment>
                                                    )}
                                                </TableCell>
                                            )
                                        })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows && rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleThisChangePage}
                onRowsPerPageChange={handleThisChangeRowsPerPage}
            />
        </Paper>
    )
}
