import api from '../config/axios';

export const userService = {
  // Lấy danh sách users
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Cập nhật thông tin user
  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },

  // Xóa user
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  }
};

// Thêm export default
export default userService;