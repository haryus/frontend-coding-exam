<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Welcome!</h1>
      <p>Please log in to your account.</p>
      
      <Form :validation-schema="schema" @submit="onSubmit">
        <div class="input-container">
          <Field
            name="email"
            type="email"
            placeholder="Email"
            :class="{ 'input-error': errors?.email }"
          />
          <ErrorMessage name="email" class="error-message" />
        </div>

        <div class="input-container">
          <Field
            name="password"
            type="password"
            placeholder="Password"
            :class="{ 'input-error': errors?.password }"
          />
          <ErrorMessage name="password" class="error-message" />
        </div>

        <button type="submit" class="login-btn">Log In</button>

        <div v-if="serverError" class="server-error-message">
          {{ serverError }}
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';

const router = useRouter();
const serverError = ref<string | null>(null);

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const onSubmit = async (values: { email: string; password: string }) => {
  try {
    const response = await AuthService.login(values);
    localStorage.setItem('token', response.data.access_token);
    router.push('/users');
  } catch (error: any) {
    if (error.response?.data?.message) {
      serverError.value = error.response.data.message;
    } else {
      serverError.value = 'An unknown error occurred. Please try again later.';
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 20px;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 10px;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #777;
}

.input-container {
  position: relative;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #ddd;
  background: #f9f9f9;
  font-size: 16px;
  transition: all 0.3s;
}

input:focus {
  border-color: #2575fc;
  outline: none;
}

input.input-error {
  border-color: #e74c3c;
}

.error-message {
  position: absolute;
  bottom: -18px;
  left: 0;
  color: #e74c3c;
  font-size: 12px;
}

.network-error {
  margin-top: 20px;
  color: #e74c3c;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ffffff;
}

.footer-text {
  text-align: center;
  margin-top: 15px;
}

.footer-text a {
  color: #2575fc;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}
.server-error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
}
</style>
