import { SubmitButton } from "../common/SubmitButton";
export const RequestInformation = ({ data }) => {
  if (!data) return;
  return (
    <div className="requestinformation">
      <div className="info-item">
        <span className="label">Hospital ID:</span>
        <span>{data.hospitalId}</span>
      </div>
      <div className="info-item">
        <span className="label">Nhóm máu:</span>
        <span>{data.bloodType}</span>
      </div>
      <div className="info-item">
        <span className="label">Số lượng:</span>
        <span>{data.quantity}</span>
      </div>
      <div className="info-item">
        <span className="label">Địa chỉ:</span>
        <span>{data.address}</span>
      </div>
      <div className="info-item">
        <span className="label">Trạng thái:</span>
        <span>
          {data.status === 0
            ? "Đang chờ"
            : data.status === 1
            ? "Đã nhận"
            : data.status === 2
            ? "Đã hủy"
            : "Không xác định"}
        </span>
      </div>
      <SubmitButton >Xác nhận chuyển máu</SubmitButton>
    </div>
  );
};
