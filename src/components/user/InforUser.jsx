import React, { useEffect, useState } from 'react'
import '../css/Histories.css'
import { SubmitButton } from '../common/SubmitButton'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { updateInforUser } from '../../services/userServices'
import { useAxios } from '../../hooks/useAxios'
export const InforUser = () => {
  const { user, updateUser } = useAuth();
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
  const { request } = useAxios();
  useEffect(() => {
    if (user) {
      setUser({
        username: user.userName || '',
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        note: user.note || '',
        statusAccount: user.statusAccount ?? ''
      });
    }
  }, [user]);

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
    try {
      const response = await request(updateInforUser(inforUser));
      if (response.success) {
        showToast({ message: response.message, success: true });
        updateUser({
          ...user,
          userName: inforUser.username,
          fullName: inforUser.fullName,
          email: inforUser.email,
          phoneNumber: inforUser.phoneNumber,
          note: inforUser.note,
          statusAccount: inforUser.statusAccount
        });
      } else {
        showToast({ message: response.message || 'Cập nhật thông tin người dùng thất bại.', success: false });
      }
    }
    catch (error) {
      showToast({ message: error.message || 'Cập nhật thông tin người dùng thất bại.', success: false });
      console.error('Error updating user information:', error);
    }
  }

  const handleCancel = () => {
    setUser({
      username: user.userName || '',
      fullName: user.fullName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      note: user.note || '',
      statusAccount: user.statusAccount ?? ''
    });
    setEditMode(false);
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
            <input type="text" value={inforUser.note || ''}
              name="note" readOnly={!editMode}
              onChange={handleInputChange} />
          </div>
          <div>
            <label>Trạng thái:</label>
            <input type="text" value={inforUser.statusAccount === 0 ? 'Actived' : 'Locked'} readOnly />
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
