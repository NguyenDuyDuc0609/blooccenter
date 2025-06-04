import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardRedirect = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) return;
    if (!user) navigate("/login", { replace: true });
    else if (user.role[0] === "Donor") navigate("/dashboard/donor/activityGoing?page=1", { replace: true });
    else if (user.role[0] === "Hospital") navigate("/dashboard/hospital", { replace: true });
    else if (user.role[0] === "Admin") navigate("/dashboard/admin", { replace: true });
    else navigate("/", { replace: true });
  }, [user, isLoading, navigate]);
  return isLoading ? <div>Loading...</div> : null;
};
export default DashboardRedirect;