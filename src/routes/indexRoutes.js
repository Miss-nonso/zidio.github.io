import Login from "../components/login/login";
import Register from "../components/register/register";
import LandingPage from "../components/LandingPage/LandingPage";
import userDashboard from "../components/dashboard/UserDashboard";

const indexRoutes = [
  {
    name: "Landing Page",
    path: "/",
    component: LandingPage
  },
  {
    name: "Register",
    path: "/register",
    component: Register
  },
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   component: Dashboard
  // },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: userDashboard
  }
];

export { indexRoutes };
