import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Section() {

  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        {/* LEFT SIDE IMAGE */}
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
            alt="news paper"
            className="img-fluid rounded shadow"
          />
        </Col>
        {/* RIGHT SIDE CONTENT */}
        <Col md={6}>
          <h4 className="fw-bold">
            <span style={{ color: "black", fontWeight: "bold" }}>Find Your <br></br></span>{" "}
            <span style={{ color: "red" }}>Latest News Here !</span>
          </h4>
          <p className="mt-3">
            Stay updated with the latest breaking news, trending stories,
            sports updates, politics, technology, and global events.
            Get all important information in one place quickly and easily.
          </p>
          <Link to={"/all-news"}>
            <Button variant="dark">Explore Now</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Section;