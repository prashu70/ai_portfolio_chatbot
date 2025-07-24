'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  content: string;
  role: 'USER' | 'ASSISTANT';
  timestamp: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !socketRef.current) {
      // Initialize socket connection
      socketRef.current = io('http://localhost:3001');
      
      socketRef.current.on('connect', () => {
        setIsConnected(true);
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);
        socketRef.current?.emit('join_session', { sessionId: newSessionId });
      });

      socketRef.current.on('session_joined', (data) => {
        setMessages(data.messages || []);
        if (data.messages.length === 0) {
          // Add welcome message if no previous conversation
          const welcomeMessage: Message = {
            id: 'welcome',
            content: "Hello! I'm Prashu's AI assistant. I can help you learn about his skills, experience, and projects. What would you like to know?",
            role: 'ASSISTANT',
            timestamp: new Date().toISOString()
          };
          setMessages([welcomeMessage]);
        }
      });

      socketRef.current.on('message_saved', (message) => {
        // User message saved confirmation
      });

      socketRef.current.on('ai_response', (message) => {
        setMessages(prev => [...prev, message]);
        setIsTyping(false);
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
      });

      socketRef.current.on('error', (error) => {
        console.error('Socket error:', error);
        setIsTyping(false);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !socketRef.current || !isConnected) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: inputMessage,
      role: 'USER',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    socketRef.current.emit('chat_message', { message: inputMessage });
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  const chatbotStyles = {
    chatButton: {
      position: 'fixed' as const,
      bottom: '24px',
      right: '24px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: isOpen ? '#ef4444' : '#2563eb',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      animation: isOpen ? 'none' : 'bounce 2s infinite'
    },
    chatWindow: {
      position: 'fixed' as const,
      bottom: '90px',
      right: '24px',
      width: '384px',
      height: '500px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column' as const,
      zIndex: 999,
      animation: 'slideUp 0.3s ease-out'
    },
    header: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '16px',
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto' as const,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    messageWrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px'
    },
    userMessageWrapper: {
      flexDirection: 'row-reverse' as const,
      justifyContent: 'flex-start'
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      color: 'white',
      flexShrink: 0
    },
    botAvatar: {
      backgroundColor: '#6b7280'
    },
    userAvatar: {
      backgroundColor: '#2563eb'
    },
    message: {
      padding: '12px',
      borderRadius: '12px',
      maxWidth: '80%',
      fontSize: '14px',
      lineHeight: '1.5'
    },
    botMessage: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    userMessage: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    inputContainer: {
      padding: '16px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      gap: '8px'
    },
    input: {
      flex: 1,
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none'
    },
    sendButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    typingIndicator: {
      display: 'flex',
      gap: '4px',
      padding: '12px'
    },
    typingDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#9ca3af',
      borderRadius: '50%',
      animation: 'typing 1.4s infinite'
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={chatbotStyles.chatButton}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={chatbotStyles.chatWindow}>
          {/* Header */}
          <div style={chatbotStyles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ ...chatbotStyles.avatar, ...chatbotStyles.botAvatar }}>
                🤖
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>AI Assistant</h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                  {isConnected ? 'Online' : 'Connecting...'}
                </p>
              </div>
            </div>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: isConnected ? '#10b981' : '#f59e0b'
            }}></div>
          </div>

          {/* Messages */}
          <div style={chatbotStyles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...chatbotStyles.messageWrapper,
                  ...(message.role === 'USER' ? chatbotStyles.userMessageWrapper : {})
                }}
              >
                <div style={{
                  ...chatbotStyles.avatar,
                  ...(message.role === 'USER' ? chatbotStyles.userAvatar : chatbotStyles.botAvatar)
                }}>
                  {message.role === 'USER' ? '👤' : '🤖'}
                </div>
                
                <div style={{
                  ...chatbotStyles.message,
                  ...(message.role === 'USER' ? chatbotStyles.userMessage : chatbotStyles.botMessage)
                }}>
                  <div 
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  />
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={chatbotStyles.messageWrapper}>
                <div style={{ ...chatbotStyles.avatar, ...chatbotStyles.botAvatar }}>
                  🤖
                </div>
                <div style={{ ...chatbotStyles.message, ...chatbotStyles.botMessage }}>
                  <div style={chatbotStyles.typingIndicator}>
                    <div style={{ ...chatbotStyles.typingDot, animationDelay: '0s' }}></div>
                    <div style={{ ...chatbotStyles.typingDot, animationDelay: '0.2s' }}></div>
                    <div style={{ ...chatbotStyles.typingDot, animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={chatbotStyles.inputContainer}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Prashu's experience..."
              style={chatbotStyles.input}
              disabled={!isConnected}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || !isConnected}
              style={{
                ...chatbotStyles.sendButton,
                opacity: (!inputMessage.trim() || !isConnected) ? 0.5 : 1
              }}
            >
              ➤
            </button>
          </div>
          
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            textAlign: 'center',
            margin: '8px 16px',
            padding: 0
          }}>
            Ask about skills, experience, projects, or contact info
          </p>
        </div>
      )}
    </>
  );
}

