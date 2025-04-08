Here's the updated version of the documentation with the addition to use the admin account:

---

# Vue 3 + TypeScript + Vite Project Documentation: How to Copy, Install, and Run

This guide will walk you through the steps to copy, install, and run a Vue 3 project with TypeScript and Vite. Vite is a fast, modern build tool that is designed for speed and optimized development.

---

## Prerequisites

Before you begin, ensure that you have the following tools installed on your machine:

- **Node.js**: Vue 3 and Vite require Node.js version 14.18.0 or higher. You can download it from [here](https://nodejs.org/).
- **NPM**: NPM comes bundled with Node.js. You can check if it’s installed by running `npm -v` in your terminal.

---

## Step 1: Copy the Vue 3 + TypeScript + Vite Project

You can either clone a project from a Git repository or download it manually. The easiest way is to use Git to clone the repository.

### Option 1: Clone the Repository (if using Git)
If you have a Git repository, clone it to your local machine using the following command:

```bash
git clone https://github.com/haryus/frontend-coding-exam.git
```

### Option 2: Download as ZIP
If the project is available as a ZIP file, you can download it and extract the files to your preferred directory.

---

## Step 2: Install Project Dependencies

After copying the project to your local machine, you need to install the required dependencies for both Node.js and TypeScript.

### Navigate to the Project Folder
Open your terminal or command prompt, and navigate to the project folder:

```bash
cd vue3-typescript-vite-project
```

### Install NPM Dependencies
Run the following command to install all the necessary dependencies:

```bash
npm install
```

This will install all the dependencies defined in the `package.json` file.

---

## Step 3: Verify TypeScript Configuration

The project should already be set up with TypeScript. However, ensure that the `tsconfig.json` file exists and is correctly configured for Vue 3 and TypeScript support.

Here is an example of the relevant portion of `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true,
    "resolveJsonModule": true,
    "lib": ["dom", "esnext"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ]
}
```

This configuration ensures proper TypeScript support for `.vue` files and enables strict type checking for your project.

---

## Step 4: Set Up Backend API URL for Laravel Integration

If you're connecting the frontend (Vue 3 + TypeScript) with a backend Laravel application, you need to specify the API URL where the Laravel backend is running.

### Add the Backend API URL to the `.env` File

In the root of your Vue 3 project, create or modify the `.env` file to include the following line:

```env
VITE_API_URL=http://localhost:8000/api
```

This sets up an environment variable for the API URL. Make sure your Laravel backend is running on `http://localhost:8000`, or modify the URL accordingly.

---

## Step 5: Create an Admin Account in Laravel (Optional)

To use an admin account for authentication or testing, you can create a user with the following details:

```php
'full_name' => 'Admin',
'email' => 'admin@gmail.com',
'password' => bcrypt('admin123'),
```

Ensure this account is created in your Laravel database (you can use a seeder or manually add it). This admin user can then access any routes or functionalities that require admin privileges.

---

## Step 6: Run the Development Server

Vite provides a fast development server that you can use to run your project locally.

### Start the Vite Development Server
Once you’ve installed all dependencies, run the following command to start the development server:

```bash
npm run dev
```

This will start the development server, and you can access the application in your browser at the URL:

```bash
http://localhost:5173/
```

Your Vue frontend should now be connected to the backend Laravel API via the `VITE_API_URL`.

---

## Step 7: Optional: Build the Project for Production

Once you're ready to deploy your Vue 3 + TypeScript + Vite project to production, you can create an optimized production build using the following command:

```bash
npm run build
```

This will create a production-ready build in the `dist/` folder.

---

## Step 8: Optional: Configure IDE Support

To maximize productivity, ensure your IDE is properly configured for Vue 3 and TypeScript. Popular IDEs like **VS Code** work well with Vue 3 and TypeScript with the following extensions:

- **Vetur**: Vue tooling for VS Code (provides syntax highlighting, IntelliSense, and more).
- **Volar**: A more robust Vue 3 extension, recommended for Vue 3 projects using TypeScript.
- **ESLint**: Linting for TypeScript and Vue files to enforce consistent code quality.

### Recommended VS Code Extensions

- **Volar** (Vue 3 support with TypeScript)
- **Vetur** (Vue 2 support, if needed)
- **ESLint** (for code linting)
- **Prettier** (for code formatting)

---

## Step 9: Debugging and Troubleshooting

If you encounter any issues, here are some common solutions:

### Clear Node Modules and Reinstall Dependencies

Sometimes, there may be issues with the `node_modules` folder. You can try deleting it and reinstalling the dependencies:

```bash
rm -rf node_modules
npm install
```

### Check Console for Errors

If the development server is not working, check the terminal console for any errors that may be preventing it from starting. Often, Vite will output helpful error messages that can guide you toward the solution.

---

## Conclusion

You’ve now successfully copied, installed, and run a Vue 3 project with TypeScript and Vite! This setup allows you to take advantage of Vue 3's reactivity, TypeScript's strong typing, and Vite's fast build times, all of which provide an excellent development experience.

By connecting your Vue frontend to the Laravel backend with the `VITE_API_URL` variable, you can easily integrate API requests into your application.

For more information, refer to the following resources:

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [TypeScript Vue Documentation](https://vuejs.org/guide/typescript/)
- [Vite Documentation](https://vitejs.dev/)

Happy coding!