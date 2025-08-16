import { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { easeIn, easeOut } from 'framer-motion';

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState([
    {
      role: 'AI',
      message: 'Hello!👋 What would you like to discover about Ishan?',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const backendURL = process.env.NEXT_PUBLIC_API_URL;

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: easeOut },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: easeIn },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      x: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      x: 10,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeOut, // use the imported easing function
      },
    },
  };

  const loadingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-sm"
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Chat Modal */}
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-12 md:top-20 right-4 z-[999] w-100 h-[calc(100vh-6rem)] md:h-[calc(100vh-10rem)] bg-white rounded-lg shadow-2xl flex flex-col md:mr-4"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-800 text-white rounded-t-lg"
            >
              <div className="flex items-center gap-4 text-lg">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }}
                >
                  <Bot className="w-6 h-6" />
                </motion.div>
                <h3 className="font-medium">
                  Chat with Ishan&apos;s AI Assistant
                </h3>
              </div>
            </motion.div>

            {/* Messages */}
            <div
              ref={chatMessagesRef}
              className="chat-messages flex-1 p-4 overflow-y-auto space-y-3"
            >
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${
                      msg.role === 'User' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'User'
                          ? 'bg-slate-800 text-white rounded-br-none shadow-md'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.message}</div>
                    </motion.div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    variants={loadingVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex justify-start"
                  >
                    <div className="bg-slate-100 text-slate-800 p-3 rounded-lg rounded-bl-sm text-sm shadow-sm">
                      <div className="flex items-center gap-1">
                        <motion.div
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.1,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="p-4 border-t border-slate-200"
            >
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-sm transition-all duration-200"
                  disabled={loading}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  onClick={sendPrompt}
                  disabled={loading || !message.trim()}
                  className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
