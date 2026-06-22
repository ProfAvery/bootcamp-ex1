import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Header from './components/Header'

const headerRoot = createRoot(document.querySelector('header'))
headerRoot.render(<Header />)

const mainRoot = createRoot(document.querySelector('main'))
mainRoot.render(<App />)
