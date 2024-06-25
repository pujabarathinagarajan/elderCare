import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Hero() {
  const {t} = useTranslation('landingPage')
  return (
    <>
      <div className="pt-40">
        <span className="font-bold text-6xl tracking-wide ">
          {t('landing.hero.title.1')} <br /> {t('landing.hero.title.2')}
          <span className="text-[#8353E2]">{t('landing.hero.title.3')}</span>
        </span>
        <br />
        <div className="my-10 mx-36 text-blue-gray-600">
          <span>
          {t('landing.hero.description')}
          </span>
        </div>
        <Link to={"/register"}>
          <Button variant="filled" className="px-10 bg-[#8353E2]">
            {t("landing.hero.button")}
          </Button>
        </Link>
        <img
          src="/landing-page/Hero.png"
          alt="hero"
          className="my-10 h-64 pr-20"
        />
        <div className="my-32">
          <img src="/landing-page/downloads.png" alt="" className="h-44" />
        </div>
      </div>
    </>
  );
}

export default Hero;
