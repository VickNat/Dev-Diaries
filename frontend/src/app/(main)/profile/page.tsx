'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProfileCard from '@/components/ProfileCard'
import { JwtPayload, jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Posts from '@/components/Posts';
import { Post } from '@/lib/types';
import { SkeletonCard } from "@/components/SkeletonCard";

const Profile = () => {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>()
  const [isLoading, setIsLoading] = useState(true)

  let accessToken = null;

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/login')
    }
  }


  let user: any | null = null

  if (accessToken) {
    user = jwtDecode(accessToken);
  }
  // console.log("User Info: ", user);


  useEffect(() => {
    const fetchPosts = async () => {

      try {
        setIsLoading(true)
        const response = await axios.get(`https://dev-diaries-backend.onrender.com/blog/user/${user.id}`)
        const data = response.data
        // console.log("Posts: ", data);

        setPosts(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [])


  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center gap-y-4 md:gap-x-4 md:justify-center md:items-start px-14 py-6'>
      <ProfileCard />
      {
        isLoading ? (
          <div className='flex flex-col gap-y-4 max-w-[1200px]'>
            <h2 className="text-xl self-center text-slate-900 dark:text-white font-semibold">Posts</h2>
            <div className='flex flex-wrap justify-center items-center gap-10'>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        ) : <Posts posts={posts ? posts : []} />
      }
    </div>
  )
}

export default Profile