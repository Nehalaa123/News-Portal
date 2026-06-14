import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AllNews() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsList = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/news/getallnews");
        setNews(data.getnews || data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchNewsList();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <Container className="mt-4 mb-5">
        <center>
          <h2 className="mb-4 fw-bold" style={{ fontFamily: "-moz-initial" }}>Latest News</h2>
        </center>
        <Row>
          {news.map((item) => (
            <Col md={4} sm={6} xs={12} key={item._id} className="mb-4">
              <Card
                className="shadow-sm h-100 border-0"
                onClick={() => navigate(`/singlenews/${item._id}`)}
                style={{ cursor: "pointer", borderRadius: "10px", overflow: "hidden" }}
              >
                <Card.Img
                  src={item.image || "https://via.placeholder.com/300x200"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fw-bold fs-5 mb-0" style={{ maxWidth: "70%" }}>
                      {item.title}
                    </Card.Title>
                    <small className="text-muted fw-semibold text-end" style={{ fontSize: "13px" }}>
                      📍 {item.place}
                    </small>
                  </div>
                  <div className="mb-2">
                    <Badge bg="danger" className="text-capitalize me-2">{item.category}</Badge>
                    <small className="text-muted">By: {item.author}</small>
                  </div>
                  <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "14px" }}>
                    {item.description && item.description.length > 100
                      ? item.description.substring(0, 100) + "..."
                      : item.description}
                  </Card.Text>
                  <span className="text-primary fw-semibold mt-2" style={{ fontSize: "13px" }}>
                    Read Full News →
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default AllNews;