import { useState } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function ChangePassword({ onCancel }) {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const currentEmail = localStorage.getItem("adminEmail");
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/admin/changepassword",
        { email: currentEmail, oldPassword, newPassword }
      );
      if (data.success) {
        toast.success("Password changed successfully!");
        onCancel();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow p-4 border-0" style={{ borderRadius: "15px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark" >Change Password</h4>
        <Button variant="close" onClick={onCancel}></Button>
      </div>
      <Form onSubmit={handleChangePassword}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Current Password</Form.Label>
          <Form.Control type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">New Password</Form.Label>
          <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Confirm New Password</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="dark" className="w-50 fw-bold" onClick={onCancel}>Back</Button>
          <Button variant="danger" type="submit" className="w-50 fw-bold" disabled={loading}>
            {loading ? "Changing..." : "Submit"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default ChangePassword;