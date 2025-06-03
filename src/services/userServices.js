
export const getActivityGoing = (pageNumber, pageSize) => ({
  url: "/Donor/ActivityIsGoing",
  method: "get",
  params: {
    pageNumber,
    pageSize,
    Status: 1,
  },
});

export const RegisterDonate = (hospitalId) => ({
  url: "/Donor/RegisterDonate",
  method: "post",
  data: { hospitalId },
});
export const HistoriesDonate = (currentPage, itemsPerPage) => ({
  url: "/Donor/History",
  method: "get",
  params: {
    pageNumber: currentPage,
    pageSize: itemsPerPage,
  },
});
export const CancelDonation = (hospitalId) => ({
  url: "/Donor/CancelDonation",
  method: "post",
  data: { hospitalId },
});

export const getInforUser = () => ({
  url: "/Donor/Getinformation",
  method: "get",
});

export const updateInforUser = (data) => ({
  url: "/Donor/Changeinforamtion",
  method: "put",
  data: {
    Username: data.username,
    FullName: data.fullName,
    Email: data.email,
    PhoneNumber: data.phoneNumber,
    Note: data.note,
    StatusAccount: data.statusAccount,
  },
});
export const changePassword = (data) => ({
  url: "/Auth/ChangePassword",
  method: "post",
  data: {
    username: data.username,
    password: data.currentPassword,
    newPassword: data.newPassword,
  },
});
export const resetPassword = (data) => ({
  url: "/Auth/ResetPassword",
  method: "post",
  data: {
    Username: data.username,
    Password: data.token,
    NewPassword: data.newPassword,
  },
});
