import { useState } from 'react'
import { Link } from 'react-router'
import EuropeMap from './EuropeMap'
import TopNav from './TopNav'

export default function Home() {
    const [selectedItems, setSelectedItems] = useState([])

    const handleCitySelected = (cityName) => {
        setSelectedItems((prev) =>
            prev.includes(cityName) ? prev : [...prev, cityName]
        )
    }

    const handleRemoveCity = (cityToRemove) => {
        setSelectedItems((prev) => prev.filter(c => c !== cityToRemove))
    }

    // Define a subtle separator style to replace harsh borders
    const subtleBorder = { borderBottom: '1px solid rgba(255,255,255,0.05)' }

    return (
        <div className="d-flex flex-column vh-100">
            <TopNav />

            <div className="container-fluid flex-grow-1 p-0 overflow-hidden">
                <div className="row h-100 g-0">

                    {/* Sidebar: Removed 'border-end', using box-shadow for separation instead */}
                    <div className="col-md-4 col-lg-3 d-flex flex-column z-1 shadow-lg"
                        style={{ backgroundColor: '#1e1e1e', boxShadow: '4px 0 15px rgba(0,0,0,0.3)' }}>

                        {/* Header */}
                        <div className="p-4" style={subtleBorder}>
                            <h5 className="fw-bold mb-1 text-white">Trip Planner</h5>
                            <small style={{ color: '#888' }}>Select cities on the map to build your route.</small>
                        </div>

                        {/* List Area */}
                        <div className="flex-grow-1 overflow-auto p-3">
                            {selectedItems.length === 0 ? (
                                <div className="h-100 d-flex flex-column justify-content-center align-items-center opacity-50">
                                    <div className="display-4 mb-3">🗺️</div>
                                    <p className="text-center px-3 small text-white">
                                        List is empty.<br />Click pins on the map.
                                    </p>
                                </div>
                            ) : (
                                <ul className="list-group list-group-flush">
                                    {selectedItems.map((item, index) => (
                                        <li key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center px-0"
                                            style={subtleBorder} // Uses the subtle dark line
                                        >
                                            <span className="fw-medium text-white">{item}</span>
                                            <button
                                                className="btn btn-sm"
                                                style={{ color: '#666' }}
                                                onClick={() => handleRemoveCity(item)}
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer Area */}
                        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <Link to="/itinerary" className="d-block text-decoration-none">
                                <button
                                    className="btn w-100 py-2 rounded fw-bold text-white"
                                    disabled={selectedItems.length === 0}
                                    style={{
                                        background: selectedItems.length === 0 ? '#333' : 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)',
                                        opacity: selectedItems.length === 0 ? 0.5 : 1,
                                        border: 'none'
                                    }}
                                >
                                    Finalize Itinerary &rarr;
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="col-md-8 col-lg-9 position-relative h-100 bg-black">
                        <div className="w-100 h-100" style={{ opacity: 0.9 }}>
                            <EuropeMap onCityClick={handleCitySelected} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}