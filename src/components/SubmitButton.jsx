import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export const SubmitButton = ({ onClick, children }) => {
  return (
    <div>
      <button type="button" className="btn btn-danger" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
