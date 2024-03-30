'use client';

import React from 'react'
import signInImage from '../../../../public/hero-gradient.webp.svg'
import Image from 'next/image';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().required('Name is required')
})

const page = () => {
  const router = useRouter()

  const loginStatus = localStorage.getItem('accessToken')
  if (loginStatus) {
    router.push('/')
  }

  return (
    <div className='flex flex-col-reverse justify-end md:flex-row h-screen'>
      <div className='h-5/6 md:h-full md:w-3/6 flex flex-col justify-start md:justify-center items-center gap-y-6 md:gap-y-8 py-6 md:py-0'>
        <div className='text-center md:text-start flex flex-col gap-y-3'>
          <h1 className='font-bold text-3xl md:text-4xl'>Hi, Welcome</h1>
        </div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            name: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post('https://dev-diaries-backend.onrender.com/user', values)
              const user = response.data
              console.log("Data: ", user)
              router.push('/signin')
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="w-10/12 md:w-8/12"
            >
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-500">{errors.username}</div>
                ) : null}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500">{errors.email}</div>
                ) : null}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-500">{errors.name}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 transition-colors duration-200 ease-in-out"
              >
                Sign Up
              </button>
              <p className="text-sm text-gray-700 mt-3">Already registered? <Link
                href={'/signin'} className="text-blue-600 hover:underline cursor-pointer">Login.</Link></p>
            </Form>
          )}
        </Formik>
      </div>
      <div className='bg-purple-500 h-1/6 md:h-full md:w-3/6 flex justify-center items-center overflow-hidden'>
        <Image src={signInImage} alt='Sign in image' className='object-cover h-full w-full' />
      </div>
    </div>
  )
}

export default page