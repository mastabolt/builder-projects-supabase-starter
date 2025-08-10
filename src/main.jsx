import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { builder } from '@builder.io/sdk'
builder.init(import.meta.env.VITE_BUILDER_API_KEY || 'a8aeb804fff1441e8542a350250c6609')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
