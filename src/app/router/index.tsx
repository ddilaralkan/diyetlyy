import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import LoginPage from "../../pages/auth/LoginPage";

import PatientsPage from "../../pages/patients/PatientsPage";

import PatientDetailPage from "../../pages/patients/PatientDetailPage";

import CreatePatientPage from "../../pages/patients/CreatePatientPage";

import EditPatientPage from "../../pages/patients/EditPatientPage";

import AppLayout from "../layouts/AppLayout";

import ProtectedRoute from "../../components/common/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/patients" />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <AppLayout />,

        children: [
          {
            path: "/patients",
            element: <PatientsPage />,
          },

          {
            path: "/patients/new",
            element: <CreatePatientPage />,
          },

          {
            path: "/patients/:id",
            element: <PatientDetailPage />,
          },

          {
            path: "/patients/:id/edit",
            element: <EditPatientPage />,
          },
        ],
      },
    ],
  },
]);