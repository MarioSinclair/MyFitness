import React from 'react';
import { RiLogoutBoxLine } from '@remixicon/react';

export default function LogOut() {
    const handleLogOut = () =>{
        localStorage.removeItem('username');
        window.location.href = '/';
    }

    return (
        <>
            <div onClick={handleLogOut} className="login-container">
                Log Out
                <RiLogoutBoxLine
                size={25}
                className="login-icon"/>
            </div>
        </>
    );

}