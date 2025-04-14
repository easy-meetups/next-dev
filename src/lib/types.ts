export interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    capacity: number;
    registeredAttendees: number;
    image?: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface ChatMessage {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    timestamp: Date;
    eventId: string;
  }