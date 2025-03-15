import { Button, Modal, Table, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../../config/axios';

function StaffPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStaffs();
  }, []);

  const mapStatus = (status) => {
    return status ? 'Hoạt động' : 'Không hoạt động';
  };

  const mapGender = (gender) => {
    return gender === 'Male' ? 'Nam' : 'Nữ';
  };

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      // Thay đổi endpoint để lấy chỉ staff
      const response = await api.get('/users?role=Staff');
      console.log('Raw API Response:', response.data);
      if (response.data) {
        const mappedStaffs = response.data.map(staff => ({
          ...staff,
          key: staff.id.toString(),
          status: mapStatus(staff.status),
          gender: mapGender(staff.gender)
        }));
        console.log('Mapped Staff:', mappedStaffs[0]);
        setStaffs(mappedStaffs);
      }
    } catch (err) {
      console.error('Lỗi khi lấy danh sách nhân viên:', err);
      setError('Không thể tải danh sách nhân viên');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await api.put(`/users/${values.id}`, {
        ...values,
        role: 'Staff' // Đảm bảo role luôn là Staff
      });
      if (response.data) {
        setStaffs(staffs.map(staff => 
          staff.id === values.id ? { 
            ...response.data, 
            key: response.data.id.toString(),
            status: mapStatus(response.data.status),
            gender: mapGender(response.data.gender)
          } : staff
        ));
        setIsOpen(false);
        setEditingStaff(null);
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật nhân viên:', err);
      setError('Không thể cập nhật nhân viên');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setStaffs(staffs.filter(staff => staff.id !== id));
    } catch (err) {
      console.error('Lỗi khi xóa nhân viên:', err);
      setError('Không thể xóa nhân viên');
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
      title: 'Tên nhân viên',
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
              setEditingStaff(record);
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
      <Table dataSource={staffs} columns={columns} />
      <Modal
        title="Chỉnh sửa thông tin nhân viên"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setEditingStaff(null);
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
          initialValues={editingStaff}
        >
          <Form.Item 
            label="Tên nhân viên" 
            name="userName"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
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
            label="Trạng thái" 
            name="status"
          >
            <Select>
              <Select.Option value={true}>Hoạt động</Select.Option>
              <Select.Option value={false}>Không hoạt động</Select.Option>
            </Select>
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

export default StaffPage;