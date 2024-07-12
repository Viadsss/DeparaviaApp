import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import Admission from "./pages/Admission";
import NewAdmissisonForm from "./components/admission/new/NewAdmissisonForm";
import ReturningAdmissionForm from "./components/admission/returning/ReturningAdmissionForm";
import Admin from "./pages/Admin";
import Visitor from "./pages/Visitor";
import Doctor from "./pages/Doctor";
import Problems from "./pages/Problems";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> }, // Default route
        { path: "patient", element: <Patient /> },
        { path: "doctor", element: <Doctor /> },
        { path: "visitor", element: <Visitor /> },
        { path: "admission", element: <Admission /> },
        { path: "admission/new", element: <NewAdmissisonForm /> },
        { path: "admission/returning", element: <ReturningAdmissionForm /> },
        { path: "admin", element: <Admin /> },
        { path: "problems", element: <Problems /> },
      ],
      errorElement: <div>Error Page</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
