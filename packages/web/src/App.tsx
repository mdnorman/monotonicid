import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const decodeMonotonicId = () => {
    // Basic placeholder for monotonic ID decoding logic
    if (!input.trim()) {
      setResult('Please enter a monotonic ID')
      return
    }

    // This is a placeholder - actual decoding logic will be implemented later
    setResult(`Decoded result for: ${input}`)
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
