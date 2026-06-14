import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Category() {

  const { type } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/news/getnewsbycategory/${type}`
        );
        setNews(data.news);
      } catch (error) {
        toast.error(error.message);
      }

    };
    fetchCategoryNews();
  }, [type]);

  return (
    <>
      <Container className="mt-4">
        <h3 className="fw-bold text-capitalize mb-4">
          {type} News
        </h3>
        <Row>
          {news.map((item) => (
            <Col xs={12} key={item._id} className="mb-4">
              <Card className="shadow-sm border-0" style={{ borderRadius: "10px", overflow: "hidden" }}>
                <Row className="g-0">
                  <Col md={4} sm={5}>
                    <Card.Img
                      src={item.image}
                      style={{ height: "100%", minHeight: "200px", objectFit: "cover", width: "100%" }}
                    />
                  </Col>
                  <Col md={8} sm={7}>
                    <Card.Body>
                      <Badge bg="primary" className="mb-2">
                        {item.category}
                      </Badge>
                      <Card.Title className="fw-bold">
                        {item.title}
                      </Card.Title>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Link to="/all-news" className="btn btn-link p-0 ms-4 mb-4">
        ← Continue Browsing
      </Link>
    </>
  );
}

export default Category;