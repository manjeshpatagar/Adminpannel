import React from "react";
import { Card } from "react-bootstrap";
import { DashboardOutlined, ShopOutlined, UserOutlined, BellOutlined } from "@ant-design/icons";
import "./Dashboard.css";

const Dashboard = () => {
  const stats = [
    { title: "Total Businesses", count: 120, icon: <ShopOutlined /> },
    { title: "Total Users", count: 350, icon: <UserOutlined /> },
    { title: "New Requests", count: 15, icon: <BellOutlined /> },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title"><DashboardOutlined /> Admin Dashboard</h2>
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <Card key={index} className="dashboard-card">
            <Card.Body>
              <div className="icon">{stat.icon}</div>
              <h3>{stat.count}</h3>
              <p>{stat.title}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
