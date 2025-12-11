import { ListGroup, Button } from 'react-bootstrap'

export default function ActivityItem({ text, onDelete }) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent border-bottom border-secondary text-white px-0 py-2">
            <span>
                <span className="me-2 text-info">•</span>
                {text}
            </span>
            <Button 
                variant="link" 
                size="sm" 
                onClick={onDelete}
                className="text-secondary text-decoration-none"
                style={{ fontSize: '1.2rem', lineHeight: 1 }}
                aria-label="Remove activity"
            >
                &times;
            </Button>
        </ListGroup.Item>
    )
}