import { api } from './AuthService'; // ✅ Import `api` separately

export default {
  getAll() {
    return api.get('/users');
  },
  getRolesWithoutUsers() {
    return api.get('/rolesData');
  },
  getUser(id: number, data: any) {
    return api.get(`/users/${id}`, data);
  },
  create(data: any) {
    return api.post('/users', data);
  },
  update(id: number, data: any) {
    return api.patch(`/users/${id}`, data);
  },
  delete(id: number) {
    return api.delete(`/users/${id}`);
  }
};
