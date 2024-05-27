import React from 'react';
import AdminNavigationBar from './AdminNav';
import './adminhome.css'

function AdminHome() {
    return (
        <>
            <div>
                <AdminNavigationBar />
                <img src='./Images/scroll1.jpg' alt="Admin" className="admin-imagee"  />
            </div>
        </>
    );
}

export default AdminHome;

    