'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import landingImage from '../../../../../public/landingImage.svg'
import axios from 'axios'
import { JwtPayload, jwtDecode } from 'jwt-decode';


const page = () => {
  const [userInfo, setUserInfo] = useState<any>()
  const [post, setPost] = useState<any>()

  const accessToken = localStorage.getItem('accessToken')

  const user: any = jwtDecode(accessToken ? accessToken : 'token');


  useEffect(() => {
    if (user && typeof user[0] === 'object') {
      setUserInfo(user[0])      
    } else {
      console.log("User data not found in the token.");
    }

    // axios fetch post
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://dev-diaries-backend.onrender.com/blog/${userInfo._id}`)
        setPost(response.data)
        console.log("Post: ", post);
      } catch (error) {
        console.error(error)
      }
    }

    fetchPost()
  }, [])

  console.log("User Info: ", userInfo);

  return (
    <div className='mx-auto max-w-screen-md py-10 flex flex-col gap-y-5'>
      <div className='flex flex-col gap-y-5'>
        <h2 className='md:text-3xl text-2xl font-semibold text-black dark:text-white'>
          Headline
        </h2>

        <div className='flex items-center gap-x-3 md:gap-x-4'>
          <div className='md:w-14 md:h-14 w-10 h-10 bg-black rounded-full relative overflow-hidden'>
            <Image src={landingImage} alt='' className='absolute top-0 left-0 w-full h-full object-cover' />
          </div>
          <p className='text-sm text-slate-400'>Date</p>
        </div>
      </div>
      <Image className="rounded-t-lg" src={landingImage} alt="" />

      <p className="text-base leading-relaxed dark:text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio pariatur modi nisi itaque libero expedita ullam in aperiam ad reprehenderit placeat totam, voluptas voluptatem odit voluptatum repudiandae adipisci! Odit, harum ea eos temporibus enim perferendis excepturi consequatur corrupti ipsa.
      </p>
    </div>
  )
}

export default page