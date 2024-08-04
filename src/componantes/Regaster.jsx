import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register({ users, setUser }) {
  const notify = () => {
    toast.error('Existing user', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      let isVailed = true;

      users.forEach((user) => {
        if (user.username === values.username) {
          isVailed = false;
        }
      });

      if (isVailed) {
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(data => {
            window.sessionStorage.setItem('userID', data.id);
            setUser(data.id);
            navigate('/');
          });
      } else {
        notify();
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Create an account</h1>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-gray-700">User Name</label>
              <input
                type="text"
                name='username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="User name"
                className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:bg-white focus:outline-none`}
                autoComplete='off'
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter Password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:bg-white focus:outline-none`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
              Create an account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
