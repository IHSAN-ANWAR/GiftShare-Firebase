import { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getGiftById } from '../../services/giftService';

function DetailsPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGiftDetails();
  }, [id]);

  const fetchGiftDetails = async () => {
    try {
      const data = await getGiftById(id);
      setGift(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate('/gifts')}>Back to Gifts</Button>
      </Container>
    );
  }

  if (!gift) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Gift not found</Alert>
        <Button onClick={() => navigate('/gifts')}>Back to Gifts</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button onClick={() => navigate('/gifts')} className="mb-3">
        ← Back to Gifts
      </Button>
      
      <Card>
        <Row className="g-0">
          {gift.image && (
            <Col md={6}>
              <Card.Img 
                src={gift.image} 
                alt={gift.name}
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </Col>
          )}
          <Col md={gift.image ? 6 : 12}>
            <Card.Body>
              <Card.Title as="h2">{gift.name}</Card.Title>
              
              <div className="mb-3">
                <h5>Details</h5>
                <p><strong>Category:</strong> {gift.category || 'N/A'}</p>
                <p><strong>Condition:</strong> {gift.condition || 'N/A'}</p>
                {gift.age_years && (
                  <p><strong>Age:</strong> {gift.age_years} years</p>
                )}
                {gift.description && (
                  <div>
                    <strong>Description:</strong>
                    <p>{gift.description}</p>
                  </div>
                )}
              </div>
              
              {user && (
                <Button variant="success">
                  Contact Giver
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default DetailsPage;
