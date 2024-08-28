import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
