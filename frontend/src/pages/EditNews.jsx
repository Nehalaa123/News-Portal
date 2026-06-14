import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditNews() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    place: "",
    description: "",
    category: "",
    author: "",
    image: "",
    status: "published"
  });

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/news/singlenews/${id}`);
        console.log("ബാക്ക്-എൻഡ് ഡാറ്റ:", data);
        if (data) {
          const newsData = data.news || data.singlenews || data;
          setForm({
            title: newsData.title || "",
            place: newsData.place || "",
            description: newsData.description || "",
            category: newsData.category || "",
            author: newsData.author || "",
            image: newsData.image || "",
            status: newsData.status || "published"
          });
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error("Error fetching news details: " + error.message);
      }
    };

    fetchSingleNews();
  }, [id]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/news/updatenews/${id}`, form);
      toast.success("News Updated Successfully");
      navigate("/admin/news-list");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={5} sm={12}>
          <Card className="shadow-sm p-3" style={{ borderRadius: "10px" }}>
            <h4 className="text-center mb-3 fw-bold ">Edit News</h4>
            <Form onSubmit={handleSubmit}>
              {/* TITLE */}
              <Form.Group className="mb-2">
                <Form.Label className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  style={{ padding: "6px 12px" }}
                />
              </Form.Group>

              {/* PLACE & AUTHOR */}
              <Row className="mb-2">
                <Col>
                  <Form.Group>
                    <Form.Label className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>Place</Form.Label>
                    <Form.Control
                      type="text"
                      name="place"
                      value={form.place}
                      onChange={handleChange}
                      required
                      style={{ padding: "6px 12px" }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>Author</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      required
                      style={{ padding: "6px 12px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* CATEGORY & IMAGE URL */}
              <Row className="mb-2">
                <Col>
                  <Form.Group>
                    <Form.Label className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      style={{ padding: "6px 12px", fontSize: "14px" }}
                    >
                      <option value="">Select Category</option>
                      <option value="Climate">Climate</option>
                      <option value="Business">Business</option>
                      <option value="Technology">Technology</option>
                      <option value="Sports">Sports</option>
                      <option value="Politics">Politics</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      required
                      style={{ padding: "6px 12px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-2">
                <Form.Label className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>Status</Form.Label>
                <Form.Select name="status" value={form.status} onChange={handleChange} required style={{ padding: "6px 12px", fontSize: "14px" }}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="in-review">In Review</option>
                  <option value="published">Scheduled</option>
                </Form.Select>
              </Form.Group>

              {/* DESCRIPTION */}
              <Form.Group className="mb-3">
                <Form.Label className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* BUTTONS */}
              <div className="d-flex justify-content-between pt-1">
                <Button variant="dark" type="submit" className="w-100">
                  Update News
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditNews;