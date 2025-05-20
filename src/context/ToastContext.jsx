import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ToastContext = createContext();
export function ToastProvider ({children}) {
    const[toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' | 'error'
        vertical: 'top',
        horizontal: 'center',
    })
    const showToast = ({message, success = true}) => {
        setToast({
            open: true,
        message,
        severity: success ? 'success' : 'error',
        vertical: 'top',
        horizontal: 'center',
        })
    }
    
    const handleClose = () => {
        setToast(prev => ({...prev, open: false}))
    }
    return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: toast.vertical,
          horizontal: toast.horizontal,
        }}
        open={toast.open}
        onClose={handleClose}
        autoHideDuration={3000}
        key={toast.vertical + toast.horizontal}
      >
        <MuiAlert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }} variant="filled">
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
export function useToast() {
  return useContext(ToastContext);
}