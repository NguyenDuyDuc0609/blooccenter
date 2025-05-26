import axios from "axios";


export const getActivityGoing = async (pageNumber, pageSize) => {
    try{
        const response = await axios.get('https://localhost:7254/api/Donor/ActivityIsGoing',{
            params:{
                pageNumber: pageNumber,
                pageSize: pageSize,
                Status: 1
            }
        })
        return response.data;
    }
    catch(error){
        const message =
      error.response?.data?.message ||
      error.message ||
      "Đăng ký không thành công.";
        throw new Error(message);
    }
}