import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddNews() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    place: "",
    description: "",
    category: "",
    author: "",
    image: "",
    status: "published"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/news/createnews", form);
      toast.success(" News Created Successfully");
      navigate("/admin/news-list");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={5} sm={12}>
          <Card className="shadow p-3" style={{ borderRadius: "10px" }}>
            <h3 className="text-center mb-3" style={{ fontWeight: "bold" }}>
              Add News
            </h3>

            <Form onSubmit={handleSubmit}>
              {/* TITLE */}
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="title"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* place */}
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  name="place"
                  placeholder="Place"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* author*/}
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* DESCRIPTION */}
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="description"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* CATEGORY */}
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Select
                  name="category"
                  value={form.category}
                  placeholder="category"
                  onChange={handleChange}
                  required
                >
                  <option value="">select category</option>
                  <option value="Climate">Climate</option>
                  <option value="Business">Business</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Politics">Politics</option>
                </Form.Select>
              </Form.Group>

              {/* IMAGE*/}
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={form.image}
                  placeholder="Paste image link"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* BUTTONS */}
              <Button variant="success" type="submit" className="w-100 ">
                ADD NEWS
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddNews;