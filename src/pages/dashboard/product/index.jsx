import { Button, Modal, Table, Form, Input, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function ProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products khi component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      // Log response để kiểm tra cấu trúc dữ liệu
      console.log('API Response:', response.data);
      
      // Điều chỉnh mapping dữ liệu theo đúng response từ API
      const formattedProducts = response.data.map(product => ({
        key: product.productId, // hoặc product.id tùy vào API
        productId: product.productId,
        productName: product.productName, // đảm bảo đúng tên field từ API
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      }));
      
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
  };

  const handleAdd = async (product) => {
    try {
      const response = await axios.post('http://localhost:8080/api/products', {
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      });
      fetchProducts(); // Refresh danh sách sau khi thêm
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
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
      fetchProducts(); // Refresh danh sách sau khi cập nhật
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`);
      fetchProducts(); // Refresh danh sách sau khi xóa
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Avatar src={text} />
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName', // Đảm bảo trùng với tên field từ API
      key: 'productName',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => { 
              setEditingProduct(record); 
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
        onClick={() => setIsOpen(true)} 
        type="primary" 
        icon={<PlusOutlined />}
        style={{ marginBottom: '16px' }}
      >
        Thêm sản phẩm
      </Button>

      <Table dataSource={products} columns={columns} />

      <Modal
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        open={isOpen}
        onCancel={() => { 
          setIsOpen(false); 
          setEditingProduct(null); 
        }}
        onOk={() => {
          const form = document.forms['productForm'];
          const newProduct = {
            productName: form.productName.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
            category: form.category.value,
            quantity: parseInt(form.quantity.value),
            image: form.image.value,
            productId: editingProduct ? editingProduct.productId : null
          };

          if (editingProduct) {
            handleUpdate(newProduct);
          } else {
            handleAdd(newProduct);
          }
          setIsOpen(false);
          setEditingProduct(null);
        }}
      >
        <Form 
          id="productForm" 
          initialValues={editingProduct || {}}
          layout="vertical"
        >
          <Form.Item 
            label="Tên sản phẩm" 
            name="productName"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Giá" 
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item 
            label="Mô tả" 
            name="description"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item 
            label="Danh mục" 
            name="category"
            rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Số lượng" 
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item 
            label="Link hình ảnh" 
            name="image"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;