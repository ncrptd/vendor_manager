const ACTIONS = {
    GET_VENDOR_DATA: 'get-data',
    UPDATE_VENDOR_DETAILS: 'update-vendor-details',
    TOGGLE_EDIT_FORM: 'toggle-edit-form',
    TOGGLE_NEW_VENDOR_FORM: 'toggle-new-vendor-form',
    DELETE_VENDOR: 'delete-vendor',
    ADD_VENDOR: 'add-vendor'
}

const initialState = {
    vendors: [],
    currentPage: 1,
    totalPages: 0,
    editFormOpen: false,
    newVendorFormOpen: false,
};

export function vendorReducer(state, action) {
    switch (action.type) {
        case ACTIONS.GET_VENDOR_DATA: {
            const { vendors, currentPage, totalPages } = action.payload.data
            return { ...state, vendors, currentPage, totalPages }
        }
        case ACTIONS.ADD_VENDOR: {
            const { vendors, currentPage, totalPages } = action.payload.data
            return { ...state, vendors, currentPage, totalPages }

        }
        case ACTIONS.UPDATE_VENDOR_DETAILS: {
            return { ...state, vendors: action.payload.vendors }
        }

        case ACTIONS.DELETE_VENDOR: {
            return { ...state, vendors: action.payload.vendors }
        }
        case ACTIONS.TOGGLE_EDIT_FORM: {
            return { ...state, editFormOpen: action.payload }
        }
        case ACTIONS.TOGGLE_NEW_VENDOR_FORM: {
            return { ...state, newVendorFormOpen: action.payload }
        }

        default: {
            return state
        }
    }
}


export { ACTIONS, initialState }