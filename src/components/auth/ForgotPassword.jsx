import React, { useState } from "react";
import "../css/CommitLogout.css"; // Tận dụng lại CSS overlay/modal

export const ForgotPassword = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }
    setError("");
    onSubmit && onSubmit(email);
  };

  return (
    <div className="commit-logout-overlay">
      <div className="commit-logout-modal animate-pop" style={{ minWidth: 320 }}>
        <h3>Quên mật khẩu</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, margin: "16px 0" }}
            autoFocus
          />
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
          <div className="commit-logout-actions">
            <button type="submit" className="btn btn-primary">Gửi</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};