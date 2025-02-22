import React, { useState } from "react";
import { Table, Button, Tag, Select, Popconfirm, Rate } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminSidebar from "./AdminSidebar";
import "./ReviewsManagement.css";

const { Option } = Select;

const ReviewsManagement = () => {
  // Sample review data
  const [reviews, setReviews] = useState([
    { id: 1, user: "John Doe", rating: 5, comment: "Great service!", status: "Pending" },
    { id: 2, user: "Jane Smith", rating: 4, comment: "Nice experience.", status: "Approved" },
    { id: 3, user: "Alice Johnson", rating: 3, comment: "Could be better.", status: "Rejected" },
  ]);

  // Change review status
  const handleStatusChange = (id, status) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === id ? { ...review, status } : review))
    );
  };

  // Delete review
  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "User", dataIndex: "user", key: "user" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled value={rating} />,
    },
    { title: "Review", dataIndex: "comment", key: "comment" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="Approved">Approved</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Rejected">Rejected</Option>
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
            onClick={() => handleStatusChange(record.id, "Approved")}
            style={{ color: "green" }}
          >
            Approve
          </Button>
          <Button
            icon={<CloseOutlined />}
            type="link"
            onClick={() => handleStatusChange(record.id, "Rejected")}
            style={{ color: "orange" }}
          >
            Reject
          </Button>
          <Popconfirm
            title="Are you sure to delete this review?"
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
    <div className="reviews-container">
      <AdminSidebar />
      <div className="content">
        <h2>Reviews & Ratings Management</h2>
        <Table dataSource={reviews} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default ReviewsManagement;
