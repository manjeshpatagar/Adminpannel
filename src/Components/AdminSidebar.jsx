import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { AppstoreAddOutlined } from "@ant-design/icons";

import {
    DashboardOutlined,
    ShopOutlined,
    TeamOutlined,
    BellOutlined,
    SettingOutlined,
    LogoutOutlined,
    StarOutlined,  // ✅ Import the missing icon
} from "@ant-design/icons";
import "./AdminSidebar.css";

const { Sider } = Layout;

const AdminSidebar = () => {
    return (
        <Sider collapsible className="admin-sidebar">
            <div className="logo">Admin Panel</div>
            <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ShopOutlined />}>
                    <Link to="/shops">Manage Shops</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<AppstoreAddOutlined />}>
                    <Link to="/categories">Manage Categories</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />}>
                    <Link to="/users">User Management</Link>
                </Menu.Item>
                <Menu.Item key="9" icon={<MessageOutlined />}>
                    <Link to="/notificationsmessages">Notifications & Messages</Link>
                </Menu.Item>
                <Menu.Item key="8" icon={<StarOutlined />}>
                    <Link to="/reviewsmanagement">Reviews Management</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<BellOutlined />}>
                    <Link to="/requests">New Requests</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<SettingOutlined />}>
                    <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<LogoutOutlined />} className="logout">
                    <Link to="/logout">Logout</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default AdminSidebar;
