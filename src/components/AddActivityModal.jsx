import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function AddActivityModal({ show, onClose, onSave, cities }) {
    const [activity, setActivity] = useState('')
    const [selectedCity, setSelectedCity] = useState(cities[0] || '')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (activity.trim() && selectedCity) {
            onSave(selectedCity, activity)
            setActivity('')
            onClose()
        }
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton className="bg-dark text-white border-secondary">
                <Modal.Title>Add New Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Select City</Form.Label>
                        <Form.Select 
                            value={selectedCity} 
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="bg-secondary text-white border-0"
                        >
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Visit the Louvre"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            autoFocus
                            className="bg-secondary text-white border-0"
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="outline-light" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="btn-gradient">
                            Add Activity
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}