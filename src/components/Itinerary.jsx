import { useEffect, useState } from 'react'
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap'
import TopNav from './TopNav'
import AddActivityModal from './AddActivityModal'
import ActivityItem from './ActivityItem'
import ItineraryHeader from './ItineraryHeader'
import TripStats from './TripStats'

export default function Itinerary() {
    const [trip, setTrip] = useState(null)
    const [activities, setActivities] = useState({}) // Object: { "Paris": ["Louvre", "Cafe"], "London": [] }
    const [saveMessage, setSaveMessage] = useState('')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('currentItinerary')
        if (stored) {
            try {
                const parsedTrip = JSON.parse(stored)
                setTrip(parsedTrip)
                // If the trip already has activities saved, load them, otherwise start empty
                setActivities(parsedTrip.activities || {})
            } catch (e) {
                console.error('Invalid itinerary data', e)
            }
        }
    }, [])

    const handleAddActivity = (city, activityText) => {
        setActivities(prev => {
            const cityActivities = prev[city] ? [...prev[city]] : []
            cityActivities.push(activityText)
            return { ...prev, [city]: cityActivities }
        })
    }

    const handleDeleteActivity = (city, indexToRemove) => {
        setActivities(prev => {
            const cityActivities = [...prev[city]]
            cityActivities.splice(indexToRemove, 1)
            return { ...prev, [city]: cityActivities }
        })
    }

    const handleSaveTrip = () => {
        if (!trip) return
        
        // Merge current activities state into the trip object
        const finalTrip = { ...trip, activities }
        
        const stored = localStorage.getItem('pastTrips')
        const pastTrips = stored ? JSON.parse(stored) : []
        
        // Check for duplicates based on ID
        const existingIndex = pastTrips.findIndex(t => t.id === finalTrip.id)
        
        if (existingIndex >= 0) {
            // Update existing trip
            pastTrips[existingIndex] = finalTrip
            setSaveMessage('Trip updated successfully!')
        } else {
            // Add new trip
            pastTrips.push(finalTrip)
            setSaveMessage('Trip saved! You can view it in Past Destinations.')
        }
        
        localStorage.setItem('pastTrips', JSON.stringify(pastTrips))
        
        // Also update current itinerary in storage so changes persist on refresh
        localStorage.setItem('currentItinerary', JSON.stringify(finalTrip))
    }

    // Calculate total activities for stats
    const totalActivities = Object.values(activities).reduce((acc, curr) => acc + curr.length, 0)

    if (!trip) return <div className="text-white text-center pt-5">Loading...</div>

    return (
        <div className="min-vh-100 d-flex flex-column bg-black">
            <TopNav />

            <Container className="py-5" style={{ maxWidth: '900px' }}>
                
                <ItineraryHeader title={trip.name || "Your Itinerary"} />

                <TripStats 
                    cityCount={trip.cities?.length || 0} 
                    activityCount={totalActivities} 
                />

                <div className="d-grid gap-4">
                    {trip.cities && trip.cities.map((city) => (
                        <Card key={city} className="shadow-lg border-0 bg-dark text-white">
                            <Card.Header className="py-3 border-secondary d-flex justify-content-between align-items-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                <h2 className="h4 mb-0 fw-bold">{city}</h2>
                            </Card.Header>
                            <Card.Body>
                                {(!activities[city] || activities[city].length === 0) ? (
                                    <p className="text-secondary fst-italic mb-0">No activities added yet.</p>
                                ) : (
                                    <div className="mb-2">
                                        {activities[city].map((act, idx) => (
                                            <ActivityItem 
                                                key={idx} 
                                                text={act} 
                                                onDelete={() => handleDeleteActivity(city, idx)} 
                                            />
                                        ))}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </div>

                <div className="mt-4 text-center">
                    <Button 
                        variant="outline-secondary" 
                        className="text-white border-secondary border-dashed w-100 py-3 mb-4"
                        style={{ borderStyle: 'dashed' }}
                        onClick={() => setShowModal(true)}
                    >
                        + Add Custom Activity
                    </Button>
                </div>

                <div className="d-flex justify-content-end pt-2">
                    <Button 
                        className="btn-gradient px-5 py-2 fw-bold rounded-pill" 
                        onClick={handleSaveTrip}
                        size="lg"
                    >
                        Save Trip
                    </Button>
                </div>

                {saveMessage && (
                    <Alert variant="success" className="mt-4 text-center" onClose={() => setSaveMessage('')} dismissible>
                        {saveMessage}
                    </Alert>
                )}

                <AddActivityModal 
                    show={showModal} 
                    onClose={() => setShowModal(false)} 
                    onSave={handleAddActivity}
                    cities={trip.cities || []}
                />
            </Container>
        </div>
    )
}