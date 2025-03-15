import { 
  Button, 
  Modal, 
  Table, 
  Form, 
  Input, 
  Select,
  message 
} from 'antd';
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
    return status ? 'Active' : 'Inactive';
  };

  const mapGender = (gender) => {
    return gender === 'Male' ? 'Male' : 'Female';
  };

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      console.log('Raw API Response:', response.data);
      if (response.data) {
        const staffData = response.data.filter(user => 
          user.role === 'Staff' || user.role === 'Manager'
        );
        const mappedStaffs = staffData.map(staff => ({
          ...staff,
          key: staff.id.toString(),
          status: mapStatus(staff.status),
          gender: mapGender(staff.gender)
        }));
        console.log('Mapped Staffs:', mappedStaffs);
        setStaffs(mappedStaffs);
      }
    } catch (err) {
      console.error('Error loading staff list:', err);
      message.error('Cannot load staff list');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const updatedStaff = {
        ...values,
        authorities: [{ authority: `ROLE_${values.role.toUpperCase()}` }],
        enabled: true,
        accountNonExpired: true,
        credentialsNonExpired: true,
        accountNonLocked: true,
        deleted: false
      };

      const response = await api.put(`/users/${values.id}`, updatedStaff);
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
        message.success('Update successful');
      }
    } catch (err) {
      console.error('Error updating staff:', err);
      message.error('Cannot update staff');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setStaffs(staffs.filter(staff => staff.id !== id));
      message.success('Delete successful');
    } catch (err) {
      console.error('Error deleting staff:', err);
      message.error('Cannot delete staff');
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (text) => <img src={text} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
    },
    {
      title: 'Full Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => text || 'Not updated'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span style={{
          color: role === 'Manager' ? '#1890ff' : '#52c41a',
          fontWeight: 'bold'
        }}>
          {role}
        </span>
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (text) => {
        if (!text) return 'Not updated';
        try {
          return new Date(text).toLocaleDateString('en-US');
        } catch (error) {
          return text;
        }
      }
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        if (!text) return 'Not updated';
        try {
          return new Date(text).toLocaleDateString('en-US');
        } catch (error) {
          return text;
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ 
          color: status === 'Active' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {status}
        </span>
      )
    },
    {
      title: 'Actions',
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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Table 
        dataSource={staffs} 
        columns={columns}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
      />
      <Modal
        title="Edit Staff Information"
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
            label="Full Name" 
            name="userName"
            rules={[{ required: true, message: 'Please input full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Email" 
            name="email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Invalid email format!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Phone" 
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Address" 
            name="address"
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Role" 
            name="role"
            rules={[{ required: true, message: 'Please select role!' }]}
          >
            <Select>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Staff">Staff</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Gender" 
            name="gender"
          >
            <Select>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Date of Birth" 
            name="dateOfBirth"
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item 
            label="Status" 
            name="status"
          >
            <Select>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Avatar" 
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