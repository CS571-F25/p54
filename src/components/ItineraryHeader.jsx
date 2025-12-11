import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ItineraryHeader({ title, onTitleChange }) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempTitle, setTempTitle] = useState(title)

    const handleSave = () => {
        if (tempTitle.trim()) {
            onTitleChange(tempTitle)
        }
        setIsEditing(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave()
    }

    return (
        <div className="d-flex justify-content-between align-items-end mb-5 pb-4" style={{ borderBottom: '1px solid #333' }}>
            <div className="w-100">
                <small className="text-secondary text-uppercase tracking-wide">Trip Planner</small>
                
                {isEditing ? (
                    <InputGroup className="mt-2" style={{ maxWidth: '600px' }}>
                        <Form.Control
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="bg-dark text-white border-secondary fs-2 fw-bold"
                        />
                        <Button variant="outline-success" onClick={handleSave}>Save</Button>
                        <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </InputGroup>
                ) : (
                    <div className="d-flex align-items-center gap-3 mt-2">
                        <h1 className="display-5 fw-bold text-white mb-0">{title}</h1>
                        <Button 
                            variant="link" 
                            className="text-secondary p-0 fs-5 opacity-50 hover-opacity-100"
                            onClick={() => {
                                setTempTitle(title)
                                setIsEditing(true)
                            }}
                            title="Rename Trip"
                        >
                            ✏️
                        </Button>
                    </div>
                )}
            </div>
            {!isEditing && (
                <Button as={Link} to="/" variant="outline-dark" size="sm" className="text-secondary">
                    &larr; Back to Map
                </Button>
            )}
        </div>
    )
}