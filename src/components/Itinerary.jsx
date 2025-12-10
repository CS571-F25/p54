import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Button, Stack, ListGroup, Alert } from 'react-bootstrap'
import TopNav from './TopNav'

export default function Itinerary() {
    const [trip, setTrip] = useState(null)
    const [saveMessage, setSaveMessage] = useState('')

    useEffect(() => {
        const stored = localStorage.getItem('currentItinerary')
        if (stored) {
            try {
                setTrip(JSON.parse(stored))
            } catch (e) {
                console.error('Invalid itinerary data', e)
            }
        }
    }, [])

    const handleDownload = () => console.log('Download')
    const handleSend = () => console.log('Send')

    const handleSaveTrip = () => {
        if (!trip) return
        const stored = localStorage.getItem('pastTrips')
        const pastTrips = stored ? JSON.parse(stored) : []
        // avoid duplicates by id
        if (!pastTrips.find(t => t.id === trip.id)) {
            pastTrips.push(trip)
            localStorage.setItem('pastTrips', JSON.stringify(pastTrips))
            setSaveMessage('Trip saved! You can view it in Past Destinations.')
        } else {
            setSaveMessage('Trip already saved.')
        }
    }

    return (
        <div className="min-vh-100 d-flex flex-column">
            <TopNav />

            <Container className="py-5" style={{ maxWidth: '900px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold text-white">Your Itinerary</h1>
                    <Button as={Link} to="/" variant="outline-secondary" size="sm" className="text-white border-secondary">
                        &larr; Back to Map
                    </Button>
                </div>

                <Card className="mb-4 shadow-sm">
                    <Card.Header className="py-3">
                        <h2 className="h5 mb-0 fw-bold text-white">Trip Overview</h2>
                    </Card.Header>
                    <Card.Body>
                        {trip && trip.cities?.length ? (
                            <ListGroup variant="flush">
                                {trip.cities.map((city, idx) => (
                                    <ListGroup.Item key={idx} className="px-0 text-white d-flex justify-content-between align-items-center">
                                        <span>{city}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p style={{ color: '#b0b0b0', fontStyle: 'italic' }}>
                                Destinations selected will be displayed here...
                            </p>
                        )}
                    </Card.Body>
                </Card>

                <Card className="mb-4 shadow-sm">
                    <Card.Header className="py-3">
                        <h2 className="h5 mb-0 fw-bold text-white">Activities & Attractions</h2>
                    </Card.Header>
                    <Card.Body>
                        <p style={{ color: '#b0b0b0' }}>
                            Selected activities organized by city/day will go here.
                        </p>
                    </Card.Body>
                </Card>

                <Card className="mb-4 bg-transparent text-center" style={{ border: '1px dashed #444' }}>
                    <Card.Body>
                        <Button variant="outline-secondary" className="text-white border-secondary">
                            + Add Custom Activity
                        </Button>
                    </Card.Body>
                </Card>

                <Stack direction="horizontal" gap={3} className="justify-content-end pt-4 flex-wrap">
                    <Button onClick={handleDownload} variant="outline-secondary" className="text-white border-secondary">
                        Download PDF
                    </Button>
                    <Button onClick={handleSend} variant="outline-secondary" className="text-white border-secondary">
                        Send to Agent
                    </Button>
                    <Button className="btn-gradient px-4" onClick={handleSaveTrip} disabled={!trip}>
                        Save Trip
                    </Button>
                </Stack>

                {saveMessage && (
                    <Alert variant="success" className="mt-3" onClose={() => setSaveMessage('')} dismissible>
                        {saveMessage}
                    </Alert>
                )}
            </Container>
        </div>
    )
}
