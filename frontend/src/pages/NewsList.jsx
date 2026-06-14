import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaPlusCircleSolid } from "react-icons/lia";
import Header from "../components/Header";

function NewsList() {

  const [news, setNews] = useState([]);
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/news/getallnews");
      setNews(data.getnews);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // DELETE NEWS
  const deleteNews = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/news/deletenews/${id}`);
        toast.success("Deleted Successfully");
        fetchNews(); // refresh table
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <Container className="mt-4">
        <div className="d-flex justify-content-between mb-3">
          {/* + CREATE BUTTON */}
          <Link to="/addnews" className="btn">
            <LiaPlusCircleSolid size={20} />
          </Link>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Place</th>
                <th>Category</th>
                <th>Author</th>
                <th>Description</th>
                <th>Image</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {news && news.length > 0 ? (
                news.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.place}</td>
                    <td>{item.category}</td>
                    <td>{item.author}</td>
                    <td style={{ maxWidth: "180px" }}>
                      <div
                        className="text-truncate"
                        title={item.description}
                        style={{ cursor: "pointer" }}
                      >
                        {item.description}
                      </div>
                    </td>
                    <td>
                      <img
                        src={item.image || "https://via.placeholder.com/60x40?text=No+Img"}
                        alt="news"
                        style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "5px", border: "1px solid #ddd" }}
                      />
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`/editnews/${item._id}`}>
                        <RxUpdate size={18} />
                      </Link>
                    </td>
                    <td>
                      <AiOutlineDelete
                        size={15}
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteNews(item._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-muted">
                    No news found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default NewsList;