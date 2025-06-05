import '../css/CreateRequestBlood.css';
import React from 'react';
import { useState } from 'react';
export const CreateRequestBlood = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    typeBlood: '',
    quantity: '',
    address: ''
  });
  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value
  })};
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create request blood</h2>
        <p>Add information request blood</p>
        <div className="form-group">
          <div className="name request">
            <label htmlFor="name">Tên bệnh viện</label>
            <input type="text" id="name" name="name" onChange={handleChange} placeholder="Enter your name" required />
          </div>  
          <div className="type-blood request">
            <label htmlFor="type-blood">Nhóm máu</label>
            <select onChange={handleChange} id="typeBlood" name="typeBlood" required>
              <option value="">Chọn nhóm máu</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <div className="quantity request">
              <label htmlFor="quantity">Số lượng</label>
              <input type="number" id="quantity" onChange={handleChange} name="quantity" placeholder="Enter quantity" required />
            </div>
            <div className="address request">
              <label htmlFor="address">Địa chỉ</label>
              <input type="text" id="address" onChange={handleChange} name="address" placeholder="Enter your address" required />
            </div>
          </div>
        </div>
        <button className="btn-request-submmit" onClick={() => onSubmit(formData)}>Thêm Request</button>
        <button className="btn-request-cancel" onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};