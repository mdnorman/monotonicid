import { useState } from 'react'
import './App.css'
import { decodeULID, formatULIDResult, isValidULID } from './ulid-decoder'

function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const decodeMonotonicId = () => {
    if (!input.trim()) {
      setResult('Please enter a monotonic ID')
      return
    }

    const trimmedInput = input.trim()

    // Check if input looks like a ULID (26 characters)
    if (isValidULID(trimmedInput)) {
      const decodedResult = decodeULID(trimmedInput)
      setResult(formatULIDResult(decodedResult))
    } else {
      // For non-ULID inputs, provide helpful feedback
      if (trimmedInput.length === 26) {
        setResult('❌ Invalid ULID format: Contains invalid characters for Base32 encoding')
      } else {
        setResult(`❌ Unrecognized format: ${trimmedInput.length} characters (ULID requires exactly 26 characters)`)
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MonotonicID Decoder</h1>
        <p>Decode and analyze timestamp-based monotonic identifiers</p>
      </header>

      <main className="App-main">
        <div className="decoder-section">
          <div className="input-group">
            <label htmlFor="monotonic-input">Enter Monotonic ID:</label>
            <textarea
              id="monotonic-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your monotonic ID here..."
              rows={4}
            />
          </div>

          <button onClick={decodeMonotonicId} className="decode-btn">
            Decode
          </button>

          {result && (
            <div className="result-section">
              <h3>Result:</h3>
              <div className="result-content">
                {result}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>A utility for decoding monotonic identifiers</p>
      </footer>
    </div>
  )
}

export default App
