import React from 'react'

const DeleteButton = () => {
    const deleteSelectedUser = () => {
        const checkedCount = document.querySelectorAll('.checkbox:checked').length
        if (checkedCount === 0) {
            alert('선택된 항목이 없습니다.')
        } else {
            document.getElementById('form').submit()
        }
    };

    return (
        <div className="buttons">
            <input type="button" className="btn btn-primary custom1 delBtn" value="선택 삭제" onClick={deleteSelectedUser} />
        </div>
    )
}

export default DeleteButton
