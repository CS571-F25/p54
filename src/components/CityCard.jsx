import { Card, Button } from 'react-bootstrap'
import CityHighlights from './CityHighlights'

export default function CityCard({ city, onAdd, onClose, isAdded }) {
    if (!city) return null;

    const imageSrc = city.imageUrl || `https://source.unsplash.com/600x400/?${encodeURIComponent(city.name)},city`;
    const imageAlt = city.tagline ? `${city.name}: ${city.tagline}` : `City view of ${city.name}`;

    return (
        <Card className="shadow-lg" style={{ minWidth: '320px', maxWidth: '420px' }}>
            <Card.Img
                variant="top"
                src={imageSrc}
                alt={imageAlt}
                style={{ height: '220px', objectFit: 'cover' }}
            />
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <CityHighlights city={city} />
                    <Button
                        aria-label="Close city details"
                        variant="outline-secondary"
                        size="sm"
                        onClick={onClose}
                        className="text-white border-secondary"
                    >
                        ×
                    </Button>
                </div>

                <div className="d-flex gap-2">
                    <Button
                        variant="primary"
                        className="btn-gradient flex-grow-1"
                        onClick={onAdd}
                        disabled={isAdded}
                    >
                        {isAdded ? 'Already added' : 'Add to itinerary'}
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="text-white border-secondary"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
