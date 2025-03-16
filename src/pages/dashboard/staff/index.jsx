import { 
  Button, 
  Modal, 
  Table, 
  Form, 
  Input, 
  Select,
  message,
  Space
} from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import api from '../../../config/axios';

function StaffPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { confirm } = Modal;

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
      if (response.status === 200) {
        const staffData = response.data.filter(user => 
          user.role === 'Staff' || user.role === 'Manager'
        ).map(staff => ({
          ...staff,
          key: staff.id.toString(),
          status: mapStatus(staff.status),
          gender: mapGender(staff.gender)
        }));
        setStaffs(staffData);
      }
    } catch (err) {
      setError(err.message);
      message.error('Không thể tải danh sách nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (values) => {
    try {
      setConfirmLoading(true);
      const newStaff = {
        ...values,
        password: "123456", // Mật khẩu mặc định
        status: values.status === 'Active',
        enabled: true,
        accountNonExpired: true,
        credentialsNonExpired: true,
        accountNonLocked: true
      };

      const response = await api.post('/users', newStaff);
      if (response.status === 201 || response.status === 200) {
        message.success('Thêm nhân viên thành công');
        form.resetFields();
        setIsOpen(false);
        await fetchStaffs();
      }
    } catch (err) {
      message.error('Lỗi khi thêm nhân viên: ' + (err.response?.data?.message || err.message));
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setConfirmLoading(true);
      const updatedStaff = {
        ...values,
        id: editingStaff.id,
        status: values.status === 'Active',
        money: editingStaff.money || 0
      };

      const response = await api.put(`/users/${editingStaff.id}`, updatedStaff);
      if (response.status === 200) {
        message.success('Cập nhật thành công');
        form.resetFields();
        setIsOpen(false);
        setEditingStaff(null);
        await fetchStaffs();
      }
    } catch (err) {
      message.error('Lỗi khi cập nhật: ' + (err.response?.data?.message || err.message));
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDelete = async (staffId) => {
    try {
      const response = await api.delete(`/users/${staffId}`);
      if (response.status === 200) {
        message.success('Xóa nhân viên thành công');
        await fetchStaffs();
      }
    } catch (err) {
      message.error('Lỗi khi xóa nhân viên: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (record) => {
    const formattedStaff = {
      ...record,
      dateOfBirth: record.dateOfBirth ? record.dateOfBirth.split('T')[0] : '',
      status: record.status === 'Active' ? 'Active' : 'Inactive',
      money: record.money || 0
    };
    setEditingStaff(record);
    form.setFieldsValue(formattedStaff);
    setIsOpen(true);
  };

  const showDeleteConfirm = (staffId, staffName) => {
    confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa nhân viên "${staffName}"?`,
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk: () => handleDelete(staffId)
    });
  };

  const columns = [
    {
      title: 'Ảnh đại diện',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (text) => <img src={text || 'https://via.placeholder.com/50'} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
    },
    {
      title: 'Họ và tên',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => text || 'Chưa cập nhật'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span style={{
          color: role === 'Manager' ? '#1890ff' : '#52c41a',
          fontWeight: 'bold'
        }}>
          {role === 'Manager' ? 'Quản lý' : 'Nhân viên'}
        </span>
      )
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => gender === 'Male' ? 'Nam' : 'Nữ'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (text) => {
        if (!text) return 'Chưa cập nhật';
        try {
          return new Date(text).toLocaleDateString('vi-VN');
        } catch (error) {
          return text;
        }
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        if (!text) return 'Chưa cập nhật';
        try {
          return new Date(text).toLocaleDateString('vi-VN');
        } catch (error) {
          return text;
        }
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ 
          color: status === 'Active' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {status === 'Active' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary"
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="primary"
            danger
            icon={<DeleteOutlined />} 
            onClick={() => {
              if (record.role === 'Manager') {
                message.warning('Không thể xóa tài khoản Quản lý');
                return;
              }
              showDeleteConfirm(record.id, record.userName);
            }}
          />
        </Space>
      ),
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingStaff(null);
            form.resetFields();
            form.setFieldsValue({
              status: 'Active',
              role: 'Staff',
              gender: 'Male'
            });
            setIsOpen(true);
          }}
        >
          Thêm nhân viên
        </Button>
      </div>

      <Table 
        dataSource={staffs} 
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} nhân viên`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingStaff ? "Cập nhật thông tin nhân viên" : "Thêm nhân viên mới"}
        open={isOpen}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setIsOpen(false);
          setEditingStaff(null);
          form.resetFields();
        }}
        okText={editingStaff ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        onOk={() => {
          form.validateFields()
            .then(values => {
              if (editingStaff) {
                handleUpdate(values);
              } else {
                handleAdd(values);
              }
            })
            .catch(info => {
              console.log('Validation Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingStaff ? {
            ...editingStaff,
            status: editingStaff.status === 'Active' ? 'Active' : 'Inactive',
            dateOfBirth: editingStaff.dateOfBirth ? editingStaff.dateOfBirth.split('T')[0] : ''
          } : {
            status: 'Active',
            role: 'Staff',
            gender: 'Male'
          }}
        >
          <Form.Item 
            label="Họ và tên" 
            name="userName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Email" 
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Số điện thoại" 
            name="phoneNumber"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Địa chỉ" 
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Chức vụ" 
            name="role"
            rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
          >
            <Select>
              <Select.Option value="Manager">Quản lý</Select.Option>
              <Select.Option value="Staff">Nhân viên</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Giới tính" 
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select>
              <Select.Option value="Male">Nam</Select.Option>
              <Select.Option value="Female">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Ngày sinh" 
            name="dateOfBirth"
            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item 
            label="Trạng thái" 
            name="status"
          >
            <Select>
              <Select.Option value="Active">Hoạt động</Select.Option>
              <Select.Option value="Inactive">Không hoạt động</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Ảnh đại diện" 
            name="profileImage"
          >
            <Input placeholder="Nhập URL ảnh" />
          </Form.Item>
          {editingStaff && (
            <Form.Item 
              label="Số dư" 
              name="money"
            >
              <Input type="number" disabled />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}

export default StaffPage;