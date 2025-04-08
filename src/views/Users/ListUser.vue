<template>
  <NavBar />
  <div>
    <h2>User List</h2>
    <button @click="addModal">Add New User</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Add New User</h3>
        <Form :validation-schema="addUserSchema" @submit="onSubmitAddUser">
          <div class="form-row">
            <label for="full_name">Full Name</label>
            <Field name="full_name" as="input" id="full_name" placeholder="Name" />
            <ErrorMessage name="full_name" class="error-message" />
          </div>

          <div class="form-row">
            <label for="email">Email</label>
            <Field name="email" as="input" id="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" class="error-message" />
          </div>

          <div class="form-row">
            <label for="nominated_password">Nominated Password</label>
            <Field name="nominated_password" as="input" id="nominated_password" type="password" placeholder="Nominated Password" />
            <ErrorMessage name="nominated_password" class="error-message" />
          </div>

          <div class="form-row">
            <label for="confirmed_password">Confirmed Password</label>
            <Field name="confirmed_password" as="input" id="confirmed_password" type="password" placeholder="Confirm Password" />
            <ErrorMessage name="confirmed_password" class="error-message" />
          </div>

          <div class="form-row">
            <label for="role_id">Assign Role</label>
            <Field name="role_id" as="select" id="role_id">
              <option value="" disabled>Select a role</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role_name }}</option>
            </Field>
            <ErrorMessage name="role_id" class="error-message" />
          </div>

          <div class="form-buttons">
            <button type="submit">Add User</button>
            <button type="button" @click="closeModal">Close</button>
          </div>
        </Form>
      </div>
    </div>

    <div v-if="showEditForm" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit User</h3>
        <Form :validation-schema="editUserSchema" @submit="updateUser">
          <div class="form-row">
            <label for="full_name">Full Name</label>
            <Field v-model="editUserData.full_name" name="full_name" as="input" placeholder="Name" />
            <ErrorMessage name="full_name" class="error-message" />
          </div>

          <div class="form-row">
            <label for="email">Email</label>
            <Field v-model="editUserData.email" name="email" as="input" placeholder="Email" type="email" />
            <ErrorMessage name="email" class="error-message" />
          </div>

          <div class="form-row">
            <label for="nominated_password">Nominated Password</label>
            <Field v-model="editUserData.nominated_password" name="nominated_password" as="input" placeholder="Nominated Password" type="password" />
            <ErrorMessage name="nominated_password" class="error-message" />
          </div>

          <div class="form-row">
            <label for="confirmed_password">Confirmed Password</label>
            <Field v-model="editUserData.confirmed_password" name="confirmed_password" as="input" placeholder="Confirmed Password" type="password" />
            <ErrorMessage name="confirmed_password" class="error-message" />
          </div>

          <div class="form-row">
            <label for="role_id">Role</label>
            <Field v-model="editUserData.role_id" name="role_id" as="select">
              <option v-for="role in rolesWithoutUsers" :key="role.id" :value="role.id">{{ role.role_name }}</option>
            </Field>
            <ErrorMessage name="role_id" class="error-message" />
          </div>

          <div class="form-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" @click="closeEditForm">Close</button>
          </div>
        </Form>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this user?</p>
        <div class="form-buttons">
          <button @click="confirmDelete" class="delete-btn">Yes, Delete</button>
          <button @click="cancelDelete">Cancel</button>
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.full_name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="requestDelete(user.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import UserService from '../../services/UserService';
import { api } from '../../services/AuthService';
import NavBar from '../../views/Navbar.vue';

const rolesWithoutUsers = ref<any[]>([]);
const users = ref<any[]>([]);
const showEditForm = ref(false);
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const deleteUserId = ref<number | null>(null);

const newUser = ref({
  full_name: '',
  email: '',
  nominated_password: '',
  nominated_password_confirmation: '',
  confirmed_password: '',
  role_id: 1,
});

const editUserData = ref({
  id: null,
  full_name: '',
  email: '',
  nominated_password: '',
  nominated_password_confirmation: '',
  confirmed_password: '',
  role_id: '',
});

const roles = ref<any[]>([]);

onMounted(async () => {
  await fetchUsers();
  await fetchRoles();
});

const fetchUsers = async () => {
  try {
    const response = await UserService.getAll();
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchRoles = async () => {
  try {
    const response = await UserService.getRolesWithoutUsers();
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

const editUser = async (user: any) => {
  try {
    const response = await api.get(`/users/${user.id}`);
    editUserData.value = response.data.user;
    rolesWithoutUsers.value = response.data.roles_without_users;
    showEditForm.value = true;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const closeEditForm = () => {
  showEditForm.value = false;
};

const requestDelete = (id: number) => {
  deleteUserId.value = id;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  if (deleteUserId.value !== null) {
    try {
      await UserService.delete(deleteUserId.value);
      alert("User deleted successfully.");
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      showDeleteConfirm.value = false;
      deleteUserId.value = null;
    }
  }
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  deleteUserId.value = null;
};

const addUserSchema = yup.object({
  full_name: yup.string().required('Full name is required').max(255, 'Email must be at most 255 characters'),
  email: yup.string().email('Please enter a valid email').required('Email is required').max(255, 'Email must be at most 255 characters'),
  nominated_password: yup.string().min(8, 'Password must be at least 8 characters').required('Nominated password is required'),
  confirmed_password: yup
    .string()
    .oneOf([yup.ref('nominated_password')], 'Passwords must match')
    .required('Please confirm your password'),
  role_id: yup.number().required('Role is required').typeError('Role is required'),
});

const editUserSchema = yup.object({
  full_name: yup.string().required('Full name is required').max(255, 'Email must be at most 255 characters'),
  email: yup.string().email('Please enter a valid email').required('Email is required').max(255, 'Email must be at most 255 characters'),
  nominated_password: yup.string().min(8, 'Password must be at least 8 characters').required('Nominated password is required'),
  confirmed_password: yup
    .string()
    .oneOf([yup.ref('nominated_password')], 'Passwords must match')
    .required('Please confirm your password'),
  role_id: yup.number().required('Role is required').typeError('Role is required'),
});

const onSubmitAddUser = async (values: any) => {
  try {
    const response = await UserService.create({
      ...values,
      nominated_password_confirmation: values.nominated_password,
    });
    if (response.status === 201) {
      alert("User created successfully.");
    }
    newUser.value = { full_name: '', email: '', nominated_password: '', role_id: 1 };
    showModal.value = false;
    await fetchUsers();
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data.errors;
      if (errorData) {
        if (errorData.email) {
          alert(errorData.email[0]);
        }
        if (errorData.nominated_password) {
          alert(errorData.nominated_password[0]);
        }
        if (errorData.full_name) {
          alert(errorData.full_name[0]);
        }
        if (errorData.role_id) {
          alert(errorData.role_id[0]);
        }
      }
    }
    console.error('Error adding user:', error);
  }
};

const updateUser = async () => {
  try {
    const response = await UserService.update(editUserData.value.id, {
      full_name: editUserData.value.full_name,
      email: editUserData.value.email,
      nominated_password: editUserData.value.nominated_password,
      nominated_password_confirmation: editUserData.value.nominated_password,
      confirmed_password: editUserData.value.confirmed_password,
      role_id: editUserData.value.role_id,
    });
    if (response.status === 200) {
      alert("User successfully updated.");
    }
    showEditForm.value = false;
    await fetchUsers();
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data.errors;
      if (errorData) {
        if (errorData.email) {
          alert(errorData.email[0]);
        }
        if (errorData.nominated_password) {
          alert(errorData.nominated_password[0]);
        }
        if (errorData.full_name) {
          alert(errorData.full_name[0]);
        }
        if (errorData.role_id) {
          alert(errorData.role_id[0]);
        }
      }
    }
    console.error('Error updating user:', error);
  }
};

watch(
  () => newUser.value.nominated_password,
  (newVal) => {
    newUser.value.nominated_password_confirmation = newVal;
  }
);
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
