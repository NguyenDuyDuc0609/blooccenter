import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../services/userServices";
import { useToast } from "../context/ToastContext";

export const ChangePassword = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    rePassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.currentPassword || !form.newPassword || !form.rePassword) {
      showToast({ message: "Vui lòng nhập đầy đủ thông tin.", success: false });
      return;
    }
    if (form.newPassword !== form.rePassword) {
      showToast({ message: "Mật khẩu mới không khớp.", success: false });
      return;
    }
    setLoading(true);
    try {
      const res = await changePassword({
        username: user?.userName,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });
      if (res.success) {
        showToast({ message: res.message || "Đổi mật khẩu thành công!", success: true });
        setForm({ currentPassword: "", newPassword: "", rePassword: "" });
      } else {
        showToast({ message: res.message || "Đổi mật khẩu thất bại.", success: false });
      }
    } catch (err) {
      showToast({ message: err.message || "Đổi mật khẩu thất bại.", success: false });
    }
    setLoading(false);
  };

  return (
    <div className="histories-container fade-in">
      <h3>Đổi mật khẩu</h3>
      <form className="user-info-form" onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
        <div>
          <label>Mật khẩu hiện tại:</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mật khẩu mới:</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nhập lại mật khẩu mới:</label>
          <input
            type="password"
            name="rePassword"
            value={form.rePassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "Đang đổi..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
};