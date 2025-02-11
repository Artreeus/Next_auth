'use client'

import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface Message {
  name: string;
  email: string;
  message: string;
}

function page() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load messages from localStorage on component mount
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const deleteMessage = (index: number) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        {messages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No messages found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {msg.name}
                    </h2>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                  </div>
                  <button
                    onClick={() => deleteMessage(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    aria-label="Delete message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="mt-4 text-gray-700">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;