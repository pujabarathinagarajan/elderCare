import { Typography } from "@mui/material";
import "./elderly-register-page.css";
type ComponentWithElementPropProps = {
    page: JSX.Element;  
};
import { useTranslation } from "react-i18next";



const ElderlyRegisterPage: React.FC<ComponentWithElementPropProps> = ({page}) => {
  const { t } = useTranslation("registerBackgroundPage");

  return (
    <>
      <div className="container">
        <img className="logo" src="/logo.png" alt="" />
        <div className="lowerLeftBox"></div>
        <div className="upperRightBox"></div>
        <div className="quote">
          <img src="/elderly-register/1.png" alt="" />
          <Typography
            margin="30px"
            fontWeight="bold"
            component="h1"
            fontSize="30px"
            align="center"
            color="#8659d3"
          >
            {t("elderly-register.joinTitle")} <br />
            {t("elderly-register.joinSubtitle")}
          </Typography>
          <img src="/elderly-register/2.png" alt="" />
        </div>
        <div className="register ">
          {page}
        </div>
        <img className="dots" src="/elderly-register/dot.png"></img>
      </div>
    </>
  );
}

export default ElderlyRegisterPage;
