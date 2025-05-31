import React from "react";
import "./css/CommitLogout.css";

export const CommitLogout = ({ onConfirm, onCancel }) => {
  return (
    <div className="commit-logout-overlay">
      <div className="commit-logout-modal animate-pop">
        <h3>Xác nhận đăng xuất</h3>
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
        <div className="commit-logout-actions">
          <button className="btn btn-danger" onClick={onConfirm}>Đăng xuất</button>
          <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>
        </div>
      </div>
    </div>
  );
};