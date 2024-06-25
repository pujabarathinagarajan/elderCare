import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import toast from "react-hot-toast";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast('Logged out');
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {userInfo ? (
        <>
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <Button onClick={logoutHandler}>Logout</Button>
        </>
      ) : (
        <>
          <Button href="/register">SignIn</Button>
          <Button href="/login">Login</Button>
        </>
      )}
    </>
  );
}

export default Header;
