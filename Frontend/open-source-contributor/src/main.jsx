import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './findprojects.jsx'
//import App from './discover'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)