import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Container className="py-5">
        <Row className="align-items-center min-vh-100">
          <Col md={6}>
            <h1 className="display-3 fw-bold mb-4">Welcome to Gift Link</h1>
            <p className="lead mb-4">
              Share the joy of giving! Discover unique gifts or share yours with the community.
              Connect with others and make someone's day special.
            </p>
            <div className="d-flex gap-3">
              <Button as={Link} to="/gifts" variant="primary" size="lg">
                Browse Gifts
              </Button>
              <Button as={Link} to="/register" variant="outline-primary" size="lg">
                Get Started
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600" 
                alt="Gifts" 
                className="img-fluid rounded shadow"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
