import React, { useState, useEffect, useRef } from 'react';
import "./Support.css";

function Support() {
    const qaPairs = [
        {
        question:"Hi",
        answer : " Hello, How may I assist you "
        },
        {
            question: "How do I reset my password?",
            answer: "To reset your password, please visit our website and navigate to the 'Forgot Password' page."
        },
        {
            question: "Hello",
            answer: "How can I help you?"
        },
        {
            question: "How do I update my account information",
            answer: "You can update your account information by logging into your account and visiting the 'Account Settings' page."
        },
        {
            question: "how to create a task",
            answer: "you visite on  dashboard  , you can click  add new task button  fill the all field and definatily you can successfully  create  task"
        },
        {
            question: "how to create a new task",
            answer:"you are care"
        }
    ];

    const [chat, setChat] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);
    const [isWelcomeMessageDisplayed, setIsWelcomeMessageDisplayed] = useState(false);
    const chatboxRef = useRef(null);

    const createChatLi = (message, className) => {
        return (
            <li className={`chat ${className}`} key={message + className}>
                {className === "outgoing" ? (
                    <p>{message}</p>
                ) : (
                    <>
                        <span className="material-symbols-outlined">smart_toy</span>
                        <p>{message}</p>
                    </>
                )}
            </li>
        );
    };

    const generateResponse = (userMessage) => {
        const userQuestion = userMessage.toLowerCase();
        const matchedPair = qaPairs.find(pair => pair.question.toLowerCase() === userQuestion);
        const response = matchedPair ? matchedPair.answer : "I'm sorry, I don't have an answer for that question.";

        setChat(prevChat => [...prevChat, createChatLi(response, "incoming")]);
    };

    const handleChat = () => {
        if (!userMessage.trim()) return;
        const message = userMessage.trim();
        setChat(prevChat => [...prevChat, createChatLi(message, "outgoing")]);
        setUserMessage("");
        setTimeout(() => {
            setChat(prevChat => [
                ...prevChat,
                <li className="chat incoming thinking" key="thinking">
                    <p>Thinking...</p>
                </li>
            ]);
            setTimeout(() => {
                setChat(prevChat => prevChat.filter(chat => !chat.props.className.includes("thinking")));
                generateResponse(message);
            }, 600);
        }, 600);
    };

    useEffect(() => {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    }, [chat]);

    useEffect(() => {
        if (isChatbotVisible) {
            document.body.classList.add("show-chatbot");
            if (!isWelcomeMessageDisplayed) {
                setChat(prevChat => [
                    ...prevChat,
                    <li className="chat incoming" key="welcome">
                        <span className="material-symbols-outlined">smart_toy</span>
                        <p>Hi there 👋<br />How can I help you today?</p>
                    </li>
                ]);
                setIsWelcomeMessageDisplayed(true);
            }
        } else {
            document.body.classList.remove("show-chatbot");
        }
    }, [isChatbotVisible, isWelcomeMessageDisplayed]);

    useEffect(() => {
        setIsChatbotVisible(true);
    }, []);

    return (
        <div className='qr'>
            <h3>Scan QR code Ask me Anything...</h3>
            <div className='image-main'>
                <img src='pj1.jpg' alt="QR code" />
            </div>
            <div>
                <button className="chatbot-toggler" onClick={() => setIsChatbotVisible(!isChatbotVisible)}>
                    <span className="material-symbols-rounded">mode_comment</span>
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="chatbot">
                    <header>
                        <h2>Chatbot</h2>
                        <span className="close-btn material-symbols-outlined" onClick={() => setIsChatbotVisible(false)}>close</span>
                    </header>
                    <ul className="chatbox" ref={chatboxRef}>
                        {chat}
                    </ul>
                    <div className="chat-input">
                        <textarea
                            placeholder="Enter a message..."
                            spellCheck="false"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleChat();
                                }
                            }}
                            required
                        />
                        <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>send</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;
