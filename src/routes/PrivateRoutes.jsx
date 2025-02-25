import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";
import Layout from "../pages/Layout";

const PrivateRoutes = () => {
 const { user } = useContext(Context);
  return user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
