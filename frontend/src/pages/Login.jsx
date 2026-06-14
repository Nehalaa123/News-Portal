import { Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/admin/login",
        { email, password }
      );
      if (data.success) {
        toast.success("Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminEmail", email);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <Container className="mt-5">
      <Card
        className="p-4 shadow mx-auto"
        style={{ maxWidth: "350px", borderRadius: "12px" }}
      >
        <Card.Body>
          <h3 className="text-center mb-4 fw-bold text-primary">LOGIN</h3>
          <Form onSubmit={handleLogin}>
            <Form.Control
              type="email"
              placeholder="Email"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Form.Control
              type="password"
              placeholder="Password"
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </Form>

          <p className="text-center mt-3">
            <span className="fw-bold">Don't have an account?</span>
          </p>

          <p className="text-center">
            <span
              className="fw-bold text-success"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;