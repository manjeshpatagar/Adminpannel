import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import AdminSidebar from "./AdminSidebar";
import "./AddCategories.css";

const AddCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, title: "Hotels", image: "https://via.placeholder.com/50" },
    { id: 2, title: "Shops", image: "https://via.placeholder.com/50" },
    { id: 3, title: "Travel", image: "https://via.placeholder.com/50" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle image upload
  const handleImageChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Handle add category
  const handleAddCategory = (values) => {
    const newCategory = {
      id: categories.length + 1,
      title: values.title,
      image: imageUrl || "https://via.placeholder.com/50",
    };

    setCategories([...categories, newCategory]);
    setIsModalVisible(false);
    form.resetFields();
    setImageUrl(null);
  };

  // Handle delete category
  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="category" width={50} height={50} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Popconfirm
          title="Are you sure you want to delete this category?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="categories-container">
      <AdminSidebar />
      <div className="content">
        <h2>Manage Categories</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Category
        </Button>
        <Table dataSource={categories} columns={columns} rowKey="id" />

        {/* Add Category Modal */}
        <Modal
          title="Add Category"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleAddCategory}>
            <Form.Item
              label="Category Title"
              name="title"
              rules={[{ required: true, message: "Please enter category title" }]}
            >
              <Input placeholder="Enter category title" />
            </Form.Item>
            <Form.Item
              label="Upload Image"
              name="image"
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload listType="picture" beforeUpload={handleImageChange} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              {imageUrl && <img src={imageUrl} alt="preview" width={50} height={50} style={{ marginTop: 10 }} />}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AddCategories;
