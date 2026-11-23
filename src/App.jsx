import { useState } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Principal from "./components/Principal";
import SuperAdmin from "./components/SuperAdmin";
import Student from "./components/Student";
import StudentProfile from "./components/student profile";
import StudentProfile1 from "./components/StudentProfile1";

function App() {
  const [activeRole, setActiveRole] = useState("");
  const [studentUser, setStudentUser] = useState(null);
  const [savedStudentProfile, setSavedStudentProfile] = useState(null);

  const handleLogin = (role) => {
    setActiveRole(role);

    if (role === "Student") {
      setStudentUser({
        name: "Student",
        role: "Student",
        email: "student@talentos.com",
        initials: "ST"
      });
    }
  };

  const handleLogout = () => {
    setActiveRole("");
    setStudentUser(null);
    setSavedStudentProfile(null);
  };

  const handleSaveStudentProfile = (profileData) => {
    setSavedStudentProfile(profileData);
    setActiveRole("Student Profile1");
  };

  const handleReturnToStudentProfile = () => {
    setActiveRole("Student Profile");
  };

  if (!activeRole) {
    return <Login onLogin={handleLogin} />;
  }

  switch (activeRole) {
    case "Institution Admin":
      return <AdminDashboard onLogout={handleLogout} />;

    case "Principal":
      return <Principal onLogout={handleLogout} />;

    case "Super Admin":
      return <SuperAdmin onLogout={handleLogout} />;

    case "Student":
      return <Student user={studentUser} onLogout={handleLogout} />;

    case "Student Profile":
      return (
        <StudentProfile
          onLogout={handleLogout}
          onSaveProfile={handleSaveStudentProfile}
        />
      );

    case "Student Profile1":
      return (
        <StudentProfile1
          user={studentUser}
          profileData={savedStudentProfile}
          onReturnToProfile={handleReturnToStudentProfile}
        />
      );

    default:
      return <Login onLogin={handleLogin} />;
  }
}

export default App;