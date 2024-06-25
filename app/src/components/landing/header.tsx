import { Button, Select, Option } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { RootState } from "../../authStore/store";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function Header() {
  const { t, i18n } = useTranslation("landingPage");
  const changeLanguageHandler = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };
  const { userInfo } = useSelector.withTypes<RootState>()(
    (state) => state.auth
  );
  console.log(userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const loader = toast.loading("Loading...");
      await logoutApiCall().unwrap();
      dispatch(logout());
      console.log(userInfo);
      toast.dismiss(loader);
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <>
      <header
        className={`fixed w-full z-30 md:bg-opacity-85 transition duration-300 ease-in-out ${
          !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              <img src="/logo.png" alt="logo" className="h-10" />
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in Buttons */}
              {userInfo ? (
                <ul className="flex grow justify-end flex-wrap items-center">
                  <li>
                    <div className="w-64 mr-8">
                      <Select
                        label="Language"
                        value={i18next.language}
                        onChange={(val) => changeLanguageHandler(val)}
                      >
                        <Option value="hn">Hindi</Option>
                        <Option value="en">English</Option>
                      </Select>
                    </div>
                  </li>
                  <li>
                    <Button
                      className="mr-4"
                      variant="outlined"
                      onClick={logoutHandler}
                    >
                      {t("landing.nav.logout")}
                    </Button>
                  </li>
                  <li>
                    {userInfo.userType == "DOCTOR" ? (
                      <Link to={"/dashboard"}>
                        <Button className="flex bg-[#8353E2]">
                          <span>{t("landing.nav.dashboard")}</span>
                          <svg
                            className="w-3 h-3 fill-current text-white shrink-0 ml-2 -mr-1"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                              fillRule="nonzero"
                            />
                          </svg>
                        </Button>
                      </Link>
                    ) : (
                      <Link to={"/elderlycare"}>
                        <Button className="flex bg-[#8353E2]">
                          <span>{t("landing.nav.app")}</span>
                          <svg
                            className="w-3 h-3 fill-current text-white shrink-0 ml-2 -mr-1"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                              fillRule="nonzero"
                            />
                          </svg>
                        </Button>
                      </Link>
                    )}
                  </li>
                </ul>
              ) : (
                <ul className="flex grow justify-end flex-wrap items-center">
                  <li>
                    <div className="w-64 mr-8">
                      <Select
                        label="Language"
                        value="en"
                        onChange={(val) => changeLanguageHandler(val)}
                      >
                        <Option value="hn">Hindi</Option>
                        <Option value="en">English</Option>
                      </Select>
                    </div>
                  </li>
                  <li>
                    <Link to={"/login"}>
                      <Button className="mr-4" variant="outlined">
                        {t("landing.nav.signin")}
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/register"}>
                      <Button className="flex bg-[#8353E2]">
                        <span>{t("landing.nav.signup")}</span>
                        <svg
                          className="w-3 h-3 fill-current text-white shrink-0 ml-2 -mr-1"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                            fillRule="nonzero"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
