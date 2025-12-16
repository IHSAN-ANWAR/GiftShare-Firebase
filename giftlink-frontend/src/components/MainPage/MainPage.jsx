import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllGifts, addGift } from '../../services/giftService';

function MainPage({ user }) {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const data = await getAllGifts();
      setGifts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSampleGifts = async () => {
    setAdding(true);
    const sampleGifts = [
      {
        name: "Vintage Camera",
        category: "Electronics",
        condition: "Good",
        age_years: 10,
        description: "A classic vintage camera in good working condition. Perfect for photography enthusiasts.",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"
      },
      {
        name: "Kitchen Mixer",
        category: "Appliances",
        condition: "New",
        age_years: 0,
        description: "Brand new kitchen mixer, never used. Still in original packaging.",
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400"
      },
      {
        name: "Board Games Set",
        category: "Toys",
        condition: "Good",
        age_years: 3,
        description: "Collection of 5 classic board games. Some wear on boxes but all pieces included.",
        image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400"
      },
      {
        name: "Yoga Mat",
        category: "Sports",
        condition: "Like New",
        age_years: 1,
        description: "Barely used yoga mat with carrying strap. Non-slip surface.",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400"
      },
      {
        name: "Guitar",
        category: "Musical Instruments",
        condition: "Good",
        age_years: 8,
        description: "Acoustic guitar in good condition. Great for beginners.",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400"
      },
      {
        name: "Winter Coat",
        category: "Clothing",
        condition: "Like New",
        age_years: 1,
        description: "Women's winter coat, size M. Warm and stylish, barely worn.",
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400"
      },
      {
        name: "Coffee Table",
        category: "Furniture",
        condition: "Good",
        age_years: 5,
        description: "Solid wood coffee table with minor scratches. Sturdy and functional.",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"
      },
      {
        name: "Bluetooth Speaker",
        category: "Electronics",
        condition: "Like New",
        age_years: 1,
        description: "Portable bluetooth speaker with excellent sound quality. Includes charger.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
      }
    ];

    try {
      for (const gift of sampleGifts) {
        await addGift(gift);
      }
      await fetchGifts();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
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

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Browse All Gifts</h1>
        {gifts.length === 0 && !loading && (
          <Button 
            variant="success" 
            onClick={addSampleGifts}
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add Sample Gifts'}
          </Button>
        )}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        {gifts.length === 0 ? (
          <Col>
            <Alert variant="info">No gifts available at the moment.</Alert>
          </Col>
        ) : (
          gifts.map((gift) => (
            <Col key={gift._id} md={4} className="mb-4">
              <Card>
                {gift.image && (
                  <Card.Img 
                    variant="top" 
                    src={gift.image} 
                    alt={gift.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{gift.name}</Card.Title>
                  <Card.Text>
                    <strong>Category:</strong> {gift.category || 'N/A'}<br />
                    <strong>Condition:</strong> {gift.condition || 'N/A'}<br />
                    {gift.description && (
                      <span className="text-muted">
                        {gift.description.substring(0, 100)}...
                      </span>
                    )}
                  </Card.Text>
                  <Link 
                    to={`/gifts/${gift._id}`} 
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default MainPage;
