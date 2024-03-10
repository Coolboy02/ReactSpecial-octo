import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

function FormsPage() {
    const today = new Date().toISOString().split('T')[0];
    // alert(today);

    const [selectedForm, setSelectedForm] = useState('form1'); // Default to form1
    const [formData, setFormData] = useState({ date: today }); // Default date to today
    const [results, setResults] = useState(null);

    const fetchLocalApodData = async () => {
        const apiKey = "Epi0Oq0qLq0OP1HYN7N01IXazaijyh7FhJFQdlHs";
        let baseUrl = `http://localhost:3030/pod`;
    
        if (formData.date) {
          baseUrl += `&date=${formData.date}`;
        } else if (formData.count) {
          baseUrl += `&count=${formData.count}`;
        } else if (formData.startDate && formData.endDate) {
          baseUrl += `&start_date=${formData.startDate}&end_date=${formData.endDate}`;
        }
        
        try {
          const response = await fetch(baseUrl);
          if (response.ok) { // Checks if status is 200-299
            const data = await response.json();
            setResults(data);
            return true; // Indicate success
          }
        } catch (error) {
          console.error("Failed to fetch from local API:", error);
        }
        return false; // Indicate failure
      };
    
      const buildNasaApiUrl = () => {
        const apiKey = "Epi0Oq0qLq0OP1HYN7N01IXazaijyh7FhJFQdlHs";
        let baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    
        if (formData.date) {
          baseUrl += `&date=${formData.date}`;
        } else if (formData.count) {
          baseUrl += `&count=${formData.count}`;
        } else if (formData.startDate && formData.endDate) {
          baseUrl += `&start_date=${formData.startDate}&end_date=${formData.endDate}`;
        }
    
        return baseUrl;
      };
    
      const fetchNasaApodData = async () => {
        const apiUrl = buildNasaApiUrl();
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Failed to fetch from NASA APOD API:", error);
        }
      };
    
      const fetchApodData = async (data) => {
        const localFetchSuccess = await fetchLocalApodData();
        if (!localFetchSuccess) {
          fetchNasaApodData(data);
        }
      };
    
      useEffect(() => {
        fetchApodData({ date: today });
      }, []);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        fetchApodData(formData);
      };

    const handleFormSelection = (e) => {
        setSelectedForm(e.target.value);
        setFormData({});
        setResults(null); // Reset results on form change
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Container fluid className="justify-content-center">
            <Row className="justify-content-center">
                <Col >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formSelect">
                            <Form.Label>Select Form</Form.Label>
                            <Form.Control as="select" value={selectedForm} onChange={handleFormSelection}>
                                <option value="form1">Date for APOD</option>
                                <option value="form2">Count of APODs</option>
                                <option value="form3">Date Range for APOD</option>
                            </Form.Control>
                        </Form.Group>

                        {selectedForm === 'form1' && (
                            <Form.Group controlId="dateForApod">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                            </Form.Group>
                        )}

                        {selectedForm === 'form2' && (
                            <Form.Group controlId="countOfApods">
                                <Form.Label>Count</Form.Label>
                                <Form.Control type="number" name="count" onChange={handleChange} />
                            </Form.Group>
                        )}

                        {selectedForm === 'form3' && (
                            <>
                                <Form.Group controlId="startDateForApod">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" name="startDate" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="endDateForApod">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" name="endDate" onChange={handleChange} />
                                </Form.Group>
                            </>
                        )}

                        {selectedForm && <Button type="submit">Submit</Button>}
                    </Form>
                </Col>
            </Row>
            <Row>
            <Col style={{ 
            background: selectedForm === 'form1' && results ? `url(${results.url}) no-repeat center center` : 'none', 
            backgroundSize: 'cover' 
        }}>
          {results && selectedForm === 'form1' && results.media_type === "video" ? (
            <iframe
              title="NASA Video"
              src={results.url}
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
            ></iframe>
          ) : null}
          {results && selectedForm === 'form1' &&
                              <div className="results-container justify-content-center" style={{backgroundColor:"rgb(240,240,240,0.4)"}} >
                                  <div className="data-container">
                                      <h3>{results.title}</h3>
                                      <p><strong>Date:</strong> {results.date}</p>
                                      {results.copyrigt && <p><strong>Copyright:</strong> {results.copyrigt}</p>}
                                      <p><strong>Explanation:</strong> {results.explanation}</p>
                                      {results.hdurl && <p><strong>HD URL:</strong> <a href={results.hdurl} target="_blank">View HD Image</a></p>}
                                      {results.media_type && <p><strong>Media Type:</strong> {results.media_type}</p>}
                                      {results.service_version && <p><strong>Service Version:</strong> {results.service_version}</p>}
                                  </div>
                              </div>
                          
      
}
          {results && (selectedForm === 'form2' || selectedForm === 'form3') && (
            <div className="card-group-custom">
              {results.map((result, index) => (
                <Card key={index}>
                    {result.media_type === "video" ? (
                      <iframe
                        title="NASA Video"
                        src={result.url}
                        frameBorder="0"
                        gesture="media"
                        allow="encrypted-media"
                        allowFullScreen
                        style={{ width: '100%', height: '100%' }}
                      ></iframe>
                    ) : <Card.Img variant="top" src={result.url || result.hdurl} alt="APOD" />}
                  
                  <Card.Body>
                    <Card.Title>{result.title}</Card.Title>
                    <Card.Text>
                    {result.copyrigt && <p><strong>Copyright:</strong> {result.copyrigt}</p>}
                      {result.hdurl && <p><strong>HD URL:</strong> <a href={result.hdurl} target="_blank">View HD Image</a></p>}
                    {result.media_type && <p><strong>Media Type:</strong> {result.media_type}</p>}
                    {result.service_version && <p><strong>Service Version:</strong> {result.service_version}</p>}
                      {result.explanation}
                      
                                               
                    </Card.Text>
                    
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">{result.date}</small>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          )}
        </Col>
            </Row>

        </Container>
    );
}

export default FormsPage;
