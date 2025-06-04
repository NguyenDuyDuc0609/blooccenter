export const createBloodRequestConfig = (
  hospitalId,
  bloodType,
  quantity,
  address
) => ({
  url: "/Hospital/CreateRequestBlood",
  method: "post",
  data: {
    HospitalId: hospitalId,
    HospitalAccept: "",
    BloodType: bloodType,
    Quantity: quantity,
    Status: 0,
    Address: address,
  },
});

export const getBloodRequestsConfig = (pageNumber, pageSize) => ({
  url: "/Hospital/GetRequestBlood",
  method: "get",
  params: {
    pageNumber,
    pageSize,
    Status: 0,
  },
});
