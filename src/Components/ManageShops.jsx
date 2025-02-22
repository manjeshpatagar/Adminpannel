import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Switch, Upload, TimePicker } from "antd";
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import "./ManageShops.css";

const { Option } = Select;
const { RangePicker } = TimePicker;

const initialShops = [
  { 
    id: 1, name: "ABC Electronics", category: "Electronics", subcategory: "", 
    contact: "9876543210", location: "Kumta", pincode: "581343", street: "Main Road",
    area: "Market", landmark: "Near Bus Stop", city: "Kumta", state: "Karnataka",
    email: "abc@example.com", timings: ["09:00", "18:00"], status: true, photos: []
  },
];

const ManageShops = () => {
  const [shops, setShops] = useState(initialShops);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState(null);
  const [form] = Form.useForm();
  
  const [fileList, setFileList] = useState([]);

  // Category Options
  const categories = {
    Electronics: [],
    Furniture: [],
    Clothing: [],
    Automobile: [],
    Doctor: ["Heart Specialist", "Child Specialist", "Dentist", "Neurologist"],
  };

  // Open modal for Add/Edit
  const showModal = (shop = null) => {
    setEditingShop(shop);
    
    if (shop) {
      form.setFieldsValue({
        ...shop,
        timings: shop.timings ? [moment(shop.timings[0], "HH:mm"), moment(shop.timings[1], "HH:mm")] : [],
      });

      setFileList(shop.photos || []);
    } else {
      form.resetFields();
      setFileList([]);
    }
    
    setIsModalOpen(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingShop(null);
    form.resetFields();
    setFileList([]);
  };

  // Handle form submission for adding or editing
  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedShop = {
        ...values,
        id: editingShop ? editingShop.id : Date.now(),
        timings: values.timings ? [values.timings[0].format("HH:mm"), values.timings[1].format("HH:mm")] : [],
        photos: fileList,
      };

      if (editingShop) {
        setShops(shops.map((shop) => (shop.id === editingShop.id ? updatedShop : shop)));
      } else {
        setShops([...shops, { ...updatedShop, status: true }]);
      }
      
      handleCancel();
    });
  };

  // Delete a shop
  const handleDelete = (id) => {
    setShops(shops.filter((shop) => shop.id !== id));
  };

  // Toggle shop status
  const toggleStatus = (id) => {
    setShops(shops.map((shop) => (shop.id === id ? { ...shop, status: !shop.status } : shop)));
  };

  // Handle Image Upload
  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const columns = [
    { title: "Shop Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Subcategory", dataIndex: "subcategory", key: "subcategory" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Switch checked={record.status} onChange={() => toggleStatus(record.id)} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-buttons">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </div>
      ),
    },
  ];

  return (
    <div className="manage-shops-container">
      <h2>Shop Management</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Add Shop
      </Button>
      <Table dataSource={shops} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />

      {/* Add/Edit Shop Modal */}
      <Modal title={editingShop ? "Edit Shop" : "Add Shop"} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Shop Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select Category" onChange={() => form.setFieldsValue({ subcategory: undefined })}>
              {Object.keys(categories).map((cat) => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="subcategory" label="Subcategory">
            <Select placeholder="Select Subcategory">
              {(categories[form.getFieldValue("category")] || []).map((sub) => (
                <Option key={sub} value={sub}>{sub}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="contact" label="Contact Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="pincode" label="Pincode" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="street" label="Street/Colony" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="state" label="State" rules={[{ required: true }]}>
            <Select>
              <Option value="Karnataka">Karnataka</Option>
              <Option value="Maharashtra">Maharashtra</Option>
            </Select>
          </Form.Item>

          <Form.Item name="timings" label="Business Timings">
            <RangePicker format="HH:mm" />
          </Form.Item>

          <Form.Item label="Add Photos" name="photos">
            <Upload listType="picture-card" fileList={fileList} onChange={handleUploadChange}>
              {fileList.length < 5 && <div><UploadOutlined /><div>Upload</div></div>}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageShops;
