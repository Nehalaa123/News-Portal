import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";

function Profile() {

  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const currentEmail = localStorage.getItem("adminEmail");
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/admin/profile?email=${currentEmail}`
      );
      setUser(data.admin);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={7}>
          {!showChangePassword ? (
            <Card className="shadow p-4 border-0" style={{ borderRadius: "15px" }}>
              <h3 className="fw-bold text-center mb-4 text-dark">My Profile</h3>
              <div className="d-flex justify-content-between align-items-center bg-light p-4 rounded" style={{ minHeight: "150px" }}>
                <div>
                  <p className="mb-3" style={{ fontSize: "18px" }}>
                    <strong>Name:</strong> {user?.name || "Loading..."}
                  </p>
                  <p className="m-0" style={{ fontSize: "18px" }}>
                    <strong>Email:</strong> {user?.email || "Loading..."}
                  </p>
                </div>

                <div>
                  <img
                    src="https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg"
                    alt="User Cartoon"
                    style={{ width: "110px", height: "110px", borderRadius: "50%", objectFit: "cover", border: "3px solid red" }}
                  />
                </div>
              </div>
              <div className="text-end mt-3">
                <span
                  style={{
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "600",
                    textDecoration: "underline",
                    fontSize: "15px"
                  }}
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </span>
              </div>
            </Card>
          ) : (
            <ChangePassword onCancel={() => setShowChangePassword(false)} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;