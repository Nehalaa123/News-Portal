import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import Header from "../components/Header";

function SingleNews() {

  const { id } = useParams();
  const [singleNews, setSingleNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/news/singlenews/${id}`);
        setSingleNews(data.news || data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load full news");
        setLoading(false);
      }
    };
    fetchSingleNews();
  }, [id]);
  if (loading) return <div className="text-center mt-5"><h4>Loading News...</h4></div>;
  if (!singleNews) return <div className="text-center mt-5"><h4>News not found!</h4></div>;

  return (
    <>
      <Header />
      <Container className="mt-5 mb-5">
        <Card className="shadow border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <Row className="g-0">
            <Col md={5}>
              <Card.Img
                src={singleNews.image || "https://via.placeholder.com/500x400"}
                style={{ width: "100%", height: "100%", minHeight: "350px", objectFit: "cover" }}
              />
            </Col>
            <Col md={7} className="d-flex flex-column">
              <Card.Body className="p-4 d-flex flex-column h-100">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge bg="danger" className="text-capitalize px-3 py-2 fs-6">
                    {singleNews.category}
                  </Badge>
                  <span className="text-muted fw-bold">📍 {singleNews.place}</span>
                </div>
                <h1 className="fw-bold text-dark mb-3" style={{ fontSize: "28px" }}>
                  {singleNews.title}
                </h1>
                <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
                  <strong>Reported By:</strong> {singleNews.author}
                </p>
                <hr />
                <Card.Text className="text-secondary flex-grow-1" style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
                  {singleNews.description}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default SingleNews;