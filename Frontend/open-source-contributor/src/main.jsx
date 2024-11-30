import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
//rerenders our application twice
//we get the one time code
//First render: we use the one time code, and we get an access token
//Secon render: we use the one time code, we get an error from our server