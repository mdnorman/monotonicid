import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('MonotonicID Decoder')).toBeInTheDocument()
  })

  it('renders the input label', () => {
    render(<App />)
    expect(screen.getByText('Enter Monotonic ID:')).toBeInTheDocument()
  })

  it('renders the decode button', () => {
    render(<App />)
    expect(screen.getByText('Decode')).toBeInTheDocument()
  })
})
