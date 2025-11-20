import { Link } from 'react-router'

export default function PastDestinations() {
    const pastTrips = []

    return <div style={{ padding: '20px' }}>
        <h1>Past Destinations</h1>
        
        {pastTrips.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <p>You haven't saved any trips yet</p>
                <Link to="/">
                    <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Plan Your First Trip
                    </button>
                </Link>
            </div>
        ) : (
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {pastTrips.map((trip, index) => (
                    <div 
                        key={index}
                        style={{ 
                            border: '1px solid #ccc', 
                            padding: '20px',
                            borderRadius: '8px'
                        }}
                    >
                        <h3>{trip.name}</h3>
                        <p>{trip.date}</p>
                        <Link to={`/past-destinations/${trip.id}`}>
                            <button style={{ cursor: 'pointer' }}>
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        )}
    </div>
}
