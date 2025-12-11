import { Card, Row, Col } from 'react-bootstrap'

export default function TripStats({ cityCount, activityCount }) {
    return (
        <Row className="g-3 mb-4">
            <Col xs={6}>
                <Card className="bg-dark text-white border-secondary h-100 text-center py-3">
                    <h3 className="fw-bold mb-0 text-info">{cityCount}</h3>
                    <small className="text-secondary text-uppercase tracking-wide">Cities</small>
                </Card>
            </Col>
            <Col xs={6}>
                <Card className="bg-dark text-white border-secondary h-100 text-center py-3">
                    <h3 className="fw-bold mb-0 text-success">{activityCount}</h3>
                    <small className="text-secondary text-uppercase tracking-wide">Activities</small>
                </Card>
            </Col>
        </Row>
    )
}