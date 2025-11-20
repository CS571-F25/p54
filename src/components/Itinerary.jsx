import { Link } from 'react-router'
import TopNav from './TopNav'

export default function Itinerary() {
    const handleDownload = () => console.log('Download')
    const handleSend = () => console.log('Send')

    return (
        <div className="min-vh-100 d-flex flex-column">
            <TopNav />

            <div className="container py-5" style={{ maxWidth: '900px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold text-white">Your Itinerary</h1>
                    <Link to="/" className="btn btn-outline-secondary btn-sm text-white border-secondary">
                        &larr; Back to Map
                    </Link>
                </div>

                {/* Overview Card */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header py-3">
                        <h5 className="mb-0 fw-bold text-white">Trip Overview</h5>
                    </div>
                    <div className="card-body">
                        {/* Using custom color to ensure visibility */}
                        <p style={{ color: '#b0b0b0', fontStyle: 'italic' }}>
                            Destinations selected will be displayed here...
                        </p>
                    </div>
                </div>

                {/* Activities Card */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header py-3">
                        <h5 className="mb-0 fw-bold text-white">Activities & Attractions</h5>
                    </div>
                    <div className="card-body">
                        <p style={{ color: '#b0b0b0' }}>
                            Selected activities organized by city/day will go here.
                        </p>
                    </div>
                </div>

                {/* Custom Activity Button */}
                <div className="card mb-4 bg-transparent p-4 text-center" style={{ border: '1px dashed #444' }}>
                    <div>
                        <button className="btn btn-outline-secondary text-white border-secondary">
                            + Add Custom Activity
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-3 justify-content-end pt-4">
                    <button onClick={handleDownload} className="btn btn-outline-secondary text-white border-secondary">
                        Download PDF
                    </button>
                    <button onClick={handleSend} className="btn btn-outline-secondary text-white border-secondary">
                        Send to Agent
                    </button>
                    <button className="btn btn-gradient px-4">
                        Save Trip
                    </button>
                </div>
            </div>
        </div>
    )
}