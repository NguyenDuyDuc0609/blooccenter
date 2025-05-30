import React, { useEffect, useState } from 'react'
import './css/Histories.css'
import { SubmitButton } from './SubmitButton'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { getInforUser, updateInforUser } from '../services/userServices'
export const InforUser = () => {
  const {user} = useAuth();
  const [editMode, setEditMode] = useState(false)
  const { showToast } = useToast();
  const [inforUser, setUser] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    note: '',
    statusAccount: ''
  });
  const fetchUser = async () => {
      try {
        const response = await getInforUser();
        if (response.success) {
          setUser({
            username: response.data.username,
            fullName: response.data.fullName,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            note: response.data.note,
            statusAccount: response.data.statusAccount
          });
        } else {
          return;
        }
      } catch (error) {
        showToast({ message: error.message || 'Lấy thông tin người dùng thất bại.', success: false });
        console.error('Error fetching user information:', error);
      }
    };
  useEffect(() => {
    
   fetchUser();
  }, [])

  if (!user) {
  return (
    <div className="histories-container fade-in">
      <h3>Thông tin người dùng</h3>
      <p style={{ color: 'red', textAlign: 'center', margin: '40px 0' }}>
        Vui lòng đăng nhập để xem thông tin cá nhân.
      </p>
    </div>
  );
}
  const handleChange = () => {
    setEditMode(true)
  }
const handleInputChange = (e) => {
  const { name, value } = e.target
  setUser((prevUser) => ({
    ...prevUser,
    [name]: value
  }))
}
const handleUpdate = async () => {
    setEditMode(false);
    try{
      const response = await updateInforUser(inforUser);
      if (response.success) {
        showToast({ message: response.message, success: true });
        await fetchUser();
      } else {
        showToast({ message: response.message || 'Cập nhật thông tin người dùng thất bại.', success: false });
      }
    }
    catch(error){
      showToast({ message: error.message || 'Cập nhật thông tin người dùng thất bại.', success: false });
      console.error('Error updating user information:', error);
    }
  }

  const handleCancel = async () => {
    setEditMode(false);
    await fetchUser();
  }

  return (
    <div className="histories-container fade-in">
      <h3>Thông tin người dùng</h3>
      <div className="histories-content">
        <form className="user-info-form">
          <div>
            <label>Tên đăng nhập:</label>
            <input type="text" value={inforUser.username || ''}
            name="username" readOnly={!editMode}
            onChange={handleInputChange} />
          </div>
          <div>
            <label>Họ tên:</label>
            <input type="text" value={inforUser.fullName || ''}
            name="fullName" readOnly={!editMode}
            onChange={handleInputChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={inforUser.email || ''}
            name="email" readOnly={!editMode}
            onChange={handleInputChange} />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input type="text" value={inforUser.phoneNumber || ''}
            name="phoneNumber" readOnly={!editMode}
            onChange={handleInputChange} />
          </div>
          <div>
            <label>Ghi chú:</label>
            <input type="text" value={inforUser.note || ''} readOnly
            onChange={handleInputChange} />
          </div>
          <div>
            <label>Trạng thái:</label>
            <input type="text" value={inforUser.statusAccount === 0 ? 'Actived': 'Locked'} readOnly />
          </div>
        </form>
        {!editMode ? (
          <SubmitButton onClick={handleChange}>Chỉnh sửa</SubmitButton>
        ) : (
          <div className="button-group">
            <SubmitButton onClick={handleUpdate}>Lưu</SubmitButton>
            <SubmitButton onClick={handleCancel}>Hủy</SubmitButton>
          </div>
        )}
      </div>
    </div>
  )
}
