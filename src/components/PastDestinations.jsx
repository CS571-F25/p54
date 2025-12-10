import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Button, Row, Col, ListGroup, Badge } from 'react-bootstrap'
import TopNav from './TopNav'

export default function PastDestinations() {
    const [pastTrips, setPastTrips] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem('pastTrips')
        if (stored) {
            try {
                setPastTrips(JSON.parse(stored))
            } catch (e) {
                console.error('Could not parse past trips', e)
            }
        }
    }, [])

    return (
        <div className="min-vh-100 d-flex flex-column">
            <TopNav />

            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold text-white">Past Destinations</h1>
                    <p className="lead" style={{ color: '#b0b0b0' }}>Your travel history.</p>
                </div>

                {pastTrips.length === 0 ? (
                    <Card className="mx-auto text-center p-5 shadow-lg" style={{ maxWidth: '600px' }}>
                        <Card.Body>
                            <div className="mb-3 display-1 opacity-25">🛫</div>
                            <h2 className="h3 mb-3 text-white">No trips saved yet</h2>
                            <p className="mb-4" style={{ color: '#b0b0b0' }}>
                                You haven't finalized any trips yet.
                            </p>
                            <Button as={Link} to="/" className="btn-gradient btn-lg px-5 rounded-pill">
                                Plan Your First Trip
                            </Button>
                        </Card.Body>
                    </Card>
                ) : (
                    <Row xs={1} md={3} className="g-4">
                        {pastTrips.map((trip, index) => (
                            <Col key={index}>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title className="text-white">{trip.name}</Card.Title>
                                        <Card.Text style={{ color: '#b0b0b0' }}>
                                            {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : ''}
                                        </Card.Text>
                                        {trip.cities?.length > 0 && (
                                            <ListGroup variant="flush">
                                                {trip.cities.map((city, idx) => (
                                                    <ListGroup.Item key={idx} className="px-0 d-flex align-items-center gap-2">
                                                        <Badge bg="secondary">{idx + 1}</Badge>
                                                        <span className="text-white">{city}</span>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="outline-secondary" className="w-100 text-white border-secondary">
                                            View Details
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    )
}
