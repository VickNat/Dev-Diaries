'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProfileCard from '@/components/ProfileCard'
import { JwtPayload, jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Posts from '@/components/Posts';
import { Post } from '@/lib/types';

const page = () => {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>()
  const [userInfo, setUserInfo] = useState<any>()

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    router.push('/login')
  }

  // Decode the JWT token
  const user: any = jwtDecode(accessToken ? accessToken : 'token');

  // console.log("User Info: ", userInfo);


  useEffect(() => {
    if (user && typeof user[0] === 'object') {
      setUserInfo(user[0])
    } else {
      console.log("User data not found in the token.");
    }

  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://dev-diaries-backend.onrender.com/blog/user/${userInfo._id}`)
        const data = response.data
        // console.log("Posts: ", data);

        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [userInfo])


  return (
    <div className='flex flex-col md:flex-row items-center gap-y-4 md:gap-x-4 md:justify-center md:items-start px-14 py-6'>
      <ProfileCard />
      <Posts posts={posts ? posts : []} />
    </div>
  )
}

export default page