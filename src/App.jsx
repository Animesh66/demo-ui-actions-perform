import { useState, useEffect, useRef } from 'react'
import { Link, Route, Routes, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = sessionStorage.getItem('auth_user')
    const token = sessionStorage.getItem('auth_token')
    if (user && token) {
      setCurrentUser(user)
    }
  }, [])

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    navigate('/home')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_token')
    setCurrentUser(null)
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/home" className="nav-brand">
            <img src="/logo.png" alt="Logo" className="app-logo-small" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            learnwithanimesh
          </Link>
          <ul className="nav-links">
            <li><NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/about-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About Us</NavLink></li>
            <li><NavLink to="/contact-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact Us</NavLink></li>

            {currentUser ? (
              <>
                <li style={{ display: 'flex', alignItems: 'center', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Welcome, {currentUser}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="nav-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Login</NavLink></li>
                <li><NavLink to="/register" className={({ isActive }) => `nav-link btn btn-primary ${isActive ? 'active' : ''}`} style={{ padding: '0.4rem 1rem' }}>Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="app-container">
        <div className="header">
          <div className="title-container">
            <img src="/logo.png" alt="Animesh Logo" className="app-logo" />
            <h1>learnwithanimesh</h1>
          </div>
          <p>a demo web application</p>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePlayground />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-links">
              <Link to="#" className="footer-link">Terms of Service</Link>
              <Link to="#" className="footer-link">Privacy Policy</Link>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} learnwithanimesh. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

// Page Components
const AboutUs = () => (
  <div className="card">
    <h2>About Us</h2>
    <p>Welcome to learnwithanimesh! This platform is designed to help QA engineers and developers master Playwright automation actions.</p>
    <p>We provide a safe, local environment to test everything from basic clicks to complex iFrame and modal interactions.</p>
  </div>
)

const ContactUs = () => (
  <div className="card">
    <h2>Contact Us</h2>
    <p>Have questions or suggestions?</p>
    <p>Email us at: <strong>demo@learnwithanimesh.com</strong></p>
    <p>Or find us on social media!</p>
  </div>
)

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      if (username === 'test' && password === 'test@1') {
        const token = 'Bearer ' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
        sessionStorage.setItem('auth_token', token)
        sessionStorage.setItem('auth_user', username)
        onLogin(username)
      } else {
        setError('Invalid username or password')
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="control-group">
          <label className="label">Username</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label className="label">Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}
        <button
          className="btn btn-primary"
          style={{ marginTop: '1rem', width: '100%' }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Use <strong>test</strong> / <strong>test@1</strong>
      </p>
    </div>
  )
}

const RegisterPage = () => (
  <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
    <h2>Create Account</h2>
    <p className="label">This is a separate registration page route.</p>
    <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Sign Up</button>
  </div>
)

// Main Playground Component (Extracted logic from previous App component)
const HomePlayground = () => {
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
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [formError, setFormError] = useState('')

  // Registration Form State
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termcheck: false
  })

  // Drag State
  const [isDragging, setIsDragging] = useState(false)

  // Web Table State
  const [tableData, setTableData] = useState([
    { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', orderId: 'ORD-001', price: '$25.00' },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', orderId: 'ORD-002', price: '$40.50' },
    { id: 3, firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com', orderId: 'ORD-003', price: '$15.99' },
    { id: 4, firstName: 'David', lastName: 'Wilson', email: 'david@example.com', orderId: 'ORD-004', price: '$120.00' },
    { id: 5, firstName: 'Eve', lastName: 'Davis', email: 'eve@example.com', orderId: 'ORD-005', price: '$75.25' },
    { id: 6, firstName: 'Frank', lastName: 'Miller', email: 'frank@example.com', orderId: 'ORD-006', price: '$10.00' },
    { id: 7, firstName: 'Grace', lastName: 'Taylor', email: 'grace@example.com', orderId: 'ORD-007', price: '$55.00' },
    { id: 8, firstName: 'Henry', lastName: 'Anderson', email: 'henry@example.com', orderId: 'ORD-008', price: '$99.99' },
    { id: 9, firstName: 'Ivy', lastName: 'Thomas', email: 'ivy@example.com', orderId: 'ORD-009', price: '$35.50' },
    { id: 10, firstName: 'Jack', lastName: 'White', email: 'jack@example.com', orderId: 'ORD-010', price: '$60.00' },
  ])

  const [newRow, setNewRow] = useState({ firstName: '', lastName: '', email: '', price: '' })
  const [editingRowId, setEditingRowId] = useState(null)
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '', orderId: '', price: '' })

  const handleAddRow = (e) => {
    e.preventDefault()
    if (!newRow.firstName || !newRow.email || !newRow.price) {
      updateMessage('input', 'Please fill all mandatory fields (First Name, Email, Price)')
      return
    }
    const id = tableData.length > 0 ? Math.max(...tableData.map(r => r.id)) + 1 : 1
    // Auto-generate Order ID
    const generatedOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`
    // Auto-formatting price if missing $
    const formattedPrice = newRow.price.startsWith('$') ? newRow.price : `$${newRow.price}`

    setTableData([...tableData, { ...newRow, orderId: generatedOrderId, price: formattedPrice, id }])
    setNewRow({ firstName: '', lastName: '', email: '', price: '' })
    updateMessage('input', 'Row added with Order ID ' + generatedOrderId)
  }

  const handleDeleteRow = (id) => {
    setTableData(tableData.filter(row => row.id !== id))
    updateMessage('input', `Row ${id} deleted`)
  }

  const handleEditClick = (row) => {
    setEditingRowId(row.id)
    setEditFormData({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      orderId: row.orderId,
      price: row.price
    })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData({ ...editFormData, [name]: value })
  }

  const handleSaveEdit = (id) => {
    setTableData(tableData.map(row =>
      row.id === id ? { ...row, ...editFormData } : row
    ))
    setEditingRowId(null)
    updateMessage('input', `Row ${id} updated`)
  }

  const handleCancelEdit = () => {
    setEditingRowId(null)
  }

  // Row Drag Handlers for Reordering
  const handleRowDragStart = (e, index) => {
    e.dataTransfer.setData('row-index', index)
    // Don't set global isDragging to interfere with other drag drop
  }

  const handleRowDragOver = (e) => {
    e.preventDefault() // Necessary to allow dropping
  }

  const handleRowDrop = (e, dropIndex) => {
    e.preventDefault()
    const startIndex = Number(e.dataTransfer.getData('row-index'))
    if (isNaN(startIndex)) return

    if (startIndex === dropIndex) return

    const updatedData = [...tableData]
    const [movedRow] = updatedData.splice(startIndex, 1)
    updatedData.splice(dropIndex, 0, movedRow)
    setTableData(updatedData)
    updateMessage('input', `Row moved from ${startIndex + 1} to ${dropIndex + 1}`)
  }

  const addToast = (msg) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, msg }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  // Shadow DOM Ref
  const shadowHostRef = useRef(null);

  // Reload simulation state
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    if (shadowHostRef.current && !shadowHostRef.current.shadowRoot) {
      const shadowRoot = shadowHostRef.current.attachShadow({ mode: 'open' });

      const div = document.createElement('div');
      div.innerHTML = `
        <style>
          .shadow-box {
            padding: 15px;
            background-color: #161b22; 
            border: 2px dashed #58a6ff;
            border-radius: 6px;
            color: #c9d1d9;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          h3 { margin-top: 0; color: #58a6ff; }
          .shadow-btn {
            margin-top: 10px;
            padding: 6px 16px;
            background-color: #238636;
            color: white;
            border: 1px solid rgba(240, 246, 252, 0.1);
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          }
          .shadow-btn:hover { background-color: #2ea043; }
          .shadow-input {
             margin-top: 10px;
             padding: 5px 12px;
             border-radius: 6px;
             border: 1px solid #30363d;
             background: #0d1117;
             color: #c9d1d9;
             outline: none;
          } 
          .shadow-input:focus { border-color: #58a6ff; }
        </style>
        <div class="shadow-box">
          <h3>I am inside Shadow DOM</h3>
          <input type="text" id="shadow-input" class="shadow-input" placeholder="Type in Shadow DOM" />
          <br/>
          <button id="shadow-btn" class="shadow-btn">Shadow Click</button>
        </div>
      `;
      shadowRoot.appendChild(div);

      const btn = shadowRoot.getElementById('shadow-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          // Visual feedback inside shadow DOM
          const box = shadowRoot.querySelector('.shadow-box');
          const originalBg = box.style.backgroundColor;
          box.style.backgroundColor = '#1f6feb';
          setTimeout(() => box.style.backgroundColor = originalBg, 300);
        });
      }
    }
  }, []);

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

  const handleRegistrationSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    // Validation
    const missingFields = []
    if (!regForm.firstName.trim()) missingFields.push('First Name')
    if (!regForm.lastName.trim()) missingFields.push('Last Name')
    if (!regForm.email.trim()) missingFields.push('Email')
    if (!regForm.password) missingFields.push('Password')

    // Phone Validation: Optional, but if entered, must be 10 digits numeric
    const phoneRegex = /^\d{10}$/
    if (regForm.phoneNumber && !phoneRegex.test(regForm.phoneNumber)) {
      missingFields.push('Phone Number (10 digits)')
    }

    if (missingFields.length > 0) {
      setFormError(`Registration Failed. Please check the following fields: ${missingFields.join(', ')}`)
      return
    }

    updateMessage('input', 'Submitting registration...')

    // Random delay between 3 to 6 seconds
    const randomDelay = Math.floor(Math.random() * (6000 - 3000 + 1) + 3000)

    setTimeout(() => {
      setShowRegistrationModal(true)
      updateMessage('input', 'Registration Successful!')
    }, randomDelay)
  }

  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target
    setRegForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <>
      <div className="section-grid">
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

        {/* Registration Form */}
        <div className="card" style={{ gridRow: 'span 2' }}>
          <h2>📝 Registration Form</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleRegistrationSubmit} noValidate>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label className="label">
                  First Name <span style={{ color: 'red' }}>*</span>
                  <input
                    name="firstName"
                    value={regForm.firstName}
                    onChange={handleRegChange}
                    className="input-field"
                    placeholder="First Name"
                    data-testid="firstname"
                  />
                </label>
              </div>
              <div style={{ flex: 1 }}>
                <label className="label">
                  Last Name <span style={{ color: 'red' }}>*</span>
                  <input
                    name="lastName"
                    value={regForm.lastName}
                    onChange={handleRegChange}
                    className="input-field"
                    placeholder="Last Name"
                    data-testid="lastname"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="label">
                Email Address <span style={{ color: 'red' }}>*</span>
                <input
                  name="email"
                  type="email"
                  value={regForm.email}
                  onChange={handleRegChange}
                  className="input-field"
                  placeholder="Email"
                  data-testid="email"
                />
              </label>
            </div>

            <label className="label">Phone Number</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                name="countryCode"
                value={regForm.countryCode}
                onChange={handleRegChange}
                className="input-field"
                style={{ width: '100px' }}
              >
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
              <input
                name="phoneNumber"
                type="tel"
                value={regForm.phoneNumber}
                onChange={handleRegChange}
                className="input-field"
                style={{ flex: 1 }}
              />
            </div>

            <div>
              <label className="label">
                Password <span style={{ color: 'red' }}>*</span>
                <input
                  name="password"
                  type="password"
                  value={regForm.password}
                  onChange={handleRegChange}
                  className="input-field"
                  placeholder="Password"
                  data-testid="password"
                  aria-label="Password"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Retype Password
                <input
                  name="confirmPassword"
                  type="password"
                  value={regForm.confirmPassword}
                  onChange={handleRegChange}
                  className="input-field"
                  aria-label="Confirm Password"
                />
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                name="termcheck"
                checked={regForm.termcheck}
                onChange={handleRegChange}
              />
              <span className="label">I agree to terms</span>
            </div>

            {formError && (
              <div style={{
                color: 'var(--error-color)',
                backgroundColor: 'rgba(248, 81, 73, 0.1)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--error-color)',
                fontSize: '0.9rem'
              }}>
                {formError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              Register Now
            </button>
          </form>
        </div>

        {/* Input Fields */}
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

        {/* Network Emulation */}
        <div className="card">
          <h2>🌐 Network Simulation</h2>
          <p className="label">Simulate a slow server response causing a delayed page load.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsReloading(true);
              const delay = Math.floor(Math.random() * (7000 - 5000 + 1) + 5000);
              updateMessage('input', `Reloading in ${delay}ms...`);
              setTimeout(() => {
                window.location.reload();
              }, delay);
            }}
          >
            Simulate Slow Page Load (5-7s)
          </button>
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

        {/* Shadow DOM */}
        <div className="card">
          <h2>🌑 Shadow DOM</h2>
          <p className="label">The button key and input below are inside a Shadow Root.</p>
          <div id="shadow-host" ref={shadowHostRef}></div>
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
          <div className="control-group">
            <button
              id="open-modal-btn"
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Open Modal Behavior
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
        </div>

        {/* Web Table */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2>📊 Customer Order Table</h2>
          <p className="label">Dynamic table with add/delete functionality.</p>

          <form className="add-row-form" onSubmit={handleAddRow}>
            <div>
              <label className="label">First Name <span style={{ color: 'var(--error-color)' }}>*</span></label>
              <input
                className="input-field"
                value={newRow.firstName}
                onChange={e => setNewRow({ ...newRow, firstName: e.target.value })}
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="label">Last Name (Optional)</label>
              <input
                className="input-field"
                value={newRow.lastName}
                onChange={e => setNewRow({ ...newRow, lastName: e.target.value })}
                placeholder="Last Name"
              />
            </div>
            <div>
              <label className="label">Email <span style={{ color: 'var(--error-color)' }}>*</span></label>
              <input
                className="input-field"
                value={newRow.email}
                onChange={e => setNewRow({ ...newRow, email: e.target.value })}
                placeholder="Email"
                type="email"
              />
            </div>
            <div>
              <label className="label">Order ID (Auto)</label>
              <input
                className="input-field"
                value="Auto-generated"
                disabled
                style={{ backgroundColor: 'var(--surface-hover)', cursor: 'not-allowed', color: 'var(--text-secondary)' }}
              />
            </div>
            <div>
              <label className="label">Price ($) <span style={{ color: 'var(--error-color)' }}>*</span></label>
              <input
                className="input-field"
                value={newRow.price}
                onChange={e => setNewRow({ ...newRow, price: e.target.value })}
                placeholder="$0.00"
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Row</button>
          </form>

          <div className="table-container">
            <table className="web-table" id="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Order ID</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: 'center' }}>No data available</td></tr>
                ) : (
                  tableData.map((row, index) => (
                    <tr
                      key={row.id}
                      draggable={editingRowId === null}
                      onDragStart={(e) => handleRowDragStart(e, index)}
                      onDragOver={handleRowDragOver}
                      onDrop={(e) => handleRowDrop(e, index)}
                      style={{ cursor: editingRowId === null ? 'move' : 'default' }}
                      title={editingRowId === null ? "Drag to reorder" : ""}
                    >
                      <td>{row.id}</td>
                      <td>
                        {editingRowId === row.id ? (
                          <input
                            name="firstName"
                            value={editFormData.firstName}
                            onChange={handleEditChange}
                            className="input-field"
                            style={{ padding: '0.25rem' }}
                          />
                        ) : row.firstName}
                      </td>
                      <td>
                        {editingRowId === row.id ? (
                          <input
                            name="lastName"
                            value={editFormData.lastName}
                            onChange={handleEditChange}
                            className="input-field"
                            style={{ padding: '0.25rem' }}
                          />
                        ) : row.lastName}
                      </td>
                      <td>
                        {editingRowId === row.id ? (
                          <input
                            name="email"
                            value={editFormData.email}
                            onChange={handleEditChange}
                            className="input-field"
                            style={{ padding: '0.25rem' }}
                          />
                        ) : row.email}
                      </td>
                      <td>
                        {/* Order ID is read-only */}
                        <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                          {row.orderId}
                        </span>
                      </td>
                      <td>
                        {editingRowId === row.id ? (
                          <input
                            name="price"
                            value={editFormData.price}
                            onChange={handleEditChange}
                            className="input-field"
                            style={{ padding: '0.25rem' }}
                          />
                        ) : row.price}
                      </td>
                      <td>
                        {editingRowId === row.id ? (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              className="action-btn"
                              style={{ backgroundColor: 'rgba(46, 160, 67, 0.2)', color: 'var(--success-color)' }}
                              onClick={() => handleSaveEdit(row.id)}
                            >
                              Save
                            </button>
                            <button
                              className="action-btn"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              className="action-btn"
                              style={{ backgroundColor: 'rgba(31, 111, 235, 0.2)', color: '#58a6ff' }}
                              onClick={() => handleEditClick(row)}
                            >
                              Edit
                            </button>
                            <button
                              className="action-btn"
                              onClick={() => handleDeleteRow(row.id)}
                              title="Delete Row"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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

        {/* Images */}
        <div className="card">
          <h2>🖼️ Images</h2>
          <p className="label">Sample image with alt text for testing.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/logo.png"
              alt="Animesh Logo with Blue Brain"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>
        </div>

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

      </div >

      {/* Modal */}
      {
        showModal && (
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
        )
      }

      {/* Registration Success Modal */}
      {
        showRegistrationModal && (
          <div className="modal-overlay" onClick={() => setShowRegistrationModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3 style={{ color: 'var(--success-color)' }}>🎉 Registration Successful!</h3>
              <p>Your account has been created successfully.</p>
              <div style={{ textAlign: 'left', margin: '1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <p><strong>Name:</strong> {regForm.firstName} {regForm.lastName}</p>
                <p><strong>Email:</strong> {regForm.email}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowRegistrationModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        )
      }

      {/* Loading Overlay for Slow Reload */}
      {isReloading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <h3>Simulating Slow Server...</h3>
          <p>Page will reload in a few seconds.</p>
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
    </>
  )
}

export default App
