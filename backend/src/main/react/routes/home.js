import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function HomeElem() {
  // URL for the APOD image
  const apodImageUrl = "https://api.nasa.gov/assets/img/general/apod.jpg";

  return (
    <Card className="text-center">
      <Card.Header>Featured: NASA's Astronomy Picture of the Day</Card.Header>
      <Card.Img variant="top" src={apodImageUrl} alt="NASA Astronomy Picture of the Day" />
      <Card.Body>
        <Card.Title>Explore the Cosmos</Card.Title>
        <Card.Text>
          One of the most popular websites at NASA is the Astronomy Picture of the Day. 
          In fact, this website is one of the most popular websites across all federal agencies. 
          It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery 
          and associated metadata so that it can be repurposed for other applications. 
          In addition, if the concept_tags parameter is set to True, then keywords derived from the image 
          explanation are returned. These keywords could be used as auto-generated hashtags for Twitter or 
          Instagram feeds; but generally help with discoverability of relevant imagery.
        </Card.Text>
        <Button variant="primary" href="https://github.com/nasa/apod-api">Learn More</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Discover the universe with us</Card.Footer>
    </Card>
  );
}

