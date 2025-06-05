import React, { useEffect, useState } from 'react';
import { CreateRequestBlood } from './CreateRequestBlood';
import { useAxios } from '../../hooks/useAxios';
import { useAuth } from '../../context/AuthContext'
import { createBloodRequestConfig, getBloodRequestsConfig } from '../../services/hospitalService';
import { useLoading } from '../../context/LoadingContext';
import { useToast } from '../../context/ToastContext';
import { SearchBox } from './SearchBox';
import "../css/RequestBlood.css";
import { RequestInformation } from './RequestInformation';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSearchParams } from 'react-router-dom';
export const RequestBlood = () => {
  const [showCreateRequestBlood, setShowCreateRequestBlood] = useState(false);
  const {request} = useAxios();
  const {user} = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 3;
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
  if (!searchParams.get('page')) {
    setSearchParams({ page: '1' });
  }
}, []);
  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const result = await request(getBloodRequestsConfig(currentPage, itemsPerPage));
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
  
  const handleSubmitRequest = async (formData) => {
    try{
      showLoading();
      const res = await request(createBloodRequestConfig(user.id, formData.typeBlood, formData.quantity, formData.address));
      if(res.success){
        showToast({ message: res.message || "Request submitted successfully!", success: true });
        setShowCreateRequestBlood(false);
      }
      else{
        console.error("Failed to submit request:", res.message);
        showToast({ message: res.message || "Failed to submit request.", success: false });
      }
    }
    catch (error) {
      console.error("Error submitting request:", error);
    }
    finally {
      hideLoading();
      showToast({ message: 'Request submitted successfully!', success: true });
      setShowCreateRequestBlood(false);
    }
  }
  const handlePageChange = (event, page) => {
    setSearchParams({ page: page.toString() });
  };
  const handleCancelRequest = () => {
    setShowCreateRequestBlood(false);
  }
  return (
    <div className="container-activities-hospital">
      <h1>Request blood</h1>
      {/* <SearchBox /> */}
      <button className="btn-add-request" onClick={() => setShowCreateRequestBlood(true)}>
        Thêm Request
      </button>
      <RequestInformation />
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : data.length === 0 ? (
        <div>Không có yêu cầu nào.</div>
      ) : (
        data.map((item) => (
          <RequestInformation key={item.id} data={item} />
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
      {showCreateRequestBlood && <CreateRequestBlood onSubmit={handleSubmitRequest} onClose={handleCancelRequest} />}
    </div>
  );
}