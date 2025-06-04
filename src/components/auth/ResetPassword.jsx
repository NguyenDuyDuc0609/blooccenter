import React, { useState } from "react";
import "../css/CommitLogout.css"; 

export const ResetPassword = ({ username, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    token: "",
    newPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.token || !form.newPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    setError("");
    onSubmit && onSubmit({ username, ...form });
  };

  return (
    <div className="commit-logout-overlay">
      <div className="commit-logout-modal animate-pop" style={{ minWidth: 320 }}>
        <h3>Đặt lại mật khẩu</h3>
        <form className="user-info-form" onSubmit={handleSubmit}>
          <div>
            <label>Tên đăng nhập:</label>
            <input
              type="text"
              name="username"
              value={username}
              disabled
            />
          </div>
          <div>
            <label>Mã token:</label>
            <input
              type="text"
              name="token"
              value={form.token}
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
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
          <div className="commit-logout-actions">
            <button type="submit" className="btn btn-primary">Đặt lại mật khẩu</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};