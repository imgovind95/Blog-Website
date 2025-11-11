import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// ✅ YEH LINE SAHI HAI
import { AppContextProvider } from '../context/AppContext.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* ✅ AUR YEH LINE BHI SAHI HAI */}
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)