import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useSettings } from "../store/store";
import { useNavigate, Link } from "react-router-dom";

import helpIcon from "../assets/images/navbar/help_icon.png"; // Importing the help icon
import profilePicIcon from "../assets/images/navbar/profile_icon.png"; // Importing the profile pic icon
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux"; 
import { Person, Person2Outlined } from "@mui/icons-material";

const PaymentConfirmation: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [systemMessage, useSystemMessageForAllChats] = useSettings((state) => [
    state.settings.systemMessage,
    state.settings.useSystemMessageForAllChats,
  ]);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="static">
      <header className="w-full fixed top-0 right-0 z-50 text-sm text-black bg-white py-2 px-4 flex justify-between items-center pt-6 pr-8">
        <div className="flex  space-x-4">
          <img src="/logo.png" alt="" className="h-10" />
        </div>
        <div className="flex items-center">
          <button className="p-1" onClick={handleLogout}>
            <img src={helpIcon} alt="Help icon" className="w-10 h-10" />
          </button>
          <button className="p-1">
            <img
              src={profilePicIcon}
              alt="Profile icon"
              className="w-10 h-10"
            />
          </button>
          <div className="relative">
            <Link
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-4"
              to="#"
            >
              <svg
                className="hidden fill-current sm:block"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                  fill=""
                />
              </svg>
            </Link>
            {/* <!-- Dropdown Start --> */}
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default ${
                dropdownOpen === true ? "block" : "hidden"
              }`}
            >
              <button
                className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={handleLogout}
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                    fill=""
                  />
                  <path
                    d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                    fill=""
                  />
                </svg>
                Log Out
              </button>
            </div>
            {/* <!-- Dropdown End --> */}
          </div>
        </div>
      </header>
      <center>
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <img src="/payment/highfive.png" alt="" className="h-72" />
          <div className=" w-1/3">
            <div className="text-title-xl font-bold my-10">
              <span>Thank you for Booking </span>
              <span role="img" aria-label="celebration">
                🥳
              </span>
              <br />
              <hr className="text-blue-gray-200 w-[90%]" />
            </div>
            <div className="flex justify-between mx-10 text-xl">
              <div className=""><Person color="primary" className="mr-2"/>Patient</div>
              <div className="">{userInfo.name}</div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default PaymentConfirmation;