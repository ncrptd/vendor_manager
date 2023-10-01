import { useContext } from "react";
import { VendorContext } from "../context/VendorContext";



function useVendor() {
    return (
        useContext(VendorContext)
    )
}

export default useVendor