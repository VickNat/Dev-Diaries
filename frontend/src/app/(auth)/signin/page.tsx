'use client';

import React, { useState } from 'react'
import signInImage from '../../../../public/hero-gradient.webp.svg'
import Image from 'next/image';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from "lucide-react";

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
})

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  let loginStatus = null;

  if (typeof window !== 'undefined') {
    if (typeof window !== 'undefined') {
      loginStatus = localStorage.getItem('accessToken')
    }
  }

  if (loginStatus) {
    router.push('/profile')
  }

  return (
    <div className='flex flex-col-reverse justify-end md:flex-row h-screen'>
      <div className='h-5/6 md:h-full md:w-3/6 flex flex-col justify-start md:justify-center items-center gap-y-6 md:gap-y-8 py-6 md:py-0'>
        <div className='text-center md:text-start flex flex-col gap-y-3'>
          <h1 className='font-bold text-3xl md:text-4xl'>Hi, Welcome Back</h1>
        </div>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              setIsLoading(true)
              const response = await axios.post('https://dev-diaries-backend.onrender.com/user/login', values)
              const { accessToken, refreshToken } = response.data
              if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
              }
              const data = jwtDecode(accessToken)
              // console.log("Data: ", data)
              setIsLoading(false)
              router.push('/profile')
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="w-10/12 md:w-8/12 "
            >
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <Field
                  name="username"
                  id="username"
                  className="focus:bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-md  focus:border-purple-500 block w-full py-2 px-4 focus:outline-none"
                  placeholder="username"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-500 text-sm">{errors.username}</div>
                ) : null}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className="focus:bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-md  focus:border-purple-500 block w-full py-2 px-4 focus:outline-none"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 transition-colors duration-200 ease-in-out"
              >
                {
                  isLoading ? <div className='w-full flex justify-center items-center'>
                    <Loader2 size={20} />
                  </div> : 'Sign in'
                }
              </button>


              <p className="text-sm text-gray-700 mt-3">Not registered yet? <Link
                href={''} className="text-blue-600 hover:underline cursor-pointer">Create an account.</Link></p>
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

export default SignIn