import { HashRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Itinerary from './components/Itinerary'
import PastDestinations from './components/PastDestinations'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/past-destinations" element={<PastDestinations />} />
      </Routes>
    </HashRouter>
  )
}

export default App
