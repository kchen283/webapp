// Message.js
import React from 'react';
import './Chat.css';

const Message = ({ type, content }) => {
    return (
        <div className={`message ${type}`}>
            {content}
        </div>
    );
}

export default Message;
