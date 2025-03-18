import { 
  Button, 
  Modal, 
  Table, 
  message 
} from 'antd';
import React, { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import api from '../../../config/axios';
import { deleteUser } from '../../../services/api.user';

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response) {
        setCustomers(prevCustomers => 
          prevCustomers.filter(customer => customer.id !== userId)
        );
        message.success('Xóa khách hàng thành công');
      }
    } catch (err) {
      console.error('Lỗi khi xóa khách hàng:', err);
      message.error('Không thể xóa khách hàng');
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
    </div>
  );
}

export default CustomerPage;