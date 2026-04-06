import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const SOCKET_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : window.location.origin;

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function Chat() {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [onlineCount, setOnlineCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.emit('join', {
      username: user?.username || 'Guest',
      userId: user?.id || null,
    });

    socket.on('message_history', (msgs) => {
      setMessages(msgs);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'instant' }), 50);
    });

    socket.on('new_message', (msg) => {
      setMessages(prev => [...prev, msg]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    });

    socket.on('online_count', setOnlineCount);
    socket.on('online_users', setOnlineUsers);

    return () => socket.disconnect();
  }, [user]);

  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;
    socketRef.current.emit('send_message', {
      username: user?.username || 'Guest',
      message: input.trim(),
    });
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '860px',
      margin: '0 auto',
      padding: '24px 16px 80px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            color: 'white',
            margin: 0,
            letterSpacing: '0.05em',
          }}>GLOBAL CHAT</h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.35)',
            margin: '2px 0 0',
            letterSpacing: '0.08em',
          }}>// REAL-TIME · ALL PLAYERS</p>
        </div>

        {/* Online count badge */}
        <button
          onClick={() => setShowUsers(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.35)',
            borderRadius: '8px',
            padding: '7px 14px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,197,94,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(34,197,94,0.1)'}
        >
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px #22c55e',
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 700,
            fontSize: '0.8rem',
            color: '#22c55e',
            letterSpacing: '0.05em',
          }}>{onlineCount} ONLINE</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>▾</span>
        </button>
      </div>

      {/* Online users dropdown */}
      {showUsers && onlineUsers.length > 0 && (
        <div style={{
          background: 'rgba(10,7,14,0.9)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '16px',
          backdropFilter: 'blur(12px)',
        }}>
          <p style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'rgba(34,197,94,0.7)',
            letterSpacing: '0.1em',
            margin: '0 0 8px',
          }}>ONLINE NOW</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {onlineUsers.map((u, i) => (
              <span key={i} style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.75)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '5px',
                padding: '3px 8px',
              }}>
                <span style={{ color: '#22c55e', marginRight: '4px' }}>●</span>{u}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{
        flex: 1,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '16px',
        overflowY: 'auto',
        minHeight: '400px',
        maxHeight: '55vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backdropFilter: 'blur(12px)',
        marginBottom: '14px',
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: "'VT323', monospace",
            fontSize: '1.2rem',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}>No messages yet. Say something!</div>
        )}
        {messages.map((msg) => {
          const isMe = msg.username === user?.username;
          return (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: isMe ? 'row-reverse' : 'row',
              gap: '10px',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: isMe ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.08)',
                border: isMe ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem',
              }}>⛏</div>
              <div style={{ maxWidth: '70%' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '6px',
                  marginBottom: '4px',
                  flexDirection: isMe ? 'row-reverse' : 'row',
                }}>
                  <span style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    color: isMe ? '#f97316' : 'rgba(255,255,255,0.65)',
                  }}>{msg.username}</span>
                  <span style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: '0.62rem',
                    color: 'rgba(255,255,255,0.22)',
                  }}>{timeAgo(msg.created_at)}</span>
                </div>
                <div style={{
                  background: isMe ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.06)',
                  border: isMe ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: isMe ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                  padding: '8px 12px',
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.45,
                  wordBreak: 'break-word',
                }}>
                  {msg.message}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '10px 12px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        backdropFilter: 'blur(12px)',
      }}>
        {!isAuthenticated && (
          <span style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.35)',
          }}>
            <a href="/login" style={{ color: '#f97316', textDecoration: 'none' }}>Login</a> to use your username —
          </span>
        )}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          maxLength={300}
          placeholder={isAuthenticated ? `Chat as ${user.username}...` : 'Chatting as Guest...'}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontFamily: "'Exo 2', sans-serif",
            fontSize: '0.85rem',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            background: input.trim() ? 'rgba(239,68,68,0.85)' : 'rgba(255,255,255,0.06)',
            border: 'none',
            borderRadius: '8px',
            padding: '7px 16px',
            color: input.trim() ? 'white' : 'rgba(255,255,255,0.3)',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: input.trim() ? 'pointer' : 'default',
            transition: 'background 0.15s',
            flexShrink: 0,
            letterSpacing: '0.05em',
          }}
        >SEND</button>
      </div>
    </div>
  );
}
