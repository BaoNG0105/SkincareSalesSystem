import { Button, Modal, Table, Form, Input } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

function CustomerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([
    {
      key: '1',
      name: 'Alice Johnson',
      id: 201,
      age: 29,
      email: 'alice.johnson@example.com',
      phone: '123-456-7890',
      address: '123 Main St, New York, NY',
      totalSpent: 1200,
      dateJoined: '2021-03-15',
      status: 'Active',
      avatar: 'https://rukminim2.flixcart.com/image/850/1000/kx3l0nk0/shopsy-poster/q/g/r/medium-doraemon-cartton-character-hd-wallpaper-on-fine-art-paper-original-imag9mtrfwthyqeh.jpeg?q=90&crop=false'
    },
    {
      key: '2',
      name: 'Bob Williams',
      id: 202,
      age: 35,
      email: 'bob.williams@example.com',
      phone: '234-567-8901',
      address: '456 Oak St, Los Angeles, CA',
      totalSpent: 850,
      dateJoined: '2020-07-10',
      status: 'Inactive',
      avatar: 'data:image/jpeg;base64,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'
    },
    {
      key: '3',
      name: 'Catherine Brown',
      id: 203,
      age: 42,
      email: 'catherine.brown@example.com',
      phone: '345-678-9012',
      address: '789 Pine St, Chicago, IL',
      totalSpent: 2350,
      dateJoined: '2019-05-20',
      status: 'Active',
      avatar: 'data:image/jpeg;base64,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'
    },
    {
      key: '4',
      name: 'David Lee',
      id: 204,
      age: 31,
      email: 'david.lee@example.com',
      phone: '456-789-0123',
      address: '321 Maple St, Houston, TX',
      totalSpent: 430,
      dateJoined: '2022-01-05',
      status: 'Pending',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT78kBI2NSRdKgUEYWhxFQP_tuI-5GU509U9Q&s'
    },
    {
      key: '5',
      name: 'Emma Garcia',
      id: 205,
      age: 27,
      email: 'emma.garcia@example.com',
      phone: '567-890-1234',
      address: '654 Cedar St, Miami, FL',
      totalSpent: 1780,
      dateJoined: '2021-09-12',
      status: 'Active',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNgBL1vBAECI6V8my0MTgmNYSum0Xc_-cv2A&s'
    },
    {
      key: '6',
      name: 'Frank Miller',
      id: 206,
      age: 38,
      email: 'frank.miller@example.com',
      phone: '678-901-2345',
      address: '987 Birch St, San Francisco, CA',
      totalSpent: 920,
      dateJoined: '2020-11-30',
      status: 'Inactive',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT31VAavAfs2VY8yq5roExVttBf-5a0Q8Fxjg&s'
    }


  ]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleAdd = (customer) => {
    setCustomers([...customers, { ...customer, key: customers.length + 1 }]);
  };

  const handleUpdate = (updatedCustomer) => {
    setCustomers(customers.map(customer => customer.key === updatedCustomer.key ? updatedCustomer : customer));
  };

  const handleDelete = (key) => {
    setCustomers(customers.filter(customer => customer.key !== key));
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
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} danger />
        </span>
      ),
    }
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} type="primary" icon={<PlusOutlined />}>Add Customer</Button>
      <Table dataSource={customers} columns={columns} />
      <Modal
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
        visible={isOpen}
        onCancel={() => { setIsOpen(false); setEditingCustomer(null); }}
        onOk={() => {
          const form = document.forms['customerForm'];
          const newCustomer = {
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
            key: editingCustomer ? editingCustomer.key : customers.length + 1
          };
          editingCustomer ? handleUpdate(newCustomer) : handleAdd(newCustomer);
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