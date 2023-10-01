import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react';
import useVendor from '../../hooks/useVendor';

const initialFormErrorState = {
    vendorName: false,
    bankAccountNo: false,
    bankName: false
}
function EditForm({ details }) {
    const [formDetails, setFormDetails] = useState(details);
    const [formError, setFormError] = useState(initialFormErrorState);

    const { editVendorDetails } = useVendor();
    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let key in formDetails) {
            if (formDetails[key] === "") {
                return setFormError(prev => ({ ...prev, [key]: true }))
            }
        }
        setFormError(initialFormErrorState)
        editVendorDetails(formDetails)

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
                <Stack spacing={2} width={350}>
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
                    <Button type='submit' variant='contained' sx={{ bgColor: 'green' }}>Submit</Button>
                </Stack>
            </form>
        </>
    )
}

export default EditForm