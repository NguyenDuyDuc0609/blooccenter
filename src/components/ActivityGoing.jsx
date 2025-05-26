import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './css/ActivityGoing.css'
import { SubmitButton } from './SubmitButton';
import { getActivityGoing } from '../services/userServices';
import { useState } from 'react';

export const ActivityGoing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const itemsPerPage = 3;
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const renderPagination = () => {
  const pages = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 2) {
      pages.push(1, 2, 3);
    } else if (currentPage >= totalPages - 1) {
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }
  }
  return pages;
};

   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await getActivityGoing(currentPage, itemsPerPage);
        console.log(result.data);
        setData(result.data); 
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error("Lỗi khi tải hoạt động:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
    }
  };
const pages = renderPagination();

  return (
    <div className="activity-con">
      <h3 style={{margin: '40px'}}>Hoạt động đang diễn ra</h3>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : data.map((item) => (
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

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
      {currentPage > 2 && totalPages > 3 && <span>...</span>}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          style={{
            backgroundColor: page === currentPage ? '#007bff' : '#fff',
            color: page === currentPage ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages - 1 && totalPages > 3 && <span>...</span>}
    </div>
    </div>
  );
};
