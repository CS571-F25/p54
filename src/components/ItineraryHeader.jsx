import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ItineraryHeader({ title }) {
    return (
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary pb-4">
            <div>
                <h1 className="display-5 fw-bold text-white mb-0">{title}</h1>
                <p className="text-secondary mb-0">Plan your perfect getaway.</p>
            </div>
            <Button as={Link} to="/" variant="outline-light" size="sm">
                &larr; Back to Map
            </Button>
        </div>
    )
}