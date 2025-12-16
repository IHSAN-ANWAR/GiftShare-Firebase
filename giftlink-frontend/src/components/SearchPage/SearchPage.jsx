import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchGifts } from '../../services/giftService';

function SearchPage({ user }) {
  const [searchParams, setSearchParams] = useState({
    category: '',
    name: '',
    condition: '',
    age_years: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const filters = {};
      
      if (searchParams.category) filters.category = searchParams.category;
      if (searchParams.name) filters.name = searchParams.name;
      if (searchParams.condition) filters.condition = searchParams.condition;
      if (searchParams.age_years) filters.age_years = searchParams.age_years;

      const data = await searchGifts(filters);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      category: '',
      name: '',
      condition: '',
      age_years: ''
    });
    setResults([]);
    setSearched(false);
    setError('');
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Search Gifts</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={searchParams.category}
                    onChange={handleChange}
                    placeholder="e.g., Electronics, Books"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={searchParams.name}
                    onChange={handleChange}
                    placeholder="Search by name"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Select
                    name="condition"
                    value={searchParams.condition}
                    onChange={handleChange}
                  >
                    <option value="">All Conditions</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Age (years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="age_years"
                    value={searchParams.age_years}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}
      
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      
      {searched && !loading && (
        <>
          <h3 className="mb-3">Search Results ({results.length})</h3>
          <Row>
            {results.length === 0 ? (
              <Col>
                <Alert variant="info">No gifts found matching your criteria.</Alert>
              </Col>
            ) : (
              results.map((gift) => (
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
        </>
      )}
    </Container>
  );
}

export default SearchPage;
