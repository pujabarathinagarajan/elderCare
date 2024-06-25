import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormContainer,
  TextFieldElement,
  useWatch,
  PasswordElement,
  PasswordRepeatElement,
} from "react-hook-form-mui";
import { Stack } from "@mui/material";
import Avatar from "@mui/joy/Avatar";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useEffect } from "react";
import { setCredentials } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../authStore/store";
import { useTranslation } from "react-i18next";

const SubComponent = () => {
  const { t } = useTranslation("elderlyRegisterPage");
  const [name, email, password, repeatPassword] = useWatch({
    name: ["name", "email", "password", "repeatPassword"],
  });
  return (
    <>
      <Stack spacing={3}>
        <Button
          type={"submit"}
          color={"primary"}
          variant={"contained"}
          disabled={!(name && email && password && repeatPassword)}
        >
          {t("elderly-register.submit")}
        </Button>
      </Stack>
    </>
  );
};
function ElderlyRegister() {
  const dispatch = useDispatch.withTypes<AppDispatch>()();
  const navigate = useNavigate();
  const { t } = useTranslation("elderlyRegisterPage");
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector.withTypes<RootState>()((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [radioValue, setRadioValue] = React.useState("ELDER");
  const handleSubmit = async (data: any) => {
    const formObject = data;
    formObject.userType = radioValue;
    delete formObject.repeatPassword;
    // console.log(formObject);
    const loader = toast.loading('Loading...');
    try {
      
      const res = await register(data).unwrap();
      dispatch(setCredentials({ ...(res as Object) } ));
      toast.dismiss(loader);
      toast.success('Account Created')
      navigate('/');
    } catch (err:any) {
      toast.dismiss(loader);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "white",
          width: "500px",
          borderRadius: 3,
          boxShadow: 2,
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <br />

        <Typography component="h1" variant="h5" fontWeight="bold">
        {t("elderly-register.welcome")}
        </Typography>
        <Typography component="h1" variant="h6">
          {t("elderly-register.createAccount")}
        </Typography>

        <Box
          sx={{
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <FormContainer
            defaultValues={
              {
                // name: "",
              }
            }
            onSuccess={(data) => {
              handleSubmit(data);
            }}
          >
            <Stack direction={"column"}>
              <TextFieldElement name={"name"} label={"Full Name"} required />{" "}
              <br />
              <TextFieldElement
                name={"email"}
                label={"Email"}
                required
                type={"email"}
              />{" "}
              <br />
              <PasswordElement
                margin={"dense"}
                label={"Password"}
                required
                name={"password"}
              />
              <br />
              <PasswordRepeatElement
                passwordFieldName={"password"}
                name={"repeatPassword"}
                margin={"dense"}
                label={"Repeat Password"}
                required
              />
              <br />
              <Typography component="h1" variant="body1" fontWeight="bold">
              {t("elderly-register.description")}
              </Typography>
              <br />
              <RadioGroup
                aria-label="userTypes"
                defaultValue="ELDER"
                overlay
                name="userType"
                sx={{
                  flexDirection: "row",
                  gap: 2,
                  [`& .${radioClasses.checked}`]: {
                    [`& .${radioClasses.action}`]: {
                      inset: -1,
                      border: "3px solid",
                      borderColor: "primary.500",
                    },
                  },
                  [`& .${radioClasses.radio}`]: {
                    display: "contents",
                    "& > svg": {
                      zIndex: 2,
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      bgcolor: "background.surface",
                      borderRadius: "50%",
                    },
                  },
                }}
              >
                <div onClick={() => setRadioValue("ELDER")}>
                  <Sheet
                    variant="outlined"
                    sx={{
                      borderRadius: "md",

                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      minWidth: 120,
                    }}
                  >
                    <Radio
                      id="ELDER"
                      value="ELDER"
                      checkedIcon={<CheckCircleRoundedIcon />}
                    />
                    <Avatar variant="soft" size="sm" />
                    <FormLabel htmlFor="ELDER">I need Care</FormLabel>
                  </Sheet>
                </div>
                <div onClick={() => setRadioValue("DOCTOR")}>
                  <Sheet
                    variant="outlined"
                    sx={{
                      borderRadius: "md",

                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      minWidth: 120,
                    }}
                  >
                    <Radio
                      id="DOCTOR"
                      value="DOCTOR"
                      checkedIcon={<CheckCircleRoundedIcon />}
                    />
                    <Avatar variant="soft" size="sm" />
                    <FormLabel htmlFor="DOCTOR">I am a Caregiver</FormLabel>
                  </Sheet>
                </div>
              </RadioGroup>
              <Grid item xs={12} marginBottom={2}></Grid>
              <br />
              <SubComponent />
            </Stack>
          </FormContainer>
        </Box>
        <div className="my-2 text-sm">
          <span>Already have an account? <Link className="text-blue-900" to={"/login"}>Login</Link> </span>
        </div>
      </Box>
    </Container>
  );
}

export default ElderlyRegister;