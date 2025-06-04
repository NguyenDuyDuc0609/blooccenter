import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../css/ActivityGoing.css'
import { SubmitButton } from '../common/SubmitButton';
import { CancelDonation, HistoriesDonate } from '../../services/userServices';
import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAxios } from '../../hooks/useAxios';
export const Histories = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const {showToast} = useToast();
  const itemsPerPage = 3;
  const [data, setData] = useState([]);
  const { request } = useAxios();
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const fetchData = async () => {
        try {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const result = await request(HistoriesDonate(currentPage, itemsPerPage));
          setData(result.data); 
          setTotalCount(result.totalCount);
        } catch (error) {
          console.error("Lỗi khi tải lịch sử:", error.message);
        } finally {
          setLoading(false);
        }
      };
  useEffect(() => {
    fetchData();
    }, [currentPage]);
  const handlePageChange = (event, page) => {
      setSearchParams({ page: page.toString() });
    };
  const handleCancel  = async (activityId) => {
    try{
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve,1000));
        const result = await request(CancelDonation(activityId));
        if(result.success){
          console.log(result);
          showToast({message: result.message, success: true})
        }
        else{
          showToast({message: result.message, success: false})
        }
        await fetchData();
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
      <h3 style={{margin: '40px'}}>Lịch sử hiến máu</h3>
      {loading ? (
  <p>Đang tải dữ liệu...</p>
      ) : data.length === 0 ? (
        <p>Không có lịch sử hiến máu.</p>
      ) : (
        data.map((item) => (
          <div key={item.id} className="activity-card">
            <div className="info-row">
              <div className="info-label">Ngày hiến máu:</div>
              <div className="info-value">
                {item.donationDate === "0001-01-01T00:00:00+00:00"
                  ? "Chưa xác định"
                  : new Date(item.donationDate).toLocaleDateString()}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">Mã hoạt động:</div>
              <div className="info-value">{item.activityId}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Bệnh viện:</div>
              <div className="info-value">{item.hospitalName}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Số lượng máu: </div>
              <div className="info-value">{item.quantity} ml</div>
            </div>
            <div className="info-row">
            <div className="info-label">Trạng thái:</div>
            <div className="info-value">
                {item.statusHistories === 0
                  ? "Đang chờ"
                  : item.statusHistories === 1
                  ? "Hoàn thành"
                  : "Đã hủy"}
              </div>
            </div>
            {item.statusHistories === 0 && (
              <SubmitButton onClick={() => handleCancel(item.activityId)}>Hủy</SubmitButton>
            )}
          </div>
        ))
      )}
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
  )
}
