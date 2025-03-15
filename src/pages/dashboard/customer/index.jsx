import { Button, Modal, Table, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../../config/axios';

function CustomerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const mapStatus = (status) => {
    return status ? 'Hoạt động' : 'Không hoạt động';
  };

  const mapGender = (gender) => {
    return gender === 'Male' ? 'Nam' : 'Nữ';
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      console.log('Raw API Response:', response.data);
      if (response.data) {
        const mappedCustomers = response.data.map(customer => ({
          ...customer,
          key: customer.id.toString(),
          status: mapStatus(customer.status),
          gender: mapGender(customer.gender)
        }));
        console.log('Mapped Customer:', mappedCustomers[0]);
        setCustomers(mappedCustomers);
      }
    } catch (err) {
      console.error('Lỗi khi lấy danh sách khách hàng:', err);
      setError('Không thể tải danh sách khách hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await api.put(`/users/${values.id}`, values);
      if (response.data) {
        setCustomers(customers.map(customer => 
          customer.id === values.id ? { 
            ...response.data, 
            key: response.data.id.toString(),
            status: mapStatus(response.data.status),
            gender: mapGender(response.data.gender)
          } : customer
        ));
        setIsOpen(false);
        setEditingCustomer(null);
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật khách hàng:', err);
      setError('Không thể cập nhật khách hàng');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (err) {
      console.error('Lỗi khi xóa khách hàng:', err);
      setError('Không thể xóa khách hàng');
    }
  };

  const columns = [
    {
      title: 'Ảnh đại diện',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (text) => <img src={text} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => text || 'Chưa cập nhật'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (text) => {
        if (!text) return 'Chưa cập nhật';
        try {
          return new Date(text).toLocaleDateString('vi-VN');
        } catch (error) {
          return text;
        }
      }
    },
    {
      title: 'Số dư',
      dataIndex: 'money',
      key: 'money',
      render: (money) => `${money?.toLocaleString('vi-VN')} đ`
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        if (!text) return 'Chưa cập nhật';
        try {
          return new Date(text).toLocaleDateString('vi-VN');
        } catch (error) {
          return text;
        }
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ 
          color: status === 'Hoạt động' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {status}
        </span>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingCustomer(record);
              form.setFieldsValue({
                ...record,
                dateOfBirth: record.dateOfBirth ? record.dateOfBirth.split('T')[0] : '',
              });
              setIsOpen(true);
            }}
            style={{ marginRight: 8 }}
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)} 
            danger 
          />
        </span>
      ),
    }
  ];

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Table dataSource={customers} columns={columns} />
      <Modal
        title="Chỉnh sửa thông tin khách hàng"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setEditingCustomer(null);
          form.resetFields();
        }}
        onOk={() => {
          form.validateFields()
            .then(values => {
              handleUpdate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingCustomer}
        >
          <Form.Item 
            label="Tên người dùng" 
            name="userName"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Email" 
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Số điện thoại" 
            name="phoneNumber"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Địa chỉ" 
            name="address"
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Giới tính" 
            name="gender"
          >
            <Select>
              <Select.Option value="Male">Nam</Select.Option>
              <Select.Option value="Female">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Ngày sinh" 
            name="dateOfBirth"
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item 
            label="Vai trò" 
            name="role"
          >
            <Select>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Trạng thái" 
            name="status"
          >
            <Select>
              <Select.Option value={true}>Hoạt động</Select.Option>
              <Select.Option value={false}>Không hoạt động</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Số dư" 
            name="money"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item 
            label="Ảnh đại diện" 
            name="profileImage"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerPage;