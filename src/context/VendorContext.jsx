import { createContext, useEffect, useReducer } from "react";
import { ACTIONS, initialState, vendorReducer } from "../reducer/vendorReducer";
import axios from "axios";
const BASEURL = 'https://vendor-manager-backend.onrender.com'
const VendorContext = createContext();

function VendorProvider({ children }) {
    const [state, dispatch] = useReducer(vendorReducer, initialState);

    const getVendorData = async (page) => {
        const url = `${BASEURL}/vendors`
        try {
            const res = await axios.get(url, {
                params: {
                    page
                }
            });
            if (res.status === 200) {
                const data = res.data;
                dispatch({ type: ACTIONS.GET_VENDOR_DATA, payload: { data } });

            }
        } catch (error) {
            console.error(error)
        }
    };

    const editVendorDetails = async (updatedDetails) => {
        const vendorId = updatedDetails.vendorId;
        const url = `${BASEURL}/vendors/${vendorId}`;
        try {
            const res = await axios.put(url, updatedDetails);
            if (res.status === 200) {
                const { data } = await res.data;

                const vendors = state.vendors.map((vendor) => vendor._id === data._id ? { ...data } : vendor)
                dispatch({ type: ACTIONS.UPDATE_VENDOR_DETAILS, payload: { vendors } });
                dispatch({ type: ACTIONS.TOGGLE_EDIT_FORM, payload: false })

            }
        } catch (error) {
            console.error(error)

        }
    };

    const deleteVendor = async (vendorId) => {
        try {
            const url = `${BASEURL}/vendors/${vendorId}`;
            const res = await axios.delete(url);
            if (res.status === 200) {
                const { data } = res.data;
                const vendors = state.vendors.filter((vendor) => vendor._id !== data._id);
                dispatch({ type: ACTIONS.DELETE_VENDOR, payload: { vendors } })
            }
        } catch (error) {
            console.error(error)

        }
    };

    const addNewVendor = async (details) => {
        try {
            const url = `${BASEURL}/vendors`;
            const res = await axios.post(url, details);
            if (res.status === 201) {
                const { vendors, currentPage, totalPages } = res.data
                dispatch({ type: ACTIONS.ADD_VENDOR, payload: { data: { vendors, currentPage, totalPages } } })
            }

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (state.vendors.length < 1) {
            getVendorData()
        }
    }, [state.vendors.length])

    return (
        <VendorContext.Provider value={{ state, dispatch, getVendorData, editVendorDetails, deleteVendor, addNewVendor }}>
            {children}
        </VendorContext.Provider>
    )
}
export default VendorProvider


export { VendorContext }