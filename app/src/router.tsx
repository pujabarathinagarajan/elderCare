import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App.tsx";
import ElderlyRegisterPage from "./pages/elderly-register-page.tsx";
import LandingPage from "./pages/landing-page.tsx";
import ElderlyRegister from "./components/auth/elderly-register.tsx";
import ElderlyLogin from "./components/auth/elderly-login.tsx";
import Dashboard from "./pages/dashboard.tsx";
import PrivateRoute from "./components/privateRoute.tsx";
import EcBuddy from "./pages/ecBuddy.tsx";
import ECommerce from "./pages/Dashboard/ECommerce.tsx";
import Settings from "./pages/Settings.tsx";
import Profile from "./pages/Profile.tsx";
import Calendar from "./components/doctorAptList/Calender.tsx";
import PaymentConfirmation from "./pages/paymentSuccess.tsx";
import PaymentSuccess from "./pages/paymentSuccess.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={<ElderlyRegisterPage page={<ElderlyLogin />} />}
      />
      <Route
        path="/register"
        element={<ElderlyRegisterPage page={<ElderlyRegister />} />}
      />

      <Route path="/paymentsuccess" element={<PaymentConfirmation />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<ECommerce />} />
        <Route path="/elderlycare" element={<EcBuddy />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Route>
    </Route>
  )
);

export default router;
