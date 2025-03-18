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
import { DeleteOutlined } from '@ant-design/icons';
import api from '../../../config/axios';

function CustomerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleAdd = async (values) => {
    try {
      if (!values.email || !values.passwordHash || !values.userName) {
        message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
      }

      const submitData = {
        email: values.email.trim(),
        passwordHash: values.passwordHash,
        userName: values.userName.trim(),
        gender: values.gender || "",
        dateOfBirth: values.dateOfBirth || "",
        address: values.address?.trim() || "",
        phoneNumber: values.phoneNumber?.trim() || "",
        profileImage: values.profileImage?.trim() || ""
      };

      const response = await api.post('auth/register', submitData);
      if (response.data) {
        const newCustomer = {
          ...response.data,
          key: response.data.id.toString(),
          status: mapStatus(response.data.status),
          gender: mapGender(response.data.gender)
        };
        setCustomers([...customers, newCustomer]);
        setIsOpen(false);
        form.resetFields();
        message.success('Thêm khách hàng thành công');
        fetchCustomers();
      } else {
        message.error('Không thể thêm khách hàng');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      message.error('Không thể thêm khách hàng: ' + error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      if (response.status === 200) {
        setCustomers(prevCustomers => 
          prevCustomers.filter(customer => customer.id !== userId)
        );
        message.success('Xóa khách hàng thành công');
      }
    } catch (err) {
      console.error('Lỗi khi xóa khách hàng:', err);
      message.error(err.response?.data || 'Không thể xóa khách hàng');
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (text) => (
        <img 
          src={text} 
          alt="avatar" 
          className="w-12 h-12 rounded-full object-cover"
        />
      )
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
        <span className={`font-bold ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Bạn có chắc chắn muốn xóa khách hàng này?',
                content: 'Hành động này không thể hoàn tác.',
                okText: 'Có',
                okType: 'danger',
                cancelText: 'Không',
                onOk: () => {
                  handleDelete(record.id);
                },
              });
            }}
          />
        </div>
      ),
    }
  ];

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <Button 
        type="primary" 
        onClick={() => {
          setIsOpen(true);
          form.resetFields();
        }}
        className="mb-4"
      >
        Add New Customer
      </Button>
      
      <div className="bg-white rounded-lg shadow">
        <Table 
          dataSource={customers} 
          columns={columns}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => (
              <span className="text-gray-600">
                {`${range[0]}-${range[1]} of ${total} customers`}
              </span>
            )
          }}
          className="w-full"
        />
      </div>

      <Modal
        title={<h3 className="text-lg font-semibold">Add New Customer</h3>}
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
        }}
        onOk={() => {
          form.validateFields()
            .then(values => {
              handleAdd(values);
            })
            .catch(info => {
              console.log('Validation Failed:', info);
            });
        }}
        className="max-w-2xl"
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
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
            label="Password" 
            name="passwordHash"
            rules={[{ required: true, message: 'Please enter password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item 
            label="Full Name" 
            name="userName"
            rules={[{ required: true, message: 'Please enter full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Phone" 
            name="phoneNumber"
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