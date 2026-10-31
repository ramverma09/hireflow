import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { logoutUser } from "../features/auth/authSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async function handleLogout() {
    await dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };
}