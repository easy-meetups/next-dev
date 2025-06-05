import axios from 'axios'
import type { Event } from '@/lib/types'

const api = axios.create({
  baseURL: process.env.API_URL,
})

export async function fetchEvents(): Promise<Event[]> {
  try {
    const { data } = await api.get<Event[]>('/events')
    return data
  } catch (error: unknown) {
    console.error('Failed to fetch events:', error)
    throw new Error('Failed to fetch events')
  }
}

export async function fetchEventById(id: string): Promise<Event | null> {
  try {
    const { data } = await api.get<Event>(`/events/${id}`)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    console.error('Failed to fetch event:', error)
    throw new Error('Failed to fetch event')
  }
}
