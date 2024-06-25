import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Appointments() {
  const {t} = useTranslation('landingPage')
  return (
    <>
      <div className="flex w-[75%] h-[50vh]">
        <div className="w-1/2 text-left">
          <div className="w-[90%] my-auto">
            <span className="font-bold text-3xl ">
              <span className="text-[#8353E2]">{t("landing.appointment.doctor.title.1")}</span>{t("landing.appointment.doctor.title.2")}
            </span>
            <br />
            <div className="my-6">
              <span className=" text-blue-gray-600">
                {t("landing.appointment.doctor.description")}
              </span>
            </div>
            <Button variant="filled" className="px-10 bg-[#8353e29a]">
              {t("landing.appointment.doctor.button.learnmore")}
            </Button>
          </div>
        </div>
        <div className="w-1/2">
          <img src="/landing-page/appointments.png" alt="" className="h-64" />
        </div>
      </div>
      <div className="flex w-[75%] h-[50vh]">
        <div className="w-1/2">
          <div className="w-[80%] mr-[20%]">
            <img src="/landing-page/chat.png" alt="" className="h-full" />
          </div>
        </div>
        <div className="w-1/2 text-left">
          <div className="w-[90%] my-auto">
            <span className="font-bold text-3xl ">
              <span className="text-[#8353E2]">{t("landing.appointment.chat.title.1")}</span>{t("landing.appointment.chat.title.2")}
            </span>
            <br />
            <div className="my-6">
              <span className=" text-blue-gray-600">
                {t("landing.appointment.chat.description")}
              </span>
            </div>
            <Button variant="filled" className="px-10 bg-[#8353e29a] ">
              {t("landing.appointment.doctor.button.learnmore")}
            </Button>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src="/landing-page/getStarted.png" alt="" className="w-full " />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <span className="font-bold text-4xl ">{t("landing.appointment.banner.title")}</span>
          <br />
          <div className="my-6">
            <span className="text-sm">
              {t("landing.appointment.banner.desc")}
            </span>
            <br />
          </div>
          <Link to={"/register"}>
            <Button variant="filled" className="px-10" color="white">
              {t("landing.nav.signup")}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Appointments;
