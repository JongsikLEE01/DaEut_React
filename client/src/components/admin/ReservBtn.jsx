import React from 'react'

const ReservBtn = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);

export default ReservBtn