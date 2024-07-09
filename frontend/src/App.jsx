import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import StudentLogin from "./pages/students/StudentLogin.jsx";
import StudentHome from "./pages/students/StudentHome.jsx";
import StudentLayout from "./components/StudentLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import NewStudent from "./pages/admin/NewStudent.jsx";
import AllAdmin from "./pages/admin/AllAdmin.jsx";
import StudentPrivateRoute from "./components/StudentPrivateRoute.jsx";
import EditStudent from "./pages/admin/EditStudent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<StudentLayout />}>
        <Route path="/" index={true} element={<Home />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="" element={<StudentPrivateRoute />}>
          <Route path="/student/me" index={true} element={<StudentHome />} />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/" element={<Navigate to={"/admin/dashboard"} />} />
        <Route path="/admin/dashboard" index={true} element={<Dashboard />} />
        <Route path="/admin/students/add/new" element={<NewStudent />} />
        <Route path="/admin/all" element={<AllAdmin />} />
        <Route path="/admin/:id/edit" element={<EditStudent />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
