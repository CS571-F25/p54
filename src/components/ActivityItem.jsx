import { ListGroup, Button } from 'react-bootstrap'

export default function ActivityItem({ text, onDelete }) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent border-0 text-white px-0 py-1">
            <span className="d-flex align-items-center">
                <span className="me-3 text-secondary" style={{ fontSize: '0.8rem' }}>●</span>
                {text}
            </span>
            <Button 
                variant="link" 
                size="sm" 
                onClick={onDelete}
                className="text-secondary text-decoration-none opacity-50"
                style={{ fontSize: '1.2rem', lineHeight: 1 }}
                aria-label="Remove activity"
            >
                &times;
            </Button>
        </ListGroup.Item>
    )
}