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

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    router.push('/login')
  }

  // Decode the JWT token
  const user: any = jwtDecode(accessToken ? accessToken : 'token');

  // console.log("User Info: ", user);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://dev-diaries-backend.onrender.com/blog/user/${user._id}`)
        const data = response.data
        // console.log("Posts: ", data);

        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [])


  return (
    <div className=' flex flex-col md:flex-row items-center gap-y-4 md:gap-x-4 md:justify-center md:items-start px-14 py-6'>
      <ProfileCard />
      <Posts posts={posts ? posts : []} />
    </div>
  )
}

export default page