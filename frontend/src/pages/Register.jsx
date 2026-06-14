import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="shadow p-3" style={{ borderRadius: "10px" }}>
            <Card.Body>
              <h3 className="text-center fw-bold mb-4">
                REGISTER
              </h3>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="mb-3"
                />

                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="mb-3"
                />

                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="mb-3"
                />

                <button className="btn btn-success w-100">
                  Register
                </button>
              </Form>

              <p className="text-center mt-3">
                <span className="fw-bold">
                  Already have an account?
                </span>
              </p>

              <p className="text-center">
                <span
                  className="fw-bold text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Login
                </span>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;