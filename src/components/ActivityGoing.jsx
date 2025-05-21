import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './css/ActivityGoing.css'
import { SubmitButton } from './SubmitButton';

const mockData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  hospitalId: `hospital-${i + 1}`,
  dateActivity: new Date(2025, 2, 13 + i).toISOString(),
  operatingHour: (8 + (i % 4)).toString(),
  quantity: 100 + i * 10,
  numberIsRegistration: i * 2,
}));

export const ActivityGoing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const itemsPerPage = 3;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = mockData.slice(start, end);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
    }
  };

  return (
    <div className="activity-con">
      <h3 style={{margin: '40px'}}>Hoạt động đang diễn ra</h3>
      {paginatedData.map((item) => (
        <div key={item.id} className="activity-card">
        <div className="info-row">
          <div className="info-label">Ngày:</div>
          <div className="info-value">{new Date(item.dateActivity).toLocaleDateString()}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Mã bệnh viện:</div>
          <div className="info-value">{item.hospitalId}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Giờ hoạt động:</div>
          <div className="info-value">{item.operatingHour}h</div>
          <div style={{margin: '0px 0px 0px 40px'}} className="info-value">
            <SubmitButton onClick={() => console.log('Đã đăng ký')}/>
          </div>
        </div>
        <div className="info-row">
          <div className="info-label">Số lượng cần:</div>
          <div className="info-value">{item.quantity}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Đã đăng ký:</div>
          <div className="info-value">{item.numberIsRegistration}</div>
        </div>
      </div>
      ))}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>Trang trước</button>
        <button disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>Trang sau</button>
      </div>
    </div>
  );
};
