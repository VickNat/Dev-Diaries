'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import landingImage from '../../../../../public/landingImage.svg'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'

const validationSchema = Yup.object({
  headline: Yup.string().required('Headline is required'),
  content: Yup.string().required('Content is required'),
  image: Yup.string().required('Image is required')
})


const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [post, setPost] = useState<any>()

  const accessToken = localStorage.getItem('accessToken')

  const user: any = jwtDecode(accessToken ? accessToken : 'token');


  useEffect(() => {
    // axios fetch post
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://dev-diaries-backend.onrender.com/blog/${params.id}`)
        setPost(response.data)
        console.log("Post: ", post);
      } catch (error) {
        console.error(error)
      }
    }

    fetchPost()
  }, [])

  // console.log("User Info: ", user);
  console.log("Post: ", post);

  return (
    <div className='mx-auto max-w-screen-md py-10 flex flex-col gap-y-5'>
      <div className='flex flex-col gap-y-5'>
        <h2 className='md:text-3xl text-2xl font-semibold text-black dark:text-white'>
          {post?.headline}
        </h2>

        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-3 md:gap-x-4'>
            <div className='md:w-14 md:h-14 w-10 h-10 bg-black rounded-full relative overflow-hidden'>
              <Image src={landingImage} alt='' className='absolute top-0 left-0 w-full h-full object-cover' />
            </div>
            <div className='flex flex-col'>
              <p className='text-sm text-slate-400'>{user?.name}</p>
              <p className='text-sm text-slate-400'>{post?.postedOn}</p>
            </div>
          </div>
          {
            user && user.id === post?.posterId ? (
              <div className='flex gap-x-3'>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className='bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg'>Edit</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] dark:bg-[#020817]">
                    <DialogHeader>
                      <DialogTitle>Edit Post</DialogTitle>
                    </DialogHeader>

                    <Formik
                      initialValues={{
                        headline: post?.headline,
                        content: post?.content,
                        image: post?.image
                      }}
                      validationSchema={validationSchema}
                      onSubmit={async (values) => {
                        try {
                          const response = await axios.patch(`https://dev-diaries-backend.onrender.com/blog/${params.id}`, { headline: values.headline, content: values.content })
                          console.log("Response: ", response);
                          window.location.reload()
                        } catch (error) {
                          console.log(error)
                        }
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="flex flex-col gap-y-3 p-4">
                          <div className="mb-5">
                            <label
                              htmlFor="headline"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Headline
                            </label>
                            <Field
                              name="headline"
                              id="headline"
                              className=" text-black dark:text-white text-sm rounded-md  block w-full py-2 px-4 focus:outline-none"
                              placeholder="headline"
                            />
                            {errors.headline && touched.headline ? (
                              <div className="text-red-500 text-sm">Error Headline</div>
                            ) : null}
                          </div>
                          <div className="mb-5">
                            <label
                              htmlFor="content"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Content
                            </label>
                            <Field
                              name="content"
                              id="content"
                              className="text-black dark:text-white text-sm rounded-md  block w-full py-2 px-4 focus:outline-none"
                              placeholder="content"
                            />
                            {errors.content && touched.content ? (
                              <div className="text-red-500 text-sm">Error content</div>
                            ) : null}
                          </div>
                          <div className="mb-5">
                            <label
                              htmlFor="image"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Image
                            </label>
                            <Field
                              name="image"
                              id="image"
                              className="text-black dark:text-white text-sm rounded-md  block w-full py-2 px-4 focus:outline-none"
                              placeholder="image"
                            />
                            {errors.image && touched.image ? (
                              <div className="text-red-500 text-sm">Error image</div>
                            ) : null}
                          </div>
                          <Button type="submit">Submit</Button>
                        </Form>
                      )}
                    </Formik>
                  </DialogContent>
                </Dialog>
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.delete(`https://dev-diaries-backend.onrender.com/blog/${params.id}`)
                      console.log("Response: ", response);
                      router.push('/')
                    } catch (error) {
                      console.log(error)
                    }
                  }}
                  className='bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg'>Delete</button>
              </div>
            ) : null
          }
        </div>
      </div>
      {
        post ? (
          <img src={`https://dev-diaries-backend.onrender.com/${post.imagePath}`} alt="Blog" />
        ) : (
          <Image className="rounded-t-lg" src={landingImage} alt="" />
        )
      }

      <p className="text-base leading-relaxed dark:text-gray-300">
        {post?.content}
      </p>
    </div>
  )
}

export default page