import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react';
import useVendor from '../../hooks/useVendor';
import { ACTIONS } from '../../reducer/vendorReducer';

const initialFormErrorState = {
    vendorName: false,
    bankAccountNo: false,
    bankName: false,
    addressLine1: false,
    addressLine2: false,
    city: false,
    country: false,
    zipCode: false
}

function AddVendorForm() {
    const [formDetails, setFormDetails] = useState({
        vendorName: '',
        bankAccountNo: '',
        bankName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        zipCode: ''
    });
    const [formError, setFormError] = useState(initialFormErrorState);
    const { addNewVendor, dispatch } = useVendor();

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let key in formDetails) {
            if (formDetails[key] === "") {
                return setFormError(prev => ({ ...prev, [key]: true }))
            }
        }
        setFormError(initialFormErrorState);
        addNewVendor(formDetails);
        dispatch({ type: ACTIONS.TOGGLE_NEW_VENDOR_FORM, payload: false })

    }
    const handleFormDetails = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setFormDetails((prev) => {
            return { ...prev, [key]: value }
        })
    }
    return (
        <>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Stack spacing={2} width={500}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Vendor Name"
                        name='vendorName'
                        value={formDetails.vendorName}
                        onChange={handleFormDetails}
                        error={formError.vendorName}
                        autoFocus={true}

                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Bank Account No"
                        name='bankAccountNo'
                        type='number'
                        value={formDetails.bankAccountNo}
                        onChange={handleFormDetails}
                        error={formError.bankAccountNo}



                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Bank Name"
                        name='bankName'
                        value={formDetails.bankName}
                        onChange={handleFormDetails}
                        error={formError.bankName}

                    />
                    <TextField
                        required
                        id="outlined-required-addressLine1"
                        label="Address Line 1"
                        name="addressLine1"
                        value={formDetails.addressLine1}
                        onChange={handleFormDetails}
                        error={formError.addressLine1}

                    />
                    <TextField
                        required
                        id="outlined-required-addressLine2"
                        label="Address Line 2"
                        name="addressLine2"
                        value={formDetails.addressLine2}
                        onChange={handleFormDetails}
                        error={formError.addressLine2}

                    />
                    <TextField
                        required
                        id="outlined-required-city"
                        label="City"
                        name="city"
                        value={formDetails.city}
                        onChange={handleFormDetails}
                        error={formError.city}

                    />
                    <TextField
                        required
                        id="outlined-required-country"
                        label="Country"
                        name="country"
                        value={formDetails.country}
                        onChange={handleFormDetails}
                        error={formError.country}

                    />
                    <TextField
                        required
                        id="outlined-required-zipCode"
                        label="zipCode"
                        name="zipCode"
                        value={formDetails.zipCode}
                        onChange={handleFormDetails}
                        error={formError.zipCode}
                        type='number'

                    />
                    <Button type='submit' variant='contained' sx={{ bgColor: 'green' }}>Submit</Button>
                </Stack>
            </form>
        </>
    )
}

export default AddVendorForm