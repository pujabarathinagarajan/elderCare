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
} from "react-hook-form-mui";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../authStore/store";
import { useTranslation } from "react-i18next";


const SubComponent = () => {
  const { t } = useTranslation("ElderlyloginPage");
  const [email, password] = useWatch({
    name: ["email", "password"],

  });
  return (
    <>
      <Stack spacing={3}>
        <Button
          type={"submit"}
          color={"primary"}
          variant={"contained"}
          disabled={!(email && password)}
        >
          {t("elderly-login.submit")}
        </Button>
      </Stack>
    </>
  );
};
function ElderlyLogin() {
  const handleSubmit = async (data: any) => {
    // console.log(data);
    const loader = toast.loading("Loading...");
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...(res as object) }));
      toast.dismiss(loader);
      toast.success("Success!");
      navigate("/");
    } catch (err: any) {
      toast.dismiss(loader);
      toast.error(err?.data?.message || err.error);
    }
  };
  const { t } = useTranslation("ElderlyloginPage");
  const dispatch = useDispatch.withTypes<AppDispatch>()();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector.withTypes<RootState>()(
    (state) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "white",
          width: "500px",
          borderRadius: 3,
          boxShadow: 2,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <img src='/ec-icon.png' ></img> */}
        <br />

        <Typography component="h1" variant="h5" fontWeight="bold">
          {t("elderly-login.welcome")}
        </Typography>
        <Typography component="h1" variant="h6">
          {t("elderly-login.createAccount")}
        </Typography>

        <Box
          sx={{
            width: "100%",
            marginTop: "30px",
            marginBottom: "30px",
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
              <br />
              <Grid item xs={12} marginBottom={2}></Grid>
              <br />
              <SubComponent />
            </Stack>
          </FormContainer>
        </Box>
        <div className="text-sm">
          <span>{t("elderly-login.noAccount")} <Link className="text-blue-900" to={"/register"}>{t("elderly-login.register")}</Link> </span>
        </div>
      </Box>
    </Container>
  );
}

export default ElderlyLogin;
