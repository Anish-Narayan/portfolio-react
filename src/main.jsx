import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './App'
import './index.css' // Importing the Global CSS we just defined

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)