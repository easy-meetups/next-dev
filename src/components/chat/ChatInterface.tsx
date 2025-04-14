'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { io, Socket } from 'socket.io-client';
import { ChatMessage, User } from '@/lib/types';
import { ChatMessageFormData, chatMessageSchema } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { format } from 'date-fns';

interface ChatInterfaceProps {
  eventId: string;
  currentUser: User;
}

export function ChatInterface({ eventId, currentUser }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ChatMessageFormData>({
    resolver: zodResolver(chatMessageSchema)
  });

  useEffect(() => {
    // In a real application, connect to your Socket.IO server
    // For this example, we'll simulate messages
    setIsConnected(true);
    
    // Simulate receiving a welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome-1',
      userId: 'system',
      userName: 'System',
      content: `Welcome to the event chat for event #${eventId}! Please be respectful to other participants.`,
      timestamp: new Date(),
      eventId
    };
    
    setMessages([welcomeMessage]);
    
    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [eventId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onSendMessage = (data: ChatMessageFormData) => {
    // In a real app, you would send this to your Socket.IO server
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: data.content,
      timestamp: new Date(),
      eventId
    };
    
    // Add to local state
    setMessages(prev => [...prev, newMessage]);
    
    // Reset form
    reset();
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-sm bg-white">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Event Chat</h3>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-500">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4"
      >
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.userId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[70%] rounded-lg p-3 
                ${message.userId === currentUser.id 
                  ? 'bg-blue-600 text-white' 
                  : message.userId === 'system' 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'bg-gray-100 text-gray-800'
                }
              `}
            >
              {message.userId !== currentUser.id && message.userId !== 'system' && (
                <div className="font-medium mb-1">{message.userName}</div>
              )}
              <p>{message.content}</p>
              <div className={`text-xs mt-1 ${message.userId === currentUser.id ? 'text-blue-100' : 'text-gray-500'}`}>
                {format(message.timestamp, 'h:mm a')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit(onSendMessage)}>
          <Textarea
            placeholder="Type your message here..."
            className="resize-none mb-2"
            {...register('content')}
            error={errors.content?.message}
          />
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isSubmitting}
            disabled={!isConnected}
            className="w-full"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
