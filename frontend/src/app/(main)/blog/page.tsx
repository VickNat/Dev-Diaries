'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react'
import AllPosts from "@/components/AllPosts";
import { Post } from '@/lib/types';
import BlogsBackgroundImageSection from '@/components/BlogsBackgroundImageSection';

const page = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://dev-diaries-backend.onrender.com/blog`)
        const data = response.data
        // console.log("Posts: ", data);

        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [])


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.headline.toLowerCase().startsWith(search.toLowerCase())
  );
  console.log("Posts: ", posts);
  console.log("Filtered Posts: ", filteredPosts)

  return (
    <div className='min-h-screen mx-auto max-w-screen-xl md:py-8 py-4 dark:bg-darkPrimary flex flex-col gap-y-5 items-center'>
      <div className=''>
        <input
          type="text"
          placeholder='Search'
          className='min-w-80 md:w-1/4 h-10 px-4 rounded-lg dark:bg-slate-800 border border-gray-400 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-darkSecondary dark:text-white'
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <BlogsBackgroundImageSection />
      <AllPosts posts={filteredPosts? filteredPosts : []} />
    </div>
  )
}

export default page