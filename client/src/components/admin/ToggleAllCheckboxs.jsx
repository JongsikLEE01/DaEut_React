import React from 'react';

const ToggleAllCheckboxes = ({ toggleAllCheckboxes }) => {
    return (
        <input type="checkbox" className="checkbox" id="allCheck" onClick={toggleAllCheckboxes} />
    );
};

export default ToggleAllCheckboxes;
