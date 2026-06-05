import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import LoginPage from "../../pages/auth/LoginPage";

import PatientsPage from "../../pages/patients/PatientsPage";

import PatientDetailPage from "../../pages/patients/PatientDetailPage";

import CreatePatientPage from "../../pages/patients/CreatePatientPage";

import EditPatientPage from "../../pages/patients/EditPatientPage";

import DietPlanPage from "../../pages/diet/DietPlanPage";

import AppLayout from "../layouts/AppLayout";

import ProtectedRoute from "../../components/common/ProtectedRoute";

import { DesignPage } from "../../pages/DesignPage";

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

          /* CONSULTANTS */
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

          /* DIET EDITOR */
          {
            path: "/diet-editor",
            element: <DietPlanPage />,
          },

          
   {
    path: "/design",
    element: <DesignPage />
  },

        ],
      },
    ],
  },
]);