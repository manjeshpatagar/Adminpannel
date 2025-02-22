import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { useState, useEffect } from "react";
import AdminSidebar from "./Components/AdminSidebar";
import Dashboard from "./Components/Dashboard";
import ManageShops from "./Components/ManageShops";
import UserManagement from "./Components/UserManagement";
import ReviewsManagement from "./Components/ReviewsManagement";
import NotificationsMessages from "./Components/NotificationsMessages";
import LoginPage from "./Components/LoginPage";
import AddCategories from "./Components/AddCategories";

const { Content } = Layout;

function App() {
  // Check if user is logged in from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  // Function to handle login
  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Show Sidebar only if authenticated */}
        {isAuthenticated && <AdminSidebar />}

        {/* Main content section */}
        <Layout style={{ marginLeft: isAuthenticated ? 200 : 0, padding: 20 }}>
          <Content>
            <Routes>
              {/* Redirect to Dashboard if already logged in */}
              <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
              />
              
              {/* Protect Dashboard and other routes */}
              {isAuthenticated ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/shops" element={<ManageShops />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/reviewsmanagement" element={<ReviewsManagement />} />
                  <Route path="/notificationsmessages" element={<NotificationsMessages />} />
                  <Route path="/categories" element={<AddCategories />} />
                </>
              ) : (
                // Redirect to login if not authenticated
                <Route path="*" element={<Navigate to="/" />} />
              )}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
