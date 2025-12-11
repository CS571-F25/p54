import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import TopNav from './TopNav'
import AddActivityModal from './AddActivityModal'
import ActivityItem from './ActivityItem'
import ItineraryHeader from './ItineraryHeader'
import TripStats from './TripStats'

export default function Itinerary() {
    const [trip, setTrip] = useState(null)
    const [activities, setActivities] = useState({})
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const stored = localStorage.getItem('currentItinerary')
        if (stored) {
            try {
                const parsedTrip = JSON.parse(stored)
                setTrip(parsedTrip)
                setActivities(parsedTrip.activities || {})
            } catch (e) {
                console.error('Invalid itinerary data', e)
            }
        }
    }, [])

    const handleUpdateTitle = (newTitle) => {
        const updatedTrip = { ...trip, name: newTitle }
        setTrip(updatedTrip)
        localStorage.setItem('currentItinerary', JSON.stringify({ ...updatedTrip, activities }))
    }

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

    const handleClearTrip = () => {
        if (window.confirm("Are you sure you want to clear this itinerary? This cannot be undone.")) {
            localStorage.removeItem('currentItinerary')
            setTrip(null)
            setActivities({})
        }
    }

    const handleSaveTrip = () => {
        if (!trip) return
        
        const finalTrip = { ...trip, activities }
        const stored = localStorage.getItem('pastTrips')
        const pastTrips = stored ? JSON.parse(stored) : []
        
        const existingIndex = pastTrips.findIndex(t => t.id === finalTrip.id)
        
        if (existingIndex >= 0) {
            pastTrips[existingIndex] = finalTrip
        } else {
            pastTrips.push(finalTrip)
        }
        
        localStorage.setItem('pastTrips', JSON.stringify(pastTrips))
        
        localStorage.removeItem('currentItinerary')
        
        navigate('/past-destinations')
    }

    const totalActivities = Object.values(activities).reduce((acc, curr) => acc + curr.length, 0)

    if (!trip) {
        return (
            <div className="min-vh-100 d-flex flex-column bg-black">
                <TopNav />
                <Container className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                    <div className="text-secondary text-center">
                        <h2 className="text-white">No Active Itinerary</h2>
                        <p>Go to the Planner to start building your trip.</p>
                        <Button href="/p54/" variant="outline-light">Go to Planner</Button>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="min-vh-100 d-flex flex-column bg-black">
            <TopNav />

            <Container className="py-5" style={{ maxWidth: '900px' }}>
                
                <ItineraryHeader title={trip.name || "My Trip"} onTitleChange={handleUpdateTitle} />

                <TripStats 
                    cityCount={trip.cities?.length || 0} 
                    activityCount={totalActivities} 
                />

                <div className="d-grid gap-4">
                    {trip.cities && trip.cities.map((city) => (
                        <Card key={city} className="shadow-lg border-0 bg-dark text-white">
                            <Card.Header className="py-3 border-0 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#212529' }}>
                                <h2 className="h4 mb-0 fw-bold">{city}</h2>
                            </Card.Header>
                            <Card.Body className="pt-0">
                                {(!activities[city] || activities[city].length === 0) ? (
                                    <p className="text-secondary fst-italic mb-0 py-2 small">No activities added yet.</p>
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
                        variant="outline-dark" 
                        className="text-secondary w-100 py-3 mb-4"
                        style={{ border: '1px dashed #444' }}
                        onClick={() => setShowModal(true)}
                    >
                        + Add Custom Activity
                    </Button>
                </div>

                <div className="d-flex justify-content-between pt-2 border-top border-secondary pt-4">
                    <Button 
                        variant="outline-danger" 
                        onClick={handleClearTrip}
                        className="border-0"
                    >
                        Clear Itinerary
                    </Button>
                    <Button 
                        className="btn-gradient px-5 fw-bold rounded-pill" 
                        onClick={handleSaveTrip}
                        size="lg"
                    >
                        Save Trip
                    </Button>
                </div>

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
