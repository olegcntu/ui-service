import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatRef = useRef(null);

    // Функция для переключения видимости чата
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Закрытие чата при клике вне чата
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
                    <div>AI<br/> chat</div>
                </div>
            </div>


            {isChatOpen && (
                <div className="chat-box" ref={chatRef}>
                    <div className="chat-header">
                        <h4>Чат</h4>
                        <button onClick={() => setIsChatOpen(false)} style={{ cursor: 'pointer' }}>
                            Закрыть
                        </button>
                    </div>
                    <div className="chat-body">
                        <p>Добро пожаловать! Как я могу помочь вам?</p>
                    </div>
                    <div className="chat-footer">
                        <input type="text" placeholder="Напишите сообщение..." />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
