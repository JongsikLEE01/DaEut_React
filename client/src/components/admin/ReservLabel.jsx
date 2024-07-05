import React from 'react'

const ReservLabel = ({ htmlFor, className, children }) => (
    <label htmlFor={htmlFor} className={className}>
        {children}
    </label>
)

export default ReservLabel