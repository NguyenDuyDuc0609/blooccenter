import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './css/ActivityGoing.css'
import { SubmitButton } from './SubmitButton';
import { getActivityGoing } from '../services/userServices';
import { useState } from 'react';
import { RegisterDonate } from '../services/userServices';
import { useToast } from '../context/ToastContext';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const ActivityGoing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const {showToast} = useToast();
  const itemsPerPage = 3;
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await getActivityGoing(currentPage, itemsPerPage);
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

const handlePageChange = (event, page) => {
    setSearchParams({ page: page.toString() });
  };
const handleSubmit  = async (activityId) => {
  try{
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve,1000));
      const result = await RegisterDonate(activityId);
      if(result.success){
        showToast({message: result.message, success: true})
      }
      else{
        showToast({message: result.message, success: false})
      }
  }
  catch(error){
    console.error(error.message);
  }
  finally{
    setLoading(false);
  }
}
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
          <div className="info-label">Mã hoạt động: </div>
          <div className="info-value">{item.id}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Giờ hoạt động:</div>
          <div className="info-value">{item.operatingHour}h</div>
          <div style={{margin: '0px 0px 0px 40px'}} className="info-value">
            <SubmitButton onClick={() => handleSubmit(item.id)}>Đăng ký</SubmitButton>
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

      <Stack spacing={2} sx={{ justifyContent: 'center', marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};
