'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode';

const validationSchema = Yup.object({
  headline: Yup.string().required('Headline is required'),
  content: Yup.string().required('Content is required')
})

const page = () => {
  const router = useRouter()
  const [file, setFile] = useState<any>()


  const accessToken = localStorage.getItem('accessToken')

  const user: any = jwtDecode(accessToken ? accessToken : 'token');

  if (!accessToken) {
    router.push('/')
  }

  // console.log("user", user)

  return (
    <Formik
      initialValues={{
        headline: '',
        content: '',
        image: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const formData = new FormData()
          formData.append('image', file)
          formData.append('headline', values.headline)
          formData.append('content', values.content)
          formData.append('postedOn', new Date().toISOString())
          formData.append('posterId', user?.id)
          
          const response = await axios.post('https://dev-diaries-backend.onrender.com/blog', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          router.push('/')
          // console.log(response.data);
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ errors, touched }) => (
        <Form
          className='mx-auto max-w-screen-sm flex flex-col gap-y-5 my-10'
        >
          <div className="flex flex-col items-start gap-4">
            <label
              htmlFor="headline"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Headline
            </label>
            <Field
              name="headline"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.headline && touched.headline ? (
              <div className="text-red-500">{errors.headline}</div>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-4">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Content
            </label>
            <Field
              name="content"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              as='textarea'
            />
            {errors.content && touched.content ? (
              <div className="text-red-500">{errors.content}</div>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-4">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              // filename={"Blogimage"}
              onChange={(e: any) => setFile(e.target.files[0])}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default page