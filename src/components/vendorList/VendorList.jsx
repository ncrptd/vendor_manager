import useVendor from '../../hooks/useVendor';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import EditForm from './EditForm';
import { ACTIONS } from '../../reducer/vendorReducer';
import AddVendorForm from './AddVendorForm';



const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'black',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function VendorList() {
    const { state, getVendorData, deleteVendor, dispatch } = useVendor();
    const { vendors, totalPages, editFormOpen, newVendorFormOpen } = state;
    const [page, setPage] = useState(1);

    const [formDetails, setFormDetails] = useState({
        vendorName: '',
        bankAccountNo: '',
        bankName: '',
        vendorId: ''
    });
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const handleFormDetails = (details) => {
        setFormDetails(details);
    }
    const handlePage = async (event, value) => {
        await getVendorData(value)
        setPage(value);
    }

    const handleEditFormOpen = async (vendor) => {
        dispatch({ type: ACTIONS.TOGGLE_EDIT_FORM, payload: true });
        const details = {
            vendorName: vendor.vendorName,
            bankAccountNo: vendor.bankAccountNo,
            bankName: vendor.bankName,
            vendorId: vendor._id
        }
        handleFormDetails(details)
    }
    const handleEditFormClose = () => {
        dispatch({ type: ACTIONS.TOGGLE_EDIT_FORM, payload: false })
    }

    const handleDeleteConfirmOpen = (vendorId) => {
        setDeleteConfirm(vendorId)
    }
    const handleDeleteConfirmClose = () => {
        setDeleteConfirm(false)
    }


    const handleNewVendorFormOpen = () => {
        dispatch({ type: ACTIONS.TOGGLE_NEW_VENDOR_FORM, payload: true })

    }
    const handleNewVendorFormClose = () => {
        dispatch({ type: ACTIONS.TOGGLE_NEW_VENDOR_FORM, payload: false })
    }
    return (
        <>
            <TableContainer sx={{ minHeight: 500, paddingBottom: '10px' }}>
                <Table sx={{ height: '100%' }} >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Vendor Name</StyledTableCell>
                            <StyledTableCell align="right">Bank Account No.</StyledTableCell>
                            <StyledTableCell align="right">Bank &nbsp;Name</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {vendors.map((vendor) => (
                            <TableRow
                                key={vendor._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {vendor.vendorName}
                                </TableCell>
                                <TableCell align="right">{vendor.bankAccountNo}</TableCell>
                                <TableCell align="right">{vendor.bankName}</TableCell>
                                <TableCell align='right'>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 2,

                                        }}
                                    >
                                        <EditIcon onClick={() => handleEditFormOpen(vendor)} sx={{
                                            '&:hover': {
                                                color: 'gray',
                                                cursor: 'pointer'
                                            },
                                        }} />
                                        <DeleteIcon onClick={() => handleDeleteConfirmOpen(vendor._id)} sx={{
                                            '&:hover': {
                                                color: 'gray',
                                                cursor: 'pointer'
                                            },
                                        }} />

                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {vendors.length > 0 && <Stack spacing={2} >
                    <Pagination count={totalPages} page={page} onChange={handlePage} sx={{ marginX: 'auto', display: 'flex', justifyItems: 'center', justifyContent: 'center', }} color="primary" />
                </Stack>}
            </TableContainer>
            <Dialog
                open={editFormOpen}
                onClose={handleEditFormClose}
                aria-labelledby="edit-vendor"
            >

                <DialogContent>
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        Edit Vendor Details
                    </DialogTitle>
                    <EditForm details={formDetails} />
                </DialogContent>
            </Dialog >


            <Dialog open={deleteConfirm}
                onClose={handleDeleteConfirmClose}
                aria-labelledby="delete-confirm"
            >
                <DialogContent>
                    <DialogTitle id="delete-confirm">
                        Are you sure you want to delete this item ?
                    </DialogTitle>
                    <DialogActions>
                        <Button autoFocus onClick={() => {
                            handleDeleteConfirmClose()
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            handleDeleteConfirmClose()
                            deleteVendor(deleteConfirm)
                        }}>Delete</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog open={newVendorFormOpen} onClose={handleNewVendorFormClose}
                aria-labelledby="new-vendor-form">
                <DialogContent>
                    <DialogTitle id="new-vendor-form" sx={{ textAlign: 'center' }}>
                        Create New Vendor
                    </DialogTitle>
                    <AddVendorForm />
                </DialogContent>
            </Dialog>

            <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: '15px', right: '20px' }}>
                <AddIcon onClick={handleNewVendorFormOpen} />
            </Fab>

        </>
    )
}

export default VendorList