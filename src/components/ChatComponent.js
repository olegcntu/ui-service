import React, { useState, useEffect, useRef } from 'react';
import API_ROUTES from "../api";

const ChatComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [position, setPosition] = useState({ x: -100, y: 30 });
    const [isDragging, setIsDragging] = useState(false);
    const [isThinking, setIsThinking] = useState(false); // Состояние для анимации
    const chatRef = useRef(null);
    const chatBodyRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleMouseDown = (event) => {
        if (chatRef.current && chatRef.current.contains(event.target)) {
            setIsDragging(true);
            dragOffset.current = {
                x: event.clientX - position.x,
                y: event.clientY - position.y,
            };
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            setPosition({
                x: event.clientX - dragOffset.current.x,
                y: event.clientY - dragOffset.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        const token = localStorage.getItem('token') || null;
        const email = localStorage.getItem('userEmail') || null;

        if (message.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
            setMessage('');
            setIsThinking(true);

            try {
                const response = await fetch(`${API_ROUTES.AI_SERVICE}user-and-question`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        message,
                        token,
                        email,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error sending message');
                }

                const result = await response.json();

                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: result.reply, // Основной текст ответа
                        products: result.products, // Массив продуктов с названиями и ссылками
                        sender: 'ai'
                    }
                ]);

            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [...prevMessages, { text: 'Error receiving response from server', sender: 'ai' }]);
            } finally {
                setIsThinking(false); // Выключаем состояние "ИИ думает"
            }
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <div onClick={toggleChat} className="chat-toggle">
                <img src="/images/robotics.png" alt="Chat Icon" />
            </div>

            {isChatOpen && (
                <div
                    className="chat-box"
                    ref={chatRef}
                    style={{
                        position: 'absolute',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <div className="chat-header">
                        <h4>Chat Assistant</h4>
                        <button className="chat-close-btn" onClick={() => setIsChatOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="chat-body" ref={chatBodyRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <p>{msg.text}</p>
                                {msg.products && msg.products.length > 0 && (
                                    <ul>
                                        {msg.products.map((product, productIndex) => (
                                            <li key={productIndex}>
                                                <a
                                                    href={product.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {product.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                        {isThinking && (
                            <div className="chat-message ai thinking">
                                <span>AI is thinking...</span>
                                <div className="loading-dots">
                                    <span>.</span>
                                    <span>.</span>
                                    <span>.</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
