import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Button, Row, Col, ListGroup, Badge, Modal } from 'react-bootstrap'
import TopNav from './TopNav'

export default function PastDestinations() {
    const [pastTrips, setPastTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadTrips()
    }, [])

    const loadTrips = () => {
        const stored = localStorage.getItem('pastTrips')
        if (stored) {
            try {
                setPastTrips(JSON.parse(stored))
            } catch (e) {
                console.error('Could not parse past trips', e)
            }
        }
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this trip history?")) {
            const updatedTrips = pastTrips.filter(t => t.id !== id)
            localStorage.setItem('pastTrips', JSON.stringify(updatedTrips))
            setPastTrips(updatedTrips)
        }
    }

    const handleViewDetails = (trip) => {
        setSelectedTrip(trip)
        setShowModal(true)
    }

    return (
        <div className="min-vh-100 d-flex flex-column bg-black">
            <TopNav />

            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold text-white">Past Destinations</h1>
                    <p className="lead" style={{ color: '#b0b0b0' }}>Your travel history.</p>
                </div>

                {pastTrips.length === 0 ? (
                    <Card className="mx-auto text-center p-5 shadow-lg bg-dark border-secondary" style={{ maxWidth: '600px' }}>
                        <Card.Body>
                            <div className="mb-3 display-1 opacity-25 text-white">🛫</div>
                            <h2 className="h3 mb-3 text-white">No trips saved yet</h2>
                            <p className="mb-4 text-secondary">
                                You haven't saved any trips yet.
                            </p>
                            <Button as={Link} to="/" className="btn-gradient btn-lg px-5 rounded-pill">
                                Plan Your First Trip
                            </Button>
                        </Card.Body>
                    </Card>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {pastTrips.map((trip) => (
                            <Col key={trip.id}>
                                <Card className="h-100 bg-dark border-secondary shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="text-white fw-bold mb-3">{trip.name}</Card.Title>
                                        <Card.Subtitle className="mb-3 text-secondary small">
                                            Created: {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : 'Unknown'}
                                        </Card.Subtitle>
                                        
                                        <div className="mb-3">
                                            <Badge bg="info" className="me-2 text-dark">
                                                {trip.cities?.length || 0} Cities
                                            </Badge>
                                            <Badge bg="secondary">
                                                {trip.activities ? Object.values(trip.activities).flat().length : 0} Activities
                                            </Badge>
                                        </div>

                                        {trip.cities?.length > 0 && (
                                            <div className="text-secondary small mb-3">
                                                Route: {trip.cities.slice(0, 3).join(' → ')}
                                                {trip.cities.length > 3 && '...'}
                                            </div>
                                        )}
                                    </Card.Body>
                                    <Card.Footer className="bg-transparent border-top border-secondary d-flex gap-2">
                                        <Button 
                                            variant="outline-light" 
                                            className="w-100 btn-sm"
                                            onClick={() => handleViewDetails(trip)}
                                        >
                                            View Details
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            className="btn-sm"
                                            onClick={() => handleDelete(trip.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>

            {/* Trip Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton className="bg-dark text-white border-secondary">
                    <Modal.Title>{selectedTrip?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {selectedTrip && (
                        <div>
                            <h5 className="text-info mb-3">Itinerary Breakdown</h5>
                            {selectedTrip.cities?.map((city, idx) => {
                                const cityActivities = selectedTrip.activities?.[city] || []
                                return (
                                    <div key={idx} className="mb-4 border-bottom border-secondary pb-3">
                                        <h6 className="fw-bold fs-5">
                                            <Badge bg="light" text="dark" className="me-2">{idx + 1}</Badge>
                                            {city}
                                        </h6>
                                        {cityActivities.length > 0 ? (
                                            <ListGroup variant="flush" className="mt-2 ms-4">
                                                {cityActivities.map((act, i) => (
                                                    <ListGroup.Item key={i} className="bg-transparent text-secondary py-1 ps-0 border-0">
                                                        • {act}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p className="text-secondary ms-4 small fst-italic mt-1">No activities planned.</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark border-secondary">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}