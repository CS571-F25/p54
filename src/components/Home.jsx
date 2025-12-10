import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Button, Form, Alert } from 'react-bootstrap'
import EuropeMap from './EuropeMap'
import TopNav from './TopNav'
import CityCard from './CityCard'
import citiesData from '../data/cities.json'

export default function Home() {
    const [selectedItems, setSelectedItems] = useState([])
    const [activeCity, setActiveCity] = useState(null)
    const [cities, setCities] = useState([])
    const [lookupError, setLookupError] = useState('')
    const [cityInput, setCityInput] = useState('')

    useEffect(() => {
        setCities(citiesData)
    }, [])

    const handleCityClick = (city) => {
        setActiveCity(city)
    }

    const handleAddCity = (cityName) => {
        setSelectedItems((prev) =>
            prev.includes(cityName) ? prev : [...prev, cityName]
        )
    }

    const handleRemoveCity = (cityToRemove) => {
        setSelectedItems((prev) => prev.filter(c => c !== cityToRemove))
    }

    const handleFinalize = () => {
        if (selectedItems.length === 0) return
        const trip = {
            id: Date.now(),
            name: 'My Trip',
            cities: selectedItems,
            createdAt: new Date().toISOString()
        }
        localStorage.setItem('currentItinerary', JSON.stringify(trip))
    }

    const handleInputSubmit = (e) => {
        e.preventDefault()
        const trimmed = cityInput.trim()
        if (!trimmed) return

        const match = cities.find(
            (c) => c.name.toLowerCase() === trimmed.toLowerCase()
        )

        if (match) {
            handleAddCity(match.name)
            setActiveCity(match)
            setLookupError('')
        } else {
            setLookupError(`City "${trimmed}" was not found.`)
        }
    }

    // Define a subtle separator style to replace harsh borders
    const subtleBorder = { borderBottom: '1px solid rgba(255,255,255,0.05)' }

    return (
        <div className="d-flex flex-column vh-100">
            <TopNav />

            <Container fluid className="flex-grow-1 p-0 overflow-hidden">
                <Row className="h-100 g-0">
                    <Col md={4} lg={3} className="d-flex flex-column z-1 shadow-lg"
                        style={{ backgroundColor: '#1e1e1e', boxShadow: '4px 0 15px rgba(0,0,0,0.3)' }}>
                        <div className="p-4" style={subtleBorder}>
                            <h5 className="fw-bold mb-1 text-white">Trip Planner</h5>
                            <small style={{ color: '#888' }}>Select cities on the map to build your route.</small>
                        </div>

                        <div className="flex-grow-1 overflow-auto p-3">
                            <Form onSubmit={handleInputSubmit} className="mb-3">
                                <Form.Label className="text-white">Add a city by name</Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        value={cityInput}
                                        onChange={(e) => setCityInput(e.target.value)}
                                        placeholder="e.g. Madrid"
                                        aria-label="City name"
                                    />
                                    <Button type="submit" variant="secondary">
                                        Add
                                    </Button>
                                </div>
                            </Form>

                            {lookupError && (
                                <Alert variant="warning" onClose={() => setLookupError('')} dismissible>
                                    {lookupError}
                                </Alert>
                            )}

                            {selectedItems.length === 0 ? (
                                <div className="h-100 d-flex flex-column justify-content-center align-items-center opacity-50">
                                    <div className="display-4 mb-3">🗺️</div>
                                    <p className="text-center px-3 small text-white">
                                        List is empty.<br />Click pins on the map or type a city name.
                                    </p>
                                </div>
                            ) : (
                                <ListGroup variant="flush">
                                    {selectedItems.map((item, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            className="d-flex justify-content-between align-items-center px-0"
                                            style={subtleBorder}
                                        >
                                            <span className="fw-medium text-white">{item}</span>
                                            <Button
                                                variant="link"
                                                className="text-secondary text-decoration-none"
                                                onClick={() => handleRemoveCity(item)}
                                                aria-label={`Remove ${item}`}
                                            >
                                                &times;
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </div>

                        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <Button
                                as={Link}
                                to="/itinerary"
                                className="w-100 py-2 rounded fw-bold text-white btn-gradient"
                                disabled={selectedItems.length === 0}
                                onClick={handleFinalize}
                                style={{
                                    background: selectedItems.length === 0 ? '#333' : undefined,
                                    opacity: selectedItems.length === 0 ? 0.5 : 1,
                                    border: 'none'
                                }}
                            >
                                Finalize Itinerary &rarr;
                            </Button>
                        </div>
                    </Col>

                    <Col md={8} lg={9} className="position-relative h-100 bg-black">
                        <div className="w-100 h-100" style={{ opacity: 0.9 }}>
                            <EuropeMap onCityClick={handleCityClick} cities={cities} />
                        </div>

                        {activeCity && (
                            <div className="position-absolute bottom-0 start-0 p-3" style={{ maxWidth: '440px' }}>
                                <CityCard
                                    city={activeCity}
                                    onAdd={() => handleAddCity(activeCity.name)}
                                    onClose={() => setActiveCity(null)}
                                    isAdded={selectedItems.includes(activeCity.name)}
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
