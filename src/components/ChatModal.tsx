import { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';

type ChatModalProps = {
  isOpen: boolean;
};

export default function ChatModal({ isOpen }: ChatModalProps) {
  const [messages, setMessages] = useState([
    {
      role: 'AI',
      message: 'Hello!👋 What would you like to discover about Ishan?',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const backendURL = process.env.NEXT_PUBLIC_API_URL;

  const scrollToEnd = () => {
    setTimeout(() => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTo({
          top: chatMessagesRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const sendPrompt = async () => {
    if (message.trim() === '') return;

    setLoading(true);
    const userMessage = message;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: 'User',
        message: userMessage,
      },
    ]);

    setMessage('');
    scrollToEnd();

    try {
      const res = await fetch(`${backendURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          model: 'text-davinci-003',
          temperature: 0.1,
          max_tokens: 512,
          top_p: 1.0,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          stop: [' User:', ' AI:'],
        }),
      });

      if (res.ok) {
        const response = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: 'AI',
            message: response.message,
          },
        ]);
      } else {
        const errorMessage = await res.text();
        setMessages((prev) => [
          ...prev,
          {
            role: 'AI',
            message: `Error: ${errorMessage || 'An error occurred.'}`,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'AI',
          message: 'Sorry, unable to reach the server.',
        },
      ]);
    } finally {
      setLoading(false);
      scrollToEnd();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-12 md:top-20 right-4 z-[999] w-100 h-[calc(100vh-6rem)] md:h-[calc(100vh-10rem)] bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col md:mr-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-slate-800 text-white rounded-t-lg">
        <div className="flex items-center gap-4 text-lg">
          <Bot className="w-6 h-6" />
          <h3 className="font-medium">Chat with Ishan&apos;s AI Assistant</h3>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatMessagesRef}
        className="chat-messages flex-1 p-4 overflow-y-auto space-y-3"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'User' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'User'
                  ? 'bg-slate-800 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.message}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-800 p-3 rounded-lg rounded-bl-sm text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-sm"
            disabled={loading}
          />
          <button
            onClick={sendPrompt}
            disabled={loading || !message.trim()}
            className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
