import { Button, Modal, Table, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

function StaffPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [staff, setStaff] = useState([
    {
      key: '1',
      name: 'John Doe',
      id: 101,
      age: 30,
      position: 'Manager',
      salary: 5000,
      department: 'Sales',
      dateJoined: '2018-06-12',
      status: 'Active',
      avatar: 'data:image/jpeg;base64,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'
    },
    {
      key: '2',
      name: 'Jane Smith',
      id: 102,
      age: 28,
      position: 'HR Specialist',
      salary: 4500,
      department: 'Human Resources',
      dateJoined: '2019-09-23',
      status: 'Active',
      avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwIyq51BQ-_dWyNTymtiTBeiQiHBj6u9aYA&s'
    },
    {
      key: '3',
      name: 'Michael Johnson',
      id: 103,
      age: 35,
      position: 'Software Engineer',
      salary: 6000,
      department: 'IT',
      dateJoined: '2020-01-15',
      status: 'On Leave',
       avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_QxnctyjrGbv3O2St8dicDL9FaEELhcDclg&s'
    },
    {
      key: '4',
      name: 'Emily Brown',
      id: 104,
      age: 26,
      position: 'Marketing Coordinator',
      salary: 4200,
      department: 'Marketing',
      dateJoined: '2021-05-30',
      status: 'Active',
       avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgkm4PlwdofU7TL4QBr1Zszr2UfY3h01i_Lg&s'
    },
    {
      key: '5',
      name: 'Daniel Wilson',
      id: 105,
      age: 40,
      position: 'Accountant',
      salary: 5500,
      department: 'Finance',
      dateJoined: '2017-11-20',
      status: 'Retired',
       avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTspltd3C88pVRhG6UAVaMK49kt4x3F3YmSEg&s'
    },
    {
      key: '6',
      name: 'Sophia Martinez',
      id: 106,
      age: 32,
      position: 'Project Manager',
      salary: 6500,
      department: 'Operations',
      dateJoined: '2016-08-14',
      status: 'Active',
       avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbX09Vjkn7dnpE39lvr9QK0aVcQ_duuViaQ&s'
    }


  ]);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleAdd = (staffMember) => {
    setStaff([...staff, { ...staffMember, key: staff.length + 1 }]);
  };

  const handleUpdate = (updatedStaff) => {
    setStaff(staff.map(member => member.key === updatedStaff.key ? updatedStaff : member));
  };

  const handleDelete = (key) => {
    setStaff(staff.filter(member => member.key !== key));
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
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Salary ($)',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
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
          <Button icon={<EditOutlined />} onClick={() => { setEditingStaff(record); setIsOpen(true); }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} danger />
        </span>
      ),
    }
  ];

  return (
    <div>
      <Button icon={<PlusOutlined />} onClick={() => setIsOpen(true)} type="primary">Add Staff</Button>
      <Table dataSource={staff} columns={columns} />
      <Modal
        title={editingStaff ? "Edit Staff" : "Add Staff"}
        visible={isOpen}
        onCancel={() => { setIsOpen(false); setEditingStaff(null); }}
        onOk={() => {
          const form = document.forms['staffForm'];
          const newStaff = {
            name: form.name.value,
            id: form.id.value,
            age: form.age.value,
            position: form.position.value,
            salary: form.salary.value,
            department: form.department.value,
            dateJoined: form.dateJoined.value,
            status: form.status.value,
            avatar: form.avatar.value,
            key: editingStaff ? editingStaff.key : staff.length + 1
          };
          editingStaff ? handleUpdate(newStaff) : handleAdd(newStaff);
          setIsOpen(false);
          setEditingStaff(null);
        }}
      >
        <Form id="staffForm" initialValues={editingStaff || {}}>
          <Form.Item label="Name" name="name">
            <Input defaultValue={editingStaff?.name} />
          </Form.Item>
          <Form.Item label="ID" name="id">
            <Input defaultValue={editingStaff?.id} />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input defaultValue={editingStaff?.age} />
          </Form.Item>
          <Form.Item label="Position" name="position">
            <Input defaultValue={editingStaff?.position} />
          </Form.Item>
          <Form.Item label="Salary" name="salary">
            <Input defaultValue={editingStaff?.salary} />
          </Form.Item>
          <Form.Item label="Department" name="department">
            <Input defaultValue={editingStaff?.department} />
          </Form.Item>
          <Form.Item label="Date Joined" name="dateJoined">
            <Input defaultValue={editingStaff?.dateJoined} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input defaultValue={editingStaff?.status} />
          </Form.Item>
          <Form.Item label="Avatar" name="avatar">
            <Input defaultValue={editingStaff?.avatar} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StaffPage;