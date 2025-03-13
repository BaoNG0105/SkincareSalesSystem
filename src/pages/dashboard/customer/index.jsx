import { Button, Modal, Table, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../../config/axios';

function CustomerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users');
        if (response.data) {
          setCustomers(response.data.map(customer => ({
            ...customer,
            key: customer.id.toString()
          })));
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleUpdate = async (updatedCustomer) => {
    try {
      const response = await api.put(`/users/${updatedCustomer.id}`, updatedCustomer);
      if (response.data) {
        setCustomers(customers.map(customer => 
          customer.id === updatedCustomer.id ? { ...response.data, key: response.data.id.toString() } : customer
        ));
      }
    } catch (err) {
      console.error('Error updating customer:', err);
      setError('Failed to update customer');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError('Failed to delete customer');
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <img src={text} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Total Spent ($)',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
    },
    {
      title: 'Date Joined',
      dataIndex: 'dateJoined',
      key: 'dateJoined',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => { setEditingCustomer(record); setIsOpen(true); }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </span>
      ),
    }
  ];

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Table dataSource={customers} columns={columns} />
      <Modal
        title="Edit Customer"
        visible={isOpen}
        onCancel={() => { setIsOpen(false); setEditingCustomer(null); }}
        onOk={() => {
          const form = document.forms['customerForm'];
          const updatedCustomer = {
            name: form.name.value,
            id: form.id.value,
            age: form.age.value,
            email: form.email.value,
            phone: form.phone.value,
            address: form.address.value,
            totalSpent: form.totalSpent.value,
            dateJoined: form.dateJoined.value,
            status: form.status.value,
            avatar: form.avatar.value,
          };
          handleUpdate(updatedCustomer);
          setIsOpen(false);
          setEditingCustomer(null);
        }}
      >
        <Form id="customerForm" initialValues={editingCustomer || {}}>
          <Form.Item label="Name" name="name">
            <Input defaultValue={editingCustomer?.name} />
          </Form.Item>
          <Form.Item label="ID" name="id">
            <Input defaultValue={editingCustomer?.id} />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input defaultValue={editingCustomer?.age} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input defaultValue={editingCustomer?.email} />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input defaultValue={editingCustomer?.phone} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input defaultValue={editingCustomer?.address} />
          </Form.Item>
          <Form.Item label="Total Spent" name="totalSpent">
            <Input defaultValue={editingCustomer?.totalSpent} />
          </Form.Item>
          <Form.Item label="Date Joined" name="dateJoined">
            <Input defaultValue={editingCustomer?.dateJoined} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input defaultValue={editingCustomer?.status} />
          </Form.Item>
          <Form.Item label="Avatar" name="avatar">
            <Input defaultValue={editingCustomer?.avatar} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerPage;