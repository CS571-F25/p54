import { Card, Row, Col } from 'react-bootstrap'

export default function TripStats({ cityCount, activityCount }) {
    return (
        <Row className="g-3 mb-4">
            <Col xs={6}>
                <Card className="bg-dark text-white border-secondary h-100 text-center py-3">
                    <div className="fw-bold mb-0 text-info display-6" aria-label={`Cities: ${cityCount}`}>
                        {cityCount}
                    </div>
                    <p className="text-secondary text-uppercase tracking-wide mb-0">Cities</p>
                </Card>
            </Col>
            <Col xs={6}>
                <Card className="bg-dark text-white border-secondary h-100 text-center py-3">
                    <div className="fw-bold mb-0 text-success display-6" aria-label={`Activities: ${activityCount}`}>
                        {activityCount}
                    </div>
                    <p className="text-secondary text-uppercase tracking-wide mb-0">Activities</p>
                </Card>
            </Col>
        </Row>
    )
}
