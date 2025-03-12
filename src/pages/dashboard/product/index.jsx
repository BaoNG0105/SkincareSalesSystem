import { Button, Modal, Table, Space, Form, Input, InputNumber } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

function ProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      key: '1',
      name: 'Facial Cleanser',
      category: 'Cleanser',
      price: 25.99,
      stock: 100,
      image: 'https://example.com/images/facial_cleanser.jpg',
    },
    {
      key: '2',
      name: 'Moisturizing Cream',
      category: 'Moisturizer',
      price: 35.99,
      stock: 50,
      image: 'https://example.com/images/moisturizing_cream.jpg',
    },
    {
      key: '3',
      name: 'Sunscreen SPF 50',
      category: 'Sunscreen',
      price: 15.99,
      stock: 200,
      image: 'https://example.com/images/sunscreen_spf50.jpg',
    },
  ]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setCurrentProduct(null);
    form.resetFields();
    setIsOpen(true);
  };

  const handleEdit = (record) => {
    setCurrentProduct(record);
    form.setFieldsValue(record);
    setIsOpen(true);
  };

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (currentProduct) {
        setProducts(products.map(product => product.key === currentProduct.key ? { ...values, key: currentProduct.key } : product));
      } else {
        const newKey = (products.length + 1).toString();
        setProducts([...products, { ...values, key: newKey }]);
      }
      setIsOpen(false);
    });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} danger />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />}>Add Product</Button>
      <Table dataSource={products} columns={columns} />
      <Modal
        title={currentProduct ? 'Edit Product' : 'Add Product'}
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter the product category' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price' }]}>
            <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please enter the product stock' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please enter the product image URL' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;