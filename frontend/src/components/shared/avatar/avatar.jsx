import React from 'react';
import './avatar.css'; 

const getInitials = (email) => {

    email = "zahra.zellazi@gmail.com" 
    const email1 = "zahra.zellazi@gmail.com" 

    //case 1
    const firstInitialParts=email1.split('@')[0]
    const firstletter=firstInitialParts.split('.')[0].charAt(0) 
    const secondletter=firstInitialParts.split('.')[1].charAt(0)
    console.log("ff",firstletter)
    console.log("secondletter",secondletter)

return firstletter.concat(secondletter).toUpperCase()
};

const Avatar = ({ email }) => {
    const initials = getInitials(email);

    return (
        <div className="avatar-container">
            <div className="avatar">
                {initials}
            </div>
        </div>
    );
};

export default Avatar;
