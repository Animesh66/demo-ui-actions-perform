import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [toasts, setToasts] = useState([])
  const [actionMessage, setActionMessage] = useState({
    click: 'Waiting for action...',
    doubleClick: 'Waiting for action...',
    rightClick: 'Waiting for action...',
    hover: 'Hover over me!',
    drag: 'Waiting for drop...',
    input: 'Waiting for input...',
    dropdown: 'Select an option',
    radio: 'None selected',
    checkbox: 'Unchecked',
    upload: 'No file selected',
    delayed: 'Ready to click',
    locator: null
  })

  // Settings
  const [delay, setDelay] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Drag State
  const [isDragging, setIsDragging] = useState(false)

  const addToast = (msg) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, msg }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const handleWithDelay = async (actionFn) => {
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay * 1000))
    }
    actionFn()
  }

  const updateMessage = (key, msg) => {
    setActionMessage(prev => ({ ...prev, [key]: msg }))
    addToast(msg)
  }

  // Event Handlers
  const handleSingleClick = () => {
    handleWithDelay(() => updateMessage('click', 'Single Click Performed!'))
  }

  const handleDoubleClick = () => {
    handleWithDelay(() => updateMessage('doubleClick', 'Double Click Performed!'))
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    handleWithDelay(() => updateMessage('rightClick', 'Right Click Performed!'))
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', 'drag-item')
    setIsDragging(true)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain')
    if (data === 'drag-item') {
      handleWithDelay(() => updateMessage('drag', 'Dropped Successfully!'))
    }
    setIsDragging(false)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    updateMessage('input', `Typed: ${e.target.value}`)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      updateMessage('upload', `Uploading ${file.name}...`)
      // Simulate upload delay
      setTimeout(() => {
        updateMessage('upload', `Upload Successful: ${file.name}`)
      }, 2000)
    }
  }

  const handleDelayedAction = () => {
    updateMessage('delayed', 'Action Started... Wait...')
    setTimeout(() => {
      updateMessage('delayed', 'Delayed Action Finished!')
    }, 3000 + (delay * 1000)) // Base 3s + user delay
  }

  return (
    <div className="app-container">
      <div className="header">
        <div className="title-container">
          <img src="/logo.png" alt="Animesh Logo" className="app-logo" />
          <h1>learnwithanimesh</h1>
        </div>
        <p>a demo web application</p>
      </div>

      <div className="section-grid">

        {/* Settings */}
        <div className="card">
          <h2>⚙️ Configuration</h2>
          <div className="control-group">
            <label className="label">Global Artificial Delay (seconds)</label>
            <input
              type="number"
              className="input-field"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              min="0"
              max="10"
              id="delay-input"
            />
          </div>
          <p className="label">This delay applies to most actions to simulate lag.</p>
        </div>

        {/* Click Actions */}
        <div className="card">
          <h2>🖱️ Mouse Clicks</h2>
          <div className="control-group">
            <button id="click-btn" className="btn btn-primary" onClick={handleSingleClick}>
              Single Click Me
            </button>
            <div className="message-area" id="click-msg">{actionMessage.click}</div>
          </div>

          <div className="control-group">
            <button id="dbl-click-btn" className="btn btn-secondary" onDoubleClick={handleDoubleClick}>
              Double Click Me
            </button>
            <div className="message-area" id="dbl-click-msg">{actionMessage.doubleClick}</div>
          </div>

          <div className="control-group">
            <button id="right-click-btn" className="btn btn-secondary" onContextMenu={handleRightClick}>
              Right Click Me
            </button>
            <div className="message-area" id="right-click-msg">{actionMessage.rightClick}</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="card">
          <h2>⌨️ Input Fields</h2>
          <div className="control-group">
            <label className="label">Type something:</label>
            <input
              id="text-input"
              type="text"
              className="input-field"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start typing..."
            />
            <div className="message-area" id="input-msg">{actionMessage.input}</div>
          </div>
        </div>

        {/* Dropdowns & Toggles */}
        <div className="card">
          <h2>🔘 Toggles & Choices</h2>

          <div className="control-group">
            <label className="label">Select Option:</label>
            <select
              id="select-dropdown"
              className="input-field"
              onChange={(e) => updateMessage('dropdown', `Selected: ${e.target.value}`)}
            >
              <option value="">Choose one...</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
            <div className="message-area" id="select-msg">{actionMessage.dropdown}</div>
          </div>

          <div className="control-group">
            <label className="label">Radio Buttons:</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label>
                <input
                  type="radio"
                  name="radio-group"
                  value="Radio 1"
                  onChange={(e) => updateMessage('radio', `Radio: ${e.target.value}`)}
                /> R1
              </label>
              <label>
                <input
                  type="radio"
                  name="radio-group"
                  value="Radio 2"
                  onChange={(e) => updateMessage('radio', `Radio: ${e.target.value}`)}
                /> R2
              </label>
            </div>
            <div className="message-area" id="radio-msg">{actionMessage.radio}</div>
          </div>

          <div className="control-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="checkbox"
                onChange={(e) => updateMessage('checkbox', e.target.checked ? 'Checked' : 'Unchecked')}
              />
              Check me
            </label>
            <div className="message-area" id="checkbox-msg">{actionMessage.checkbox}</div>
          </div>
        </div>

        {/* Drag and Drop */}
        <div className="card">
          <h2>✋ Drag & Drop</h2>
          <div className="control-group">
            <div
              id="draggable"
              className="draggable"
              draggable
              onDragStart={handleDragStart}
            >
              Drag Me
            </div>
          </div>
          <div
            id="drop-zone"
            className={`drop-zone ${isDragging ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isDragging ? 'Drop Here!' : 'Drop Zone'}
          </div>
          <div className="message-area" id="drop-msg">{actionMessage.drag}</div>
        </div>

        {/* File Upload */}
        <div className="card">
          <h2>📂 File Upload</h2>
          <div className="control-group">
            <label className="label">Choose a file to upload:</label>
            <input
              type="file"
              id="file-upload"
              className="input-field"
              onChange={handleFileUpload}
            />
            <div className="message-area" id="upload-msg">{actionMessage.upload}</div>
          </div>
        </div>

        {/* Hover */}
        <div className="card">
          <h2>👻 Hover</h2>
          <div
            id="hover-area"
            className="drop-zone"
            onMouseEnter={() => updateMessage('hover', 'You are hovering!')}
            onMouseLeave={() => updateMessage('hover', 'Hover left!')}
            style={{ borderColor: actionMessage.hover === 'You are hovering!' ? 'var(--primary-color)' : '' }}
          >
            {actionMessage.hover}
          </div>
        </div>

        {/* Native Alerts & Modals */}
        <div className="card">
          <h2>🚨 Alerts & Modals</h2>
          <div className="control-group">
            <button
              id="alert-btn"
              className="btn btn-primary"
              onClick={() => {
                window.alert('This is a simple Alert!')
                updateMessage('popup', 'Alert Closed')
              }}
            >
              Trigger Alert
            </button>
          </div>
          <div className="control-group">
            <button
              id="confirm-btn"
              className="btn btn-secondary"
              onClick={() => {
                const result = window.confirm('Do you confirm this action?')
                updateMessage('popup', result ? 'Confirmed!' : 'Cancelled!')
              }}
            >
              Trigger Confirm
            </button>
          </div>
          <div className="control-group">
            <button
              id="prompt-btn"
              className="btn btn-secondary"
              onClick={() => {
                const result = window.prompt('Enter your name:')
                updateMessage('popup', result ? `Hello ${result}!` : 'No input')
              }}
            >
              Trigger Prompt
            </button>
          </div>
        </div>

        {/* Duplicate Locators */}
        <div className="card">
          <h2>🔍 Locator Strategies</h2>
          <p className="label">These buttons have exact same text "Home" and class.</p>
          <div className="control-group" style={{ flexDirection: 'row', gap: '1rem' }}>
            <button
              className="btn duplicate-btn"
              style={{ backgroundColor: '#1f6feb', color: 'white' }}
              onClick={() => updateMessage('locator', 'Blue Home Clicked!')}
            >
              Home
            </button>
            <button
              className="btn duplicate-btn"
              style={{ backgroundColor: '#d29922', color: 'black' }}
              onClick={() => updateMessage('locator', 'Yellow Home Clicked!')}
            >
              Home
            </button>
          </div>
          <div className="message-area" id="locator-msg">{actionMessage.locator || 'Click a Home button'}</div>
        </div>

        {/* iFrame */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2>🖼️ iFrames</h2>
          <p className="label">The content below is inside an iframe.</p>
          <iframe
            id="test-iframe"
            src="/iframe-content.html"
            style={{
              width: '100%',
              height: '300px',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)'
            }}
            title="Test iFrame"
          ></iframe>
        </div>

        {/* Browser Tabs & Windows */}
        <div className="card">
          <h2>📑 Windows & Tabs</h2>
          <div className="control-group">
            {/* Using an anchor tag with target="_blank" is the most common way a new tab is opened in live sites.
                Playwright handles this as a popup event. */}
            <a
              id="new-tab-btn"
              className="btn btn-primary"
              href="/sample.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              Open New Tab (Link)
            </a>
          </div>
          <div className="control-group">
            <button
              id="new-window-btn"
              className="btn btn-secondary"
              onClick={() => {
                // Opening a window with specific features forces a popup window behavior
                const features = 'popup=yes,width=600,height=400,resizable=yes,scrollbars=yes,status=no,location=no';
                window.open('/sample.html', 'newwindow', features);
              }}
            >
              Open New Window (Popup)
            </button>
          </div>
          <p className="label">Test <code>page.waitForEvent('popup')</code> with these common patterns.</p>
        </div>

        {/* Specific Delayed Action */}
        <div className="card">
          <h2>⏳ Timed Actions</h2>
          <p className="label">This action takes 3 seconds (plus your input delay).</p>
          <button
            id="submit-delay"
            className="btn btn-primary"
            onClick={handleDelayedAction}
          >
            Start Delayed Process
          </button>
          <div className="message-area" id="delayed-msg">{actionMessage.delayed}</div>
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 id="modal-title">Simple Modal</h3>
            <p id="modal-text">This is a custom modal popup.</p>
            <button
              id="close-modal-btn"
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            <span>✅ {toast.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
