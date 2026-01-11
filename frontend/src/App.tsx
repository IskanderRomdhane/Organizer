import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PulsiaPlanner from './pages/PulsiaPlanner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PulsiaPlanner />} />
      </Routes>
    </Router>
  )
}

export default App

