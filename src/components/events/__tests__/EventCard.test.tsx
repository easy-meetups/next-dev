import { render, screen } from '@testing-library/react'
import { EventCard } from '../EventCard'
import React from 'react'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => <img {...props} />,
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

const baseEvent = {
  id: '1',
  title: 'Evento Teste',
  description: 'Descricao do evento',
  date: new Date('2024-01-01T10:00:00Z'),
  location: 'Online',
  category: 'Workshop',
  organizer: 'Tech',
  image: '',
  capacity: 10,
  registeredAttendees: 0,
  isFeatured: false,
  tags: [],
}

describe('EventCard', () => {
  it('renders title and registration link', () => {
    render(<EventCard event={baseEvent} />)

    expect(screen.getByText('Evento Teste')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /Inscrever-se/i })
    expect(link).toHaveAttribute('href', `/events/register?id=${baseEvent.id}`)
  })
})
