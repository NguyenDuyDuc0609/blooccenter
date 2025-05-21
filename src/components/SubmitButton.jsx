import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export const SubmitButton = ({onClick}) => {
  return (
    <div>
        <button type="button" className="btn btn-danger" onClick={onClick}>Đăng ký</button>
    </div>
  )
}
