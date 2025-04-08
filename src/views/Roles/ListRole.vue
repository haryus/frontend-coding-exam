<template>
  <NavBar />
  <div>
    <h2>Role List</h2>
    <button @click="addModal">Add New Role</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Add New Role</h3>
        <Form :validation-schema="addRoleSchema" @submit="onSubmitAddRole">
          <div class="form-row">
            <label for="role_name">Role Name</label>
            <Field name="role_name" as="input" id="role_name" placeholder="Role Name" />
            <ErrorMessage name="role_name" class="error-message" />
          </div>

          <div class="form-row">
            <label for="description">Description</label>
            <Field name="description" as="input" id="description" placeholder="Description" />
            <ErrorMessage name="description" class="error-message" />
          </div>

          <div class="form-buttons">
            <button type="submit">Add Role</button>
            <button type="button" @click="closeModal">Close</button>
          </div>
        </Form>
      </div>
    </div>

    <div v-if="showEditForm" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Role</h3>
        <Form :validation-schema="editRoleSchema" @submit="updateRole">
          <div class="form-row">
            <label for="role_name">Role Name</label>
            <Field v-model="editRoleData.role_name" name="role_name" as="input" placeholder="Role Name" />
            <ErrorMessage name="role_name" class="error-message" />
          </div>

          <div class="form-row">
            <label for="description">Description</label>
            <Field v-model="editRoleData.description" name="description" as="input" placeholder="Description" />
            <ErrorMessage name="description" class="error-message" />
          </div>

          <div class="form-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" @click="closeEditForm">Close</button>
          </div>
        </Form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this role?</p>
        <div class="form-buttons">
          <button @click="confirmDelete" class="delete-btn">Yes, Delete</button>
          <button @click="cancelDelete">Cancel</button>
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.role_name }}</td>
          <td>{{ role.description }}</td>
          <td>
            <button @click="editRole(role)">Edit</button>
            <button @click="requestDelete(role.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import RoleService from '../../services/RoleService';
import { api } from '../../services/AuthService';
import NavBar from '../../views/Navbar.vue';

const roles = ref<any[]>([]);
const showEditForm = ref(false);
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const deleteRoleId = ref<number | null>(null);

const newRole = ref({
  role_name: '',
  description: '',
});

const editRoleData = ref({
  id: null,
  role_name: '',
  description: '',
});

onMounted(async () => {
  await fetchRoles();
});

const fetchRoles = async () => {
  try {
    const response = await RoleService.getAll();
    roles.value = response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

const addModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const editRole = async (role: any) => {
  try {
    const response = await api.get(`/roles/${role.id}`);
    editRoleData.value = response.data.role;
    console.log(response.data);
    
    showEditForm.value = true;
  } catch (error) {
    console.error('Error fetching role data:', error);
  }
};

const closeEditForm = () => {
  showEditForm.value = false;
};

const requestDelete = (id: number) => {
  deleteRoleId.value = id;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  if (deleteRoleId.value !== null) {
    try {
      await RoleService.delete(deleteRoleId.value);
      alert("Role deleted successfully.");
      await fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    } finally {
      showDeleteConfirm.value = false;
      deleteRoleId.value = null;
    }
  }
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  deleteRoleId.value = null;
};

const addRoleSchema = yup.object({
  role_name: yup.string().required('Full name is required').max(255, 'Email must be at most 255 characters'),
  description: yup.string().required('Description is required'),
});

const editRoleSchema = yup.object({
  role_name: yup.string().required('Full name is required').max(255, 'Email must be at most 255 characters'),
  description: yup.string().required('Description is required'),
});

const onSubmitAddRole = async (values: any) => {
  try {
    const response = await RoleService.create({
      ...values,
    });
    if (response.status === 201) {
      alert("Role created successfully.");
    }
    newRole.value = { role_name: '', description: '' };
    showModal.value = false;
    await fetchRoles();
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data.errors;
      if (errorData) {
        if (errorData.role_name) {
          alert(errorData.email[0]);
        }
        if (errorData.description) {
          alert(errorData.nominated_password[0]);
        }
      }
    }
    console.error('Error adding role:', error);
  }
};

const updateRole = async () => {
  try {
    const response = await RoleService.update(editRoleData.value.id, {
      role_name: editRoleData.value.role_name,
      description: editRoleData.value.description,
    });
    if (response.status === 200) {
      alert("Role successfully updated.");
    }
    showEditForm.value = false;
    await fetchRoles();
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data.errors;
      if (errorData) {
        if (errorData.role_name) {
          alert(errorData.role_name[0]);
        }
        if (errorData.description) {
          alert(errorData.description[0]);
        }
      }
    }
    console.error('Error updating role:', error);
  }
};
</script>

<style scoped>
.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 0px;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: darkred;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.form-row label {
  width: 40%;
  font-weight: bold;
}
.form-row input,
.form-row select {
  width: 55%;
  padding: 6px;
}
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
.error-message {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}
</style>
