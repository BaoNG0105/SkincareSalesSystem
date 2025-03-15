import { Button, Modal, Table, Form, Input, Avatar, message } from 'antd';
import { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function ProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/products');
      console.log('API Response:', response.data);
      
      const formattedProducts = response.data.map(product => ({
        key: product.productId,
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      }));
      
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (product) => {
    try {
      await axios.post('http://localhost:8080/api/products', {
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      });
      message.success('Product added successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product');
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:8080/api/products/${updatedProduct.productId}`, {
        productName: updatedProduct.productName,
        quantity: updatedProduct.quantity,
        price: updatedProduct.price,
        description: updatedProduct.description,
        category: updatedProduct.category,
        image: updatedProduct.image
      });
      message.success('Product updated successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Failed to update product');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Avatar src={text} size={64} />
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName)
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toLocaleString('en-US')}`,
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: Array.from(new Set(products.map(p => p.category))).map(category => ({
        text: category,
        value: category,
      })),
      onFilter: (value, record) => record.category === value
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => { 
              setEditingProduct(record);
              form.setFieldsValue(record);
              setIsOpen(true); 
            }} 
            style={{ marginRight: '8px' }}
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.productId)} 
            danger 
          />
        </span>
      ),
    }
  ];

  return (
    <div>
      <Button 
        onClick={() => {
          setEditingProduct(null);
          form.resetFields();
          setIsOpen(true);
        }} 
        type="primary" 
        icon={<PlusOutlined />}
        style={{ marginBottom: '16px' }}
      >
        Add Product
      </Button>

      <Table 
        dataSource={products} 
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`
        }}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isOpen}
        onCancel={() => { 
          setIsOpen(false); 
          setEditingProduct(null);
          form.resetFields();
        }}
        onOk={() => {
          form.validateFields()
            .then(values => {
              const productData = {
                ...values,
                productId: editingProduct?.productId
              };

              if (editingProduct) {
                handleUpdate(productData);
              } else {
                handleAdd(productData);
              }
              setIsOpen(false);
              setEditingProduct(null);
              form.resetFields();
            })
            .catch(info => {
              console.log('Validation Failed:', info);
            });
        }}
      >
        <Form 
          form={form}
          layout="vertical"
          initialValues={editingProduct || {}}
        >
          <Form.Item 
            label="Product Name" 
            name="productName"
            rules={[{ required: true, message: 'Please enter product name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Price" 
            name="price"
            rules={[
              { required: true, message: 'Please enter price!' },
              { type: 'number', min: 0, message: 'Price must be greater than or equal to 0!' }
            ]}
          >
            <Input type="number" min={0} step={0.01} />
          </Form.Item>

          <Form.Item 
            label="Description" 
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item 
            label="Category" 
            name="category"
            rules={[{ required: true, message: 'Please enter category!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Quantity" 
            name="quantity"
            rules={[
              { required: true, message: 'Please enter quantity!' },
              { type: 'number', min: 0, message: 'Quantity must be greater than or equal to 0!' }
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item 
            label="Image URL" 
            name="image"
            rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;