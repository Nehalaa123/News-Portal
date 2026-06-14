import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function HomePage() {

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHomeNews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/news/getallnews");
        if (data) {
          const allNews = data.getnews || data;
          const publishedNews = allNews.filter(item => item.status === "published");
          setNewsList(publishedNews);
        }
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchHomeNews();
  }, []);

  const heroNews = newsList.slice(0, 3);
  const generalNews = newsList.slice(3);
  if (loading) {
    return <div className="text-center mt-5"><h4>Loading News...</h4></div>;
  }
  return (
    <Container className="mt-3 mb-5">
      {/* HERO SECTION (Carousel)*/}
      {heroNews.length > 0 && (
        <Row className="mb-5">
          <Col>
            <Carousel style={{ borderRadius: "10px", overflow: "hidden" }}>
              {heroNews.map((item) => (
                <Carousel.Item key={item._id} style={{ height: "400px" }}>
                  <img
                    className="d-block w-100"
                    src={item.image || "https://via.placeholder.com/800x400"}
                    alt={item.title}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                  <Carousel.Caption style={{ background: "rgba(0, 0, 0, 0.6)", borderRadius: "8px", padding: "15px" }}>
                    <span className="badge bg-danger mb-2">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p style={{ fontSize: "14px" }}>
                      {item.description ? item.description.substring(0, 100) + "..." : ""}
                    </p>
                    <Link to={`/singlenews/${item._id}`}>
                      <Button variant="light" size="sm">Read Full News</Button>
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}

      {/* GENERAL SECTION (Latest Feed)*/}
      <h3 className="mb-4 fw-bold text-dark border-bottom pb-2">Latest Updates</h3>
      <Row>
        {generalNews.length > 0 ? (
          generalNews.map((item) => (
            <Col key={item._id} md={4} sm={12} className="mb-4">
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "10px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={item.image || "https://via.placeholder.com/300x200"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary text-capitalize">{item.category}</span>
                    <small className="text-muted">{item.place}</small>
                  </div>
                  <Card.Title className="fw-bold fs-5 text-dark">
                    {item.title ? item.title.substring(0, 60) + "..." : ""}
                  </Card.Title>
                  <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "14px" }}>
                    {item.description ? item.description.substring(0, 120) + "..." : ""}
                  </Card.Text>
                  <Link to={`/singlenews/${item._id}`} className="mt-3">
                    <Button variant="outline-primary" size="sm" className="w-100">
                      Read More →
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-4 text-muted">
            <h5>No more general news available.</h5>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default HomePage;