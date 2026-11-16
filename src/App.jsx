import { useState } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Principal from "./components/Principal";
import SuperAdmin from "./components/SuperAdmin";

function App() {
  const [activeRole, setActiveRole] = useState("");

  const handleLogout = () => {
    setActiveRole("");
  };

  if (!activeRole) {
    return <Login onLogin={setActiveRole} />;
  }

  switch (activeRole) {
    case "Institution Admin":
      return <AdminDashboard onLogout={handleLogout} />;

    case "Principal":
      return <Principal onLogout={handleLogout} />;

    case "Super Admin":
      return <SuperAdmin onLogout={handleLogout} />;

    default:
      return <Login onLogin={setActiveRole} />;
  }
}

export default App;