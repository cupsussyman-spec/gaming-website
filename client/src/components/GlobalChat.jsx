import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const POLL_INTERVAL = 10 * 60 * 1000; // 10 minutes

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function GlobalChat() {
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const lastCountRef = useRef(0);

  const fetchMessages = async (scrollToBottom = false) => {
    try {
      const { data } = await api.get('/chat');
      setMessages(data);
      if (!open && data.length > lastCountRef.current) {
        setUnread(prev => prev + (data.length - lastCountRef.current));
      }
      lastCountRef.current = data.length;
      if (scrollToBottom) {
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } catch {
      // silent fail
    }
  };

  // Initial fetch + poll every 10 min
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => fetchMessages(), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'instant' }), 60);
    }
  }, [open]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    setError('');
    try {
      const { data: newMsg } = await api.post('/chat', { message: input.trim() });
      setMessages(prev => [...prev, newMsg]);
      lastCountRef.current += 1;
      setInput('');
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to send. Try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '76px',
          right: '20px',
          width: '320px',
          maxHeight: '440px',
          background: 'rgba(10, 7, 14, 0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 500,
          boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(239,68,68,0.08)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>⛏</span>
              <span style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.8rem',
                color: 'white',
                letterSpacing: '0.08em',
              }}>GLOBAL CHAT</span>
              <span style={{
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.35)',
                fontFamily: "'Exo 2', sans-serif",
              }}>// {messages.length} msgs</span>
            </div>
            <button
              onClick={() => fetchMessages(true)}
              title="Refresh"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '2px 4px',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >↻</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          }}>
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: "'Exo 2', sans-serif",
                fontSize: '0.75rem',
                marginTop: '40px',
              }}>No messages yet. Say something!</div>
            )}
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                {msg.avatar_url ? (
                  <img src={msg.avatar_url} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, marginTop: '2px' }}>⛏</div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '2px' }}>
                    <span style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      color: msg.username === user?.username ? '#f97316' : 'rgba(255,255,255,0.75)',
                    }}>{msg.username}</span>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Exo 2', sans-serif" }}>{timeAgo(msg.created_at)}</span>
                  </div>
                  <div style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.8)',
                    wordBreak: 'break-word',
                    lineHeight: 1.4,
                  }}>{msg.message}</div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}>
            {error && (
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: '0.7rem',
                color: '#ef4444',
                marginBottom: '6px',
              }}>{error}</div>
            )}
            {isAuthenticated ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  maxLength={300}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '7px 10px',
                    color: 'white',
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: '0.78rem',
                    outline: 'none',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  onClick={handleSend}
                  disabled={sending || !input.trim()}
                  style={{
                    background: input.trim() ? 'rgba(239,68,68,0.85)' : 'rgba(255,255,255,0.07)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    color: input.trim() ? 'white' : 'rgba(255,255,255,0.3)',
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: input.trim() ? 'pointer' : 'default',
                    transition: 'background 0.15s',
                    flexShrink: 0,
                  }}
                >↑</button>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                fontFamily: "'Exo 2', sans-serif",
                fontSize: '0.73rem',
                color: 'rgba(255,255,255,0.35)',
                padding: '4px 0',
              }}>
                <a href="/login" style={{ color: '#f97316', textDecoration: 'none' }}>Login</a> to chat
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Global Chat"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: open ? 'rgba(239,68,68,0.9)' : 'rgba(15,10,20,0.92)',
          border: '1px solid rgba(239,68,68,0.5)',
          color: 'white',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 500,
          boxShadow: open ? '0 0 20px rgba(239,68,68,0.4)' : '0 4px 20px rgba(0,0,0,0.6)',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(239,68,68,0.3)'; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'rgba(15,10,20,0.92)'; }}
      >
        {open ? '✕' : '💬'}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '0.65rem',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(10,7,14,0.8)',
          }}>{unread > 9 ? '9+' : unread}</span>
        )}
      </button>
    </>
  );
}
