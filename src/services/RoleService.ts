// RoleService.ts
import { api } from './AuthService';

export default {
    getAll() {
      return api.get('/roles');
    },
    getRole(id: number, data: any) {
      return api.get(`/roles/${id}`, data);
    },
    create(data: any) {
      return api.post('/roles', data);
    },
    update(id: number, data: any) {
      return api.put(`/roles/${id}`, data);
    },
    delete(id: number) {
      return api.delete(`/roles/${id}`);
    }
};
