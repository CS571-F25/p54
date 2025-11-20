import { Link } from 'react-router'
import TopNav from './TopNav'

export default function PastDestinations() {
    const pastTrips = []

    return (
        <div className="min-vh-100 d-flex flex-column">
            <TopNav />

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold text-white">Past Destinations</h1>
                    <p className="lead" style={{ color: '#b0b0b0' }}>Your travel history.</p>
                </div>

                {pastTrips.length === 0 ? (
                    <div className="card mx-auto text-center p-5 shadow-lg" style={{ maxWidth: '600px' }}>
                        <div className="mb-3 display-1 opacity-25">🛫</div>
                        <h3 className="mb-3 text-white">No trips saved yet</h3>
                        <p className="mb-4" style={{ color: '#b0b0b0' }}>
                            You haven't finalized any trips yet.
                        </p>
                        <Link to="/">
                            <button className="btn btn-gradient btn-lg px-5 rounded-pill">
                                Plan Your First Trip
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {pastTrips.map((trip, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title text-white">{trip.name}</h5>
                                        <p className="card-text" style={{ color: '#b0b0b0' }}>{trip.date}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-outline-secondary w-100 text-white border-secondary">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}