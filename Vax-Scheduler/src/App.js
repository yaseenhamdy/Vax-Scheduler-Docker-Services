import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Error from "./Components/Error/Error";

import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout";
import AdminAllVaccineCenters from "./Components/Admin/AdminAllVaccinesCenters/AdminAllVaccineCenters";
import AdminAddVaccineCenters from "./Components/Admin/AdminAddVaccineCenters/AdminAddVaccineCenters";
import { AuthProvider } from "./Context/AuthContext";
import AdminRoute from "./Components/Admin/AdminRoute/AdminRoute";
import AdminAllVaccine from "./Components/Admin/AdminAllVaccine/AdminAllVaccine";
import AdminAddVaccine from "./Components/Admin/AdminAddVaccine/AdminAddVaccine";
import CenterLayout from "./Components/Center/CenterLayout/CenterLayout";
import CenterWaiting from "./Components/Center/CenterWaiting/CenterWaiting";
import CenterRoute from "./Components/Center/CenterRoute/CenterRoute";
import Home from "./Components/Patient/PatientHome/Home";
import PatientLayout from "./Components/Patient/PatientLayout/PatientLayout";
import PatientRoute from "./Components/Patient/PatientRoute/PatientRoute";
import CenterPatients from "./Components/Center/CenterPatients/CenterPatients";
import Certificates from "./Components/Patient/Certificates/Certificates";
import WaitCertificate from "./Components/Center/WaitCertificate/WaitCertificate";

function App() {
  let route = createBrowserRouter([
    { path: "/", element: <Login /> },

    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "error", element: <Error /> },

    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: (
            <AdminRoute>
              {" "}
              <AdminAllVaccineCenters />{" "}
            </AdminRoute>
          ),
        },
        { path: "allvaccinecenters", element: <AdminAllVaccineCenters /> },

        { path: "addVaccinecenters", element: <AdminAddVaccineCenters /> },

        { path: "allvaccines", element: <AdminAllVaccine /> },
        { path: "addvaccine", element: <AdminAddVaccine /> },
      ],
    },

    {
      path: "center",
      element: (
        <CenterRoute>
          {" "}
          <CenterLayout />{" "}
        </CenterRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <CenterRoute>
              {" "}
              <CenterWaiting />{" "}
            </CenterRoute>
          ),
        },
        {
          path: "AllWaitingPatients",
          element: (
            <CenterRoute>
              {" "}
              <CenterWaiting />{" "}
            </CenterRoute>
          ),
        },
        {
          path: "centerpatients",
          element: (
            <CenterRoute>
              {" "}
              <CenterPatients />{" "}
            </CenterRoute>
          ),
        },
        {
          path: "waitcertificate",
          element: (
            <CenterRoute>
              {" "}
              <WaitCertificate />{" "}
            </CenterRoute>
          ),
        },
      ],
    },

    {
      path: "patient",
      element: <PatientLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        {
          path: "certificate/:centerid/:vaccineid",
          element: (
            <PatientRoute>
              <Certificates />{" "}
            </PatientRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  );
}

export default App;
