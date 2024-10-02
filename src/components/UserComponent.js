import React from 'react';

const UserComponent = ({ unBlockUser, blockUser, isBlock, id, firstName, lastName, email, mobile, role, createdAt, updatedAt, v }) => {
    return (
        <div className="form-container">
            <div className="form-field">
                <label className="form-label">ID:</label>
                <div className="form-value">{id}</div>
            </div>
            <div className="form-field">
                <label className="form-label">First Name:</label>
                <div className="form-value">{firstName}</div>
            </div>
            <div className="form-field">
                <label className="form-label">Last Name:</label>
                <div className="form-value">{lastName}</div>
            </div>
            <div className="form-field">
                <label className="form-label">Email:</label>
                <div className="form-value">{email}</div>
            </div>
            <div className="form-field">
                {isBlock? <button onClick={()=>unBlockUser(id)}>UnBlock</button>:
                    <button onClick={()=>blockUser(id)}>Block</button>}
            </div>
            <div className="form-field">
                <label className="form-label">Mobile:</label>
                <div className="form-value">{mobile}</div>
            </div>
            <div className="form-field">
                <label className="form-label">Role:</label>
                <div className="form-value">{role}</div>
            </div>
            <div className="form-field">
                <label className="form-label">Created At:</label>
                <div className="form-value">{createdAt}</div>
            </div>
            <div className="form-field">
                <label className="form-label">Updated At:</label>
                <div className="form-value">{updatedAt}</div>
            </div>
            <div className="form-field">
                <label className="form-label">__v:</label>
                <div className="form-value">{v}</div>
            </div>
        </div>
    );
};

export default UserComponent;
