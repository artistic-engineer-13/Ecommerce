import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true  // sends cookies with every request

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <App />
    </Router>
  </StrictMode>,
)
