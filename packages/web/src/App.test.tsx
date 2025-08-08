import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  describe('ULID Decoding Integration', () => {
    it('should decode a valid ULID and display results', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByRole('textbox')
      const button = screen.getByText('Decode')

      await user.type(input, '01ARZ3NDEKTSV4RRFFQ69G5FAV')
      fireEvent.click(button)

      expect(screen.getByText(/✅ Valid ULID/)).toBeInTheDocument()
      expect(screen.getByText(/ULID: 01ARZ3NDEKTSV4RRFFQ69G5FAV/)).toBeInTheDocument()
      expect(screen.getByText(/Date: 2016-07-30T23:54:10.259Z/)).toBeInTheDocument()
      expect(screen.getByText(/Randomness: TSV4RRFFQ69G5FAV/)).toBeInTheDocument()
    })

    it('should handle lowercase ULID input', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByRole('textbox')
      const button = screen.getByText('Decode')

      await user.type(input, '01arz3ndektsv4rrffq69g5fav')
      fireEvent.click(button)

      expect(screen.getByText(/✅ Valid ULID/)).toBeInTheDocument()
      expect(screen.getByText(/ULID: 01ARZ3NDEKTSV4RRFFQ69G5FAV/)).toBeInTheDocument()
    })

    it('should show error for invalid ULID length', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByRole('textbox')
      const button = screen.getByText('Decode')

      await user.type(input, '01ARZ3NDEKTSV4RRFFQ69G5FA')
      fireEvent.click(button)

      expect(screen.getByText(/❌ Unrecognized format: 25 characters/)).toBeInTheDocument()
    })

    it('should show error for invalid characters', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByRole('textbox')
      const button = screen.getByText('Decode')

      await user.type(input, '01ARZ3NDEKTSV4RRFFQ69G5FAI')
      fireEvent.click(button)

      expect(screen.getByText(/❌ Invalid ULID format: Contains invalid characters/)).toBeInTheDocument()
    })

    it('should handle empty input', async () => {
      render(<App />)

      const button = screen.getByText('Decode')
      fireEvent.click(button)

      expect(screen.getByText('Please enter a monotonic ID')).toBeInTheDocument()
    })

    it('should handle whitespace input', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByRole('textbox')
      const button = screen.getByText('Decode')

      await user.type(input, '   ')
      fireEvent.click(button)

      expect(screen.getByText('Please enter a monotonic ID')).toBeInTheDocument()
    })

    it('should trim whitespace from valid ULID', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByRole('textbox')
      const button = screen.getByText('Decode')

      await user.type(input, '  01ARZ3NDEKTSV4RRFFQ69G5FAV  ')
      fireEvent.click(button)

      expect(screen.getByText(/✅ Valid ULID/)).toBeInTheDocument()
      expect(screen.getByText(/ULID: 01ARZ3NDEKTSV4RRFFQ69G5FAV/)).toBeInTheDocument()
    })
  })
})
