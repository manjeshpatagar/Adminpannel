import React, { useState } from "react";
import { Table, Button, Tag, Popconfirm, Select } from "antd";
import { CheckOutlined, DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import AdminSidebar from "./AdminSidebar";
import "./NotificationsMessages.css";

const { Option } = Select;

const NotificationsMessages = () => {
  // Sample data
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", message: "Need help with my order.", status: "Unread" },
    { id: 2, sender: "Jane Smith", message: "Payment issue resolved.", status: "Read" },
    { id: 3, sender: "Alice Johnson", message: "Inquiry about new services.", status: "Unread" },
  ]);

  // Change message status
  const handleStatusChange = (id, status) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
    );
  };

  // Delete message
  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Sender", dataIndex: "sender", key: "sender" },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="Read">Read</Option>
          <Option value="Unread">Unread</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button
            icon={<CheckOutlined />}
            type="link"
            onClick={() => handleStatusChange(record.id, "Read")}
            style={{ color: "green" }}
          >
            Mark Read
          </Button>
          <Popconfirm
            title="Are you sure to delete this message?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="notifications-container">
      <AdminSidebar />
      <div className="content">
        <h2>Notifications & Messages</h2>
        <Table dataSource={messages} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default NotificationsMessages;
