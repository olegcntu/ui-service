import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatRef = useRef(null);
    const chatBodyRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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

    // Прокрутка вниз при добавлении нового сообщения
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
            setMessage('');

            try {
                const response = await fetch('http://localhost:5026/user-and-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                if (!response.ok) {
                    throw new Error('Error sending message');
                }

                const result = await response.json();

                setMessages((prevMessages) => [...prevMessages, { text: result.reply, sender: 'ai' }]);
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [...prevMessages, { text: 'Error receiving response from server', sender: 'ai' }]);
            }
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <div onClick={toggleChat} style={{ cursor: 'pointer' }}>
                <div className="d-flex align-items-center gap-10 text-white">
                    <img src="/images/robotics.png" alt="chat icon" />
                    <div>AI<br /> chat</div>
                </div>
            </div>

            {isChatOpen && (
                <div className="chat-box" ref={chatRef}>
                    <div className="chat-header">
                        <h4>AI Chat</h4>
                        <h6>Here you can ask any questions and the AI assistant will help you</h6>
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
                    <div className="chat-body" ref={chatBodyRef}>
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: '10px',
                                        padding: '10px',
                                        backgroundColor: msg.sender === 'user' ? '#f1f1f1' : '#e0ffe0',
                                        borderRadius: '5px',
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))
                        ) : (
                            <p>No messages yet</p>
                        )}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
