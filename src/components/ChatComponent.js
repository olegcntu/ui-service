import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // Состояние для хранения истории сообщений


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


    const handleSendMessage = async () => {

        if (message.trim()) {
            setMessages((prevMessages) => [...prevMessages, message]);
            setMessage('');


            try {
                const response = await fetch('http://localhost:5026/user-and-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({message}),
                });

                if (!response.ok) {
                    throw new Error('Ошибка при отправке сообщения');
                }

                const result = await response.json();


                setMessages((prevMessages) => [...prevMessages, message]);
                setMessage('');
            } catch (error) {
                console.error('Error:', error);
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
                    <div className="chat-body" style={{ padding: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                        {}
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '5px' }}>
                                    {msg}
                                </div>
                            ))
                        ) : (
                            <p>No messages yet</p>
                        )}
                    </div>
                    <div className="chat-footer" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            style={{
                                marginLeft: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
