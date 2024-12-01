import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
// import App from './dashboard.jsx'
import App from './Discover'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)