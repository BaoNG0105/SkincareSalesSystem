import { Button, Modal, Table, Form, Input, Avatar } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

function OrderPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([
    {
      key: '1',
      name: 'Good Morning Gel Cleanser',
      id: 1,
      totalPrice: 120,
      date: "2021-09-09",
      status: "pending",
      address: "10 Downing Street",
      avatar: "data:image/jpeg;base64,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"
    },
    {
      key: '2',
      name: 'Simple',
      id: 2,
      totalPrice: 250,
      date: "2022-01-15",
      status: "shipped",
      address: "1600 Pennsylvania Ave",
      avatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmyphamlan.vn%2Fsan-pham%2Fsua-rua-mat-duong-da-simple-150ml%2F&psig=AOvVaw3wVNLsQ35i47CaT8-5wP21&ust=1741526886866000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKD5ls7L-osDFQAAAAAdAAAAABA3"
    },
    {
      key: '3',
      name: 'hada labo',
      id: 3,
      totalPrice: 75,
      date: "2023-05-22",
      status: "delivered",
      address: "221B Baker Street",
      avatar: "https://file.hstatic.net/200000385549/file/cleanser_7d42760d643a47efa41e4a1bffd12b99_grande.png"
    },
    {
      key: '4',
      name: 'Cetaphil',
      id: 4,
      totalPrice: 300,
      date: "2024-02-10",
      status: "pending",
      address: "742 Evergreen Terrace",
      avatar: "https://www.lottemart.vn/media/catalog/product/cache/0x0/3/4/3499320013185-1.jpg.webp"
    },
    {
      key: '5',
      name: ' Biore',
      id: 5,
      totalPrice: 180,
      date: "2023-12-03",
      status: "shipped",
      address: "12 Grimmauld Place",
      avatar: "https://production-cdn.pharmacity.io/digital/1080x1080/plain/e-com/images/ecommerce/P03235_3.jpg"
    },
    {
      key: '6',
      name: 'Acnes',
      id: 6,
      totalPrice: 95,
      date: "2022-07-19",
      status: "delivered",
      address: "Hogwarts Castle",
      avatar: "https://www.pharmart.vn/images/product/origin/sua-rua-mat-acnes-creamy-wash-ahabhazinc-6461fe1720245.jpg"
    }


  ]);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleAdd = (order) => {
    setOrders([...orders, { ...order, key: orders.length + 1 }]);
  };

  const handleUpdate = (updatedOrder) => {
    setOrders(orders.map(order => order.key === updatedOrder.key ? updatedOrder : order));
  };

  const handleDelete = (key) => {
    setOrders(orders.filter(order => order.key !== key));
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <Avatar src={text} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => { setEditingOrder(record); setIsOpen(true); }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} danger />
        </span>
      ),
    }
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} type="primary" icon={<PlusOutlined />}>Add Order</Button>
      <Table dataSource={orders} columns={columns} />
      <Modal
        title={editingOrder ? "Edit Order" : "Add Order"}
        visible={isOpen}
        onCancel={() => { setIsOpen(false); setEditingOrder(null); }}
        onOk={() => {
          const form = document.forms['orderForm'];
          const newOrder = {
            name: form.name.value,
            totalPrice: form.totalPrice.value,
            date: form.date.value,
            status: form.status.value,
            address: form.address.value,
            avatar: form.avatar.value,
            key: editingOrder ? editingOrder.key : orders.length + 1
          };
          editingOrder ? handleUpdate(newOrder) : handleAdd(newOrder);
          setIsOpen(false);
          setEditingOrder(null);
        }}
      >
        <Form id="orderForm" initialValues={editingOrder || {}}>
          <Form.Item label="Name" name="name">
            <Input defaultValue={editingOrder?.name} />
          </Form.Item>
          <Form.Item label="Total Price" name="totalPrice">
            <Input defaultValue={editingOrder?.totalPrice} />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input defaultValue={editingOrder?.date} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input defaultValue={editingOrder?.status} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input defaultValue={editingOrder?.address} />
          </Form.Item>
          <Form.Item label="Avatar" name="avatar">
            <Input defaultValue={editingOrder?.avatar} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OrderPage;