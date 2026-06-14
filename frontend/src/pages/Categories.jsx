import { Container, Row, Col } from "react-bootstrap";
import { FaLaptop, FaFootballBall, FaLandmark, FaBriefcase } from "react-icons/fa";
import { SiCodeclimate } from "react-icons/si";


function Categories() {

  return (
    <Container className="mt-4 text-center">

      {/* HEADING */}
      <h3 className="fw-bold mb-4">News Categories</h3>

      {/* CATEGORIES */}
      <Row className="justify-content-center">

        <Col md={2} className="mb-3">
          <div className="p-3 border rounded shadow-sm">
            <FaLaptop size={30} />
            <h6 className="mt-2">Technology</h6>
          </div>
        </Col>

        <Col md={2} className="mb-3">
          <div className="p-3 border rounded shadow-sm">
            <FaFootballBall size={30} />
            <h6 className="mt-2">Sports</h6>
          </div>
        </Col>

        <Col md={2} className="mb-3">
          <div className="p-3 border rounded shadow-sm">
            <FaLandmark size={30} />
            <h6 className="mt-2">Politics</h6>
          </div>
        </Col>

        <Col md={2} className="mb-3">
          <div className="p-3 border rounded shadow-sm">
            <FaBriefcase size={30} />
            <h6 className="mt-2">Business</h6>
          </div>
        </Col>

        <Col md={2} className="mb-3">
          <div className="p-3 border rounded shadow-sm">
            <SiCodeclimate size={30} />
            <h6 className="mt-2">Climate</h6>
          </div>
        </Col>

      </Row>
    </Container>
  );
}

export default Categories;