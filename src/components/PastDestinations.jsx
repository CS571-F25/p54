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
                    <h1 className="display-5 fw-bold text-white">My Trips</h1>
                    <p className="lead" style={{ color: '#666' }}>A collection of your planned trips.</p>
                </div>

                {pastTrips.length === 0 ? (
                    <Card className="mx-auto text-center p-5 border-0 bg-dark shadow-lg" style={{ maxWidth: '600px' }}>
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
                                <Card className="h-100 bg-dark border-0 shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="text-white fw-bold mb-3">{trip.name}</Card.Title>
                                        <Card.Subtitle className="mb-3 text-secondary small">
                                            Created: {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : 'Unknown'}
                                        </Card.Subtitle>
                                        
                                        <div className="mb-3">
                                            <Badge bg="dark" className="me-2 text-info border border-secondary">
                                                {trip.cities?.length || 0} Cities
                                            </Badge>
                                            <Badge bg="dark" className="text-success border border-secondary">
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
                                    <Card.Footer className="bg-transparent border-0 d-flex gap-2 pt-0">
                                        <Button 
                                            variant="outline-secondary" 
                                            className="w-100 btn-sm text-light border-secondary"
                                            onClick={() => handleViewDetails(trip)}
                                        >
                                            Details
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            className="btn-sm border-danger"
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

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton className="bg-dark text-white border-0">
                    <Modal.Title>{selectedTrip?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {selectedTrip && (
                        <div>
                            <h5 className="text-secondary mb-4 text-uppercase small tracking-wide">Itinerary Breakdown</h5>
                            {selectedTrip.cities?.map((city, idx) => {
                                const cityActivities = selectedTrip.activities?.[city] || []
                                return (
                                    <div key={idx} className="mb-4">
                                        <h6 className="fw-bold fs-5 text-white">
                                            <span className="text-info me-2">{idx + 1}.</span>
                                            {city}
                                        </h6>
                                        {cityActivities.length > 0 ? (
                                            <ListGroup variant="flush" className="mt-2 ms-4 border-start border-secondary ps-3">
                                                {cityActivities.map((act, i) => (
                                                    <div key={i} className="text-secondary py-1">
                                                        {act}
                                                    </div>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p className="text-secondary ms-4 small opacity-50 mt-1">No activities planned.</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark border-0">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}