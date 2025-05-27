export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  category: string
  organizer: string
  image: string
  capacity: number
  registeredAttendees: number
  isFeatured: boolean
  tags: string[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface ChatMessage {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  timestamp: Date
  eventId: string
}

export interface RegisteredEvent {
  id: string
  eventId: string
  title: string
  description: string
  date: Date
  location: string
  category: string
  organizer: string
  image: string
  registrationDate: Date
  attendees: number
}
