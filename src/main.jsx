import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline';
import VendorProvider from './context/VendorContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline>
      <VendorProvider>
        <App />
      </VendorProvider>
    </CssBaseline>
  </React.StrictMode>,
)
