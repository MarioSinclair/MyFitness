import React, { useState, useEffect } from "react";

export default function UserAuth() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const usernameFromStorage = localStorage.getItem('username');
        if (usernameFromStorage) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return isLoggedIn;
};