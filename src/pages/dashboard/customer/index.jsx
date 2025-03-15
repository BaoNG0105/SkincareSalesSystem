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
    return status ? 'Active' : 'Inactive';
  };

  const mapGender = (gender) => {
    return gender === 'Male' ? 'Male' : 'Female';
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      console.log('Raw API Response:', response.data);
      if (response.data) {
        const customerData = response.data.filter(user => user.role === 'Customer');
        const mappedCustomers = customerData.map(customer => ({
          ...customer,
          key: customer.id.toString(),
          status: mapStatus(customer.status),
          gender: mapGender(customer.gender)
        }));
        console.log('Mapped Customers:', mappedCustomers);
        setCustomers(mappedCustomers);
      }
    } catch (err) {
      console.error('Error loading customer list:', err);
      setError('Unable to load customer list');
      message.error('Unable to load customer list');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await api.put(`/users/${values.id}`, {
        ...values,
        role: 'Customer'
      });
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
        message.success('Update successful');
      }
    } catch (err) {
      console.error('Error updating customer:', err);
      message.error('Unable to update customer');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setCustomers(customers.filter(customer => customer.id !== id));
      message.success('Delete successful');
    } catch (err) {
      console.error('Error deleting customer:', err);
      message.error('Unable to delete customer');
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
      title: 'Balance',
      dataIndex: 'money',
      key: 'money',
      render: (money) => `$${money?.toLocaleString('en-US')}`
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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Table 
        dataSource={customers} 
        columns={columns}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} customers`
        }}
      />
      <Modal
        title="Edit Customer Information"
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
              console.log('Validation Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingCustomer}
        >
          <Form.Item 
            label="Full Name" 
            name="userName"
            rules={[{ required: true, message: 'Please enter full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Email" 
            name="email"
            rules={[
              { required: true, message: 'Please enter email!' },
              { type: 'email', message: 'Invalid email format!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Phone" 
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter phone number!' }]}
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
            label="Balance" 
            name="money"
          >
            <Input type="number" />
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

export default CustomerPage;