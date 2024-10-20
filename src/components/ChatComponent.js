import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatRef = useRef(null);


    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleClickOutside = (event) => {
        if (chatRef.current && !chatRef.current.contains(event.target)) {
            setIsChatOpen(false);
        }
    };

    useEffect(() => {
        if (isChatOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isChatOpen]);

    return (
        <div style={{ position: 'relative' }}>
            <div onClick={toggleChat} style={{ cursor: 'pointer' }}>
                <div className="d-flex align-items-center gap-10  text-white">
                    <img src="/images/robotics.png" alt="chat icon" />
                    <div>AI<br /> chat</div>
                </div>
            </div>

            {isChatOpen && (
                <div className="chat-box" ref={chatRef}>
                    <div className="chat-header">
                        <h4>AI Chat</h4>
                        <h6>here you can ask any questions and the AI assistant will help you</h6>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            style={{
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                fontSize: '20px',
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                            }}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="chat-body">

                    </div>
                    <div className="chat-footer">
                        <input type="text" placeholder="Write a message..." />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
