import { createRoot } from 'react-dom/client'
import './index.css'
import "react-country-state-city/dist/react-country-state-city.css";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
