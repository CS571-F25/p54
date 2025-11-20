import { useState } from 'react'
import { Link } from 'react-router'
import EuropeMap from './EuropeMap'

export default function Home() {
    const [selectedItems, setSelectedItems] = useState([])

    const handleCitySelected = (cityName) => {
        setSelectedItems((prev) =>
        prev.includes(cityName) ? prev : [...prev, cityName]
        )
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        {/* Main map area */}
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            <h1>Travel Itinerary Planner</h1>
            <p>Click on cities to explore and add to your itinerary</p>

            {/* Interactive European Map */}
            <div
            style={{
                marginTop: '20px',
                minHeight: '500px',
                height: '500px',
                backgroundColor: '#f9f9f9',
            }}
            >
            <EuropeMap onCityClick={handleCitySelected} />
            </div>
        </div>

        {/* Side panel for navigation and itinerary tracking */}
        <div
            style={{
            width: '320px',
            borderLeft: '2px solid #ccc',
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            }}
        >
            {/* Navigation Section */}
            <div>
            <h3 style={{ marginBottom: '15px' }}>Navigation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/past-destinations">
                <button
                    style={{
                    width: '100%',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    }}
                >
                    Past Destinations
                </button>
                </Link>

                <Link to="/about">
                <button
                    style={{
                    width: '100%',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    }}
                >
                    About
                </button>
                </Link>
            </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #ddd' }} />

            {/* Itinerary Section */}
            <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '15px' }}>Your Itinerary</h3>
            <div style={{ marginBottom: '20px' }}>
                {selectedItems.length === 0 ? (
                <p style={{ color: '#666', fontSize: '14px' }}>
                    No items added yet. Click on cities to start planning!
                </p>
                ) : (
                <ul style={{ paddingLeft: '20px' }}>
                    {selectedItems.map((item, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                        {item}
                    </li>
                    ))}
                </ul>
                )}
            </div>

            <Link to="/itinerary">
                <button
                disabled={selectedItems.length === 0}
                style={{
                    width: '100%',
                    padding: '12px',
                    cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer',
                    backgroundColor: selectedItems.length === 0 ? '#ccc' : '',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
                >
                Finish Itinerary
                </button>
            </Link>
            </div>
        </div>
        </div>
    )
}
